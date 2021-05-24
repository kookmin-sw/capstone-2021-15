import argparse
import numpy as np
import pandas as pd
from tqdm import tqdm

import similarity_buydata as bdsim
import feedback as fb
import random
import sys 

import keras
import keras.backend as K
from keras.models import Model
from keras.callbacks import ModelCheckpoint

from keras.utils import to_categorical
from keras.losses import categorical_crossentropy
from keras.losses import binary_crossentropy
from keras.losses import sparse_categorical_crossentropy

from keras.layers import Input, Dense, Dropout, GRU

class SessionDataset:
    """Credit to yhs-968/pyGRU4REC."""    
    def __init__(self, data, sep='\t', session_key='SessionId', item_key='ItemId', time_key='timestamp', n_samples=-1, itemmap=None, time_sort=True):
        """
        Args:
            path: path of the csv file
            sep: separator for the csv
            session_key, item_key, time_key: name of the fields corresponding to the sessions, items, time
            n_samples: the number of samples to use. If -1, use the whole dataset.
            itemmap: mapping between item IDs and item indices
            time_sort: whether to sort the sessions by time or not
        """
        self.df = data
        self.session_key = session_key
        self.item_key = item_key
        self.time_key = time_key
        self.time_sort = time_sort
        self.add_item_indices(itemmap=itemmap)
        self.df.sort_values([session_key, time_key], inplace=True)

        # Sort the df by time, and then by session ID. That is, df is sorted by session ID and
        # clicks within a session are next to each other, where the clicks within a session are time-ordered.

        self.click_offsets = self.get_click_offsets()
        self.session_idx_arr = self.order_session_idx()
        
    def get_click_offsets(self):
        # 첫번째 click log 이 시작되는 위치 파악 
        """
        Return the offsets of the beginning clicks of each session IDs,
        where the offset is calculated against the first click of the first session ID.
        """
        offsets = np.zeros(self.df[self.session_key].nunique() + 1, dtype=np.int32)
        # group & sort the df by session_key and get the offset values
        offsets[1:] = self.df.groupby(self.session_key).size().cumsum()

        return offsets

    def order_session_idx(self):
        """ Order the session indices """
        if self.time_sort:
            # starting time for each sessions, sorted by session IDs
            sessions_start_time = self.df.groupby(self.session_key)[self.time_key].min().values
            # order the session indices by session starting times
            session_idx_arr = np.argsort(sessions_start_time)
        else:
            session_idx_arr = np.arange(self.df[self.session_key].nunique())

        return session_idx_arr
    
    def add_item_indices(self, itemmap=None):
        """ 
        Add item index column named "item_idx" to the df
        Args:
            itemmap (pd.DataFrame): mapping between the item Ids and indices
        """
        if itemmap is None:
            item_ids = self.df[self.item_key].unique()  # unique item ids
            item2idx = pd.Series(data=np.arange(len(item_ids)),
                                 index=item_ids)
            itemmap = pd.DataFrame({self.item_key:item_ids,
                                   'item_idx':item2idx[item_ids].values})
        
        self.itemmap = itemmap
        self.df = pd.merge(self.df, self.itemmap, on=self.item_key, how='inner')
        
    @property    
    def items(self):
        return self.itemmap.ItemId.unique()
        
