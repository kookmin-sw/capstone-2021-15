import time
import random
import numpy as np
import pandas as pd

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
    return filtered_df 

if __name__ == '__main__':
    results = settings()
    results.to_csv( './rsc15_buydata_preprocessed.txt', 
                sep='\t', index=False)