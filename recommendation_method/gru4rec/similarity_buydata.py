import time
import random
import numpy as np
import pandas as pd
import datetime as dt

from scipy import sparse as sp
from sklearn.metrics.pairwise import cosine_similarity


# data : 중복 제거된 data 
# length : 길이 몇 이상인 데이터로 할 것 인지 
def filter_session(data,length):
    session_lists = list(data['SessionId'].value_counts().index)
    filtered_df = pd.DataFrame()
    for user in session_lists:
        filtered_user_df = data[data['SessionId']==user]
        if len(filtered_user_df) > length :
            filtered_df = pd.concat([filtered_df,filtered_user_df])
    return filtered_df 

def cosine_sim(session_item_spm):
    print("START : buy_data to calc similairty")
    item_spm = cosine_similarity(session_item_spm.transpose(),dense_output=False)
    return item_spm

def pick_sim_items(recommend_item,item_sim):
    max_similarity = 0
    cnt = item_sim.indptr[recommend_item+1] - item_sim.indptr[recommend_item]
    idx = item_sim.indptr[recommend_item]
    for j in range(cnt):
        if item_sim.data[idx] > max_similarity and item_sim.indices[idx] != recommend_item:
            max_similarity = item_sim.data[idx]
            similar_item = item_sim.indices[idx]
        idx += 1
    return similar_item

def settings():
    ## load data
    raw_data = pd.read_csv('~/data/yoochoose-buys.dat', sep=',', \
                    header=None, usecols=[0,1,2], dtype={0:np.int32, 1:str, 2:np.int64})
    raw_data.columns = ['SessionId', 'TimeStamp', 'ItemId']

    # time stamp 버리고 
    dropped_timestamp = raw_data.drop('TimeStamp',axis=1)
    # session id & item id 쌍 중복 제거 
    dropped_duplicates = dropped_timestamp.drop_duplicates()

    ############ session 길이 설정하는 부분 ###############
    session_length = 2
    filtered_df = filter_session(dropped_duplicates,session_length)

    session_id = np.array(filtered_df['SessionId'])
    item_id = np.array(filtered_df['ItemId'])

    # session_item_spm = sp.coo_matrix((np.ones((len(session_id),)), (session_id, item_id)))
    session_item_spm = sp.csr_matrix((np.ones((len(session_id),)), (session_id, item_id)))
    num_users, num_items = session_item_spm.shape

    item_sim = cosine_sim(session_item_spm)

    return item_sim