class SessionDataLoader:
    """Credit to yhs-968/pyGRU4REC."""    
    def __init__(self, dataset, batch_size=50):
        """
        A class for creating session-parallel mini-batches.
        Args:
            dataset (SessionDataset): the session dataset to generate the batches from
            batch_size (int): size of the batch
        """
        self.dataset = dataset
        self.batch_size = batch_size
        self.done_sessions_counter = 0
        
    def __iter__(self):
        """ Returns the iterator for producing session-parallel training mini-batches.
        Yields:
            input (B,):  Item indices that will be encoded as one-hot vectors later.
            target (B,): a Variable that stores the target item indices
            masks: Numpy array indicating the positions of the sessions to be terminated
        """

        df = self.dataset.df
        session_key='SessionId'
        item_key='ItemId'
        time_key='TimeStamp'
        self.n_items = df[item_key].nunique()+1
        click_offsets = self.dataset.click_offsets
        session_idx_arr = self.dataset.session_idx_arr

        iters = np.arange(self.batch_size)
        maxiter = iters.max()
        start = click_offsets[session_idx_arr[iters]]
        end = click_offsets[session_idx_arr[iters] + 1]
        mask = [] # indicator for the sessions to be terminated
        finished = False        

        while not finished:
            minlen = (end - start).min()
            # Item indices (for embedding) for clicks where the first sessions start
            idx_target = df.item_idx.values[start]
            for i in range(minlen - 1):
                # Build inputs & targets
                idx_input = idx_target
                idx_target = df.item_idx.values[start + i + 1]
                inp = idx_input
                target = idx_target
                yield inp, target, mask
                
            # click indices where a particular session meets second-to-last element
            start = start + (minlen - 1)
            # see if how many sessions should terminate
            mask = np.arange(len(iters))[(end - start) <= 1]
            self.done_sessions_counter = len(mask)
            for idx in mask:
                maxiter += 1
                if maxiter >= len(click_offsets) - 1:
                    finished = True
                    break
                # update the next starting/ending point
                iters[idx] = maxiter
                start[idx] = click_offsets[session_idx_arr[maxiter]]
                end[idx] = click_offsets[session_idx_arr[maxiter] + 1]

# def create_model(batch_size,train_n_items):   
def create_model(args):  
    ##### Loss 변경 부분 ##### 
    loss = args.loss
    ##### Units #####
    hidden_units = args.units
    emb_size = 50
    size = emb_size

    inputs = Input(batch_shape=(args.batchsize, 1, args.train_n_items))
    gru, gru_states = GRU(hidden_units, stateful=True, return_state=True, name="GRU")(inputs)

    drop2 = Dropout(0.25)(gru)
    predictions = Dense(args.train_n_items, activation='softmax')(drop2)
    model = Model(inputs=inputs, outputs=[predictions])
    opt = keras.optimizers.Adam(lr=0.001, beta_1=0.9, beta_2=0.999, epsilon=None, decay=0.0, amsgrad=False)
    model.compile(loss=loss, optimizer=opt)
    model.summary()

    filepath='./model_checkpoint.h5'
    checkpoint = ModelCheckpoint(filepath, monitor='loss', verbose=2, save_best_only=True, mode='min')
    callbacks_list = []
    return model

# def train_model(model, test_data, train_data,batchsize,epochs, train_samples_qty,eval_all_epochs):
def train_model(model, args,item_sim):
    train_dataset = SessionDataset(args.train_data)
    model_to_train = model
    batchsize = args.batchsize
    k = args.k

    for epoch in range(1, args.epochs):
        with tqdm(total=args.train_samples_qty) as pbar:
            loader = SessionDataLoader(train_dataset, batch_size=args.batchsize)
            for feat, target, mask in loader:

                gru_layer = model_to_train.get_layer(name="GRU")
                hidden_states = gru_layer.states[0].numpy()
                for elt in mask:
                    hidden_states[elt, :] = 0
                gru_layer.reset_states(states=hidden_states)
                
                #to_categorical : one hot encoding
                input_oh = to_categorical(feat, num_classes=loader.n_items)
                input_oh = np.expand_dims(input_oh, axis=1)

                target_oh = to_categorical(target, num_classes=loader.n_items)
                
                #one hot encoding 을 진행하고 train 
                tr_loss = model_to_train.train_on_batch(input_oh, target_oh)

                pbar.set_description("Epoch {0}. Loss: {1:.5f}".format(epoch, tr_loss))
                pbar.update(loader.done_sessions_counter)

        if args.eval_all_epochs:
            recall, mrr, our_recall, our_mrr = get_metrics(model_to_train, args, train_dataset.itemmap,item_sim)
            print("Recall@{} epoch {}: {:5f}".format(k, epoch, recall))
            print("MRR@{}    epoch {}: {:5f}\n".format(k, epoch, mrr))
            print("our Recall@{} epoch {}: {:5f}".format(k, epoch, our_recall))
            print("our MRR@{}    epoch {}: {:5f}\n".format(k, epoch, our_mrr))

    if not args.eval_all_epochs:
        recall, mrr, our_recall,our_mrr = get_metrics(model_to_train, args, train_dataset.itemmap,item_sim)
        print("Recall@{} epoch {}: {:5f}".format(k, args.epochs, recall))
        print("MRR@{}    epoch {}: {:5f}\n".format(k, args.epochs, mrr))
        print("our Recall@{} epoch {}: {:5f}".format(k, args.epochs, our_recall))
        print("our MRR@{}    epoch {}: {:5f}\n".format(k, args.epochs, our_mrr))


