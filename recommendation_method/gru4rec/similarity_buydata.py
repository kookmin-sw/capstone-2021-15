import time
import random
import numpy as np
import pandas as pd
import datetime as dt

from scipy import sparse as sp
from sklearn.metrics.pairwise import cosine_similarity


def cosine_sim(session_item_spm):
    print("START : buy_data to calc similairty")
    item_spm = cosine_similarity(session_item_spm.transpose(),dense_output=False)
    return item_spm

def pick_sim_items(recommend_item,item_sim):
    max_similarity = 0
    cnt = item_sim.indptr[recommend_item+1] - item_sim.indptr[recommend_item]
    idx = item_sim.indptr[recommend_item]
    similar_item = 0
    for _ in range(cnt):
        if item_sim.data[idx] > max_similarity and item_sim.indices[idx] != recommend_item:
            max_similarity = item_sim.data[idx]
            similar_item = item_sim.indices[idx]
        idx += 1
    return similar_item

def settings(buydata):
    session_id = np.array(buydata['SessionId'])
    item_id = np.array(buydata['ItemId'])

    # session_item_spm = sp.coo_matrix((np.ones((len(session_id),)), (session_id, item_id)))
    session_item_spm = sp.csr_matrix((np.ones((len(session_id),)), (session_id, item_id)))
    num_users, num_items = session_item_spm.shape

    item_sim = cosine_sim(session_item_spm)

    return item_sim