def convert_idx_to_id(id_idx , select_item_index ):     
    select_item_ids = []
    for item_idx in select_item_index :
        try:
            select_item_id = id_idx[id_idx['item_idx']==item_idx].iloc[0]['ItemId']
            select_item_ids.append(select_item_id)
        except:
            print(item_idx)
    return select_item_ids

def get_sim_item(id_idx,select_item_id,item_sim):
    # buy data 
    similar_item_idx = []
    for one_id in select_item_id : 
        similarity_item_id = bdsim.pick_sim_items(one_id,item_sim)
        try:
            sim_item_idx = id_idx[id_idx['ItemId']==similarity_item_id].iloc[0]['item_idx']
            similar_item_idx.append(sim_item_idx)
        except:
            continue
    return similar_item_idx

def get_metrics(model, args,train_generator_map,item_sim):
    train_dataset = SessionDataset(args.train_data)
    test_dataset = SessionDataset(args.test_data, itemmap=train_generator_map)
    test_generator = SessionDataLoader(test_dataset, batch_size=args.batchsize)

    k = args.k
    n = 0
    rec_sum = 0
    mrr_sum = 0
    rec_our_sum = 0
    mrr_our_sum=0
    better=0
        
    print("Evaluating model...")
    for feat, label, mask in test_generator:
        gru_layer = model.get_layer(name="GRU")
        hidden_states = gru_layer.states[0].numpy()
        for elt in mask:
            hidden_states[elt, :] = 0
        gru_layer.reset_states(states=hidden_states)

        target_oh = to_categorical(label, num_classes=args.train_n_items)
        
        input_oh  = to_categorical(feat,  num_classes=args.train_n_items)
        input_oh = np.expand_dims(input_oh, axis=1)

        pred = model.predict(input_oh, batch_size=args.batchsize)
        
        for row_idx in range(feat.shape[0]):
            pred_row = pred[row_idx]
            label_row = target_oh[row_idx]

            pred_top_k = pred_row.argsort()[-k:][::-1]
            # print(pred_top_k)
            # [ 2091  6895 14688 16920 16957 14428  8895 10588 20127 14072]
            select_item_index = pred_top_k.tolist()

            select_item_id = convert_idx_to_id(train_generator_map, select_item_index)
            similar_item_idx = get_sim_item(train_generator_map,select_item_id,item_sim)

            # gru 에서 뽑은 k item + similar items 
            our_idx = select_item_index + similar_item_idx
            
            # top + sim > k 이므로 랜덤으로 k 개 추출 
            our_idx_k = random.sample(our_idx,k)
            our_idx = np.array(list(map(np.float, our_idx)))

            rec_idx =  pred_row.argsort()[-k:][::-1]
            mrr_idx =  pred_row.argsort()[-k:][::-1]
            tru_idx = label_row.argsort()[-1:][::-1]
            n += 1

            if tru_idx[0] in rec_idx:
                rec_sum += 1

            if tru_idx[0] in our_idx :
                rec_our_sum +=1
                
            if tru_idx[0] in our_idx:
                try :
                    mrr_our_sum += 1/int((np.where(our_idx == tru_idx[0])[0]+1))
                except :
                    continue
            if tru_idx[0] in mrr_idx:
                mrr_sum += 1/int((np.where(mrr_idx == tru_idx[0])[0]+1))
                
            recall = rec_sum/n 
            mrr = mrr_sum/n
            our_recall = rec_our_sum/n
            our_mrr = mrr_our_sum/n

            # 순위를 고려하지 않는 추천은 recall 이 중요하다고 생각됨 
            if recall <= our_recall :
                better+=1
                
                #####################################
                # UtoPR item data 사용할 경우 
                # GRU4REC 만을 적용했을 때 보다 좋은 결과일 경우 score ++
                # rw.reward_to_mongo(our_ids)
                ######################################
            
    print("------------ours--------------")
    print("recall : ",our_recall ," & mrr : ",our_mrr)
    print("----------baseline-----------")
    print("recall : ",recall ," & mrr : ",mrr)
    print("OURS BETTER or SAME : ",better,"/",n,"counts")


    return recall, mrr, our_recall,our_mrr
    
   

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Keras GRU4REC: session-based recommendations')
    parser.add_argument('--train-path', type=str, default='~/data/sample_dataset/rsc15_train_sample_trn.txt')
    parser.add_argument('--eval-only', type=bool, default=False)
    parser.add_argument('--dev-path', type=str, default='~/data/sample_dataset/rsc15_train_sample_valid.txt')
    parser.add_argument('--test-path', type=str, default='~/data/sample_dataset/rsc15_test_sample.txt')
    parser.add_argument('--buy-path',type=str,default='~/data/sample_dataset/rsc15_buydata_preprocessed.txt')
    
    parser.add_argument('--batchsize', type=str, default=512)
    parser.add_argument('--eval-all-epochs', type=bool, default=False)
    parser.add_argument('--save-weights', type=bool, default=False)
    parser.add_argument('--epochs', type=int, default=2)
    parser.add_argument('--k',type=int,default=20)
    parser.add_argument('--loss',type=str,default=categorical_crossentropy)
    parser.add_argument('--units',type=int,default=1000)


    args = parser.parse_args()

    args.train_data = pd.read_csv(args.train_path, sep='\t', dtype={'ItemId': np.int64})
    args.dev_data   = pd.read_csv(args.dev_path,   sep='\t', dtype={'ItemId': np.int64})
    args.test_data  = pd.read_csv(args.test_path,  sep='\t', dtype={'ItemId': np.int64})
    args.buy_data  = pd.read_csv(args.buy_path,  sep='\t', dtype={'ItemId': np.int64})

    args.train_n_items = len(args.train_data['ItemId'].unique()) + 1

    args.train_samples_qty = len(args.train_data['SessionId'].unique()) + 1
    args.test_samples_qty = len(args.test_data['SessionId'].unique()) + 1

    model = create_model(args)
    # similarity 계산 
    item_sim = bdsim.settings(args.buy_data)
    ##############################################
    # UtoPR web log 사용할 때 
    #feedback 적용하여 K ratio 조절하는 부분 
    # ratio = fb.count_feedbacks()
    ##############################################
    k=args.k

    if args.eval_only:
        train_dataset = SessionDataset(args.train_data)
        recall, mrr, our_recall,our_mrr = get_metrics(model, args, train_dataset.itemmap,item_sim)
        print("GRU UNIT :",args.units ,"Loss : ",args.loss)
        print("Recall@{}  : {:5f}".format(k,  recall))
        print("MRR@{}    : {:5f}\n".format(k,  mrr))
        print("our Recall@{}  : {:5f}".format(k, our_recall))
        print("our MRR@{}     : {:5f}\n".format(k,  our_mrr))
    else:
        train_model(model, args,item_sim)
