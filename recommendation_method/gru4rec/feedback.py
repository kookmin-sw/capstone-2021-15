import random
import pymongo
import json
from bson import json_util


MONGODB_USER = 'utopr'
MONGODB_PASSWORD = 'capstone15'
MONGODB_URI = 'mongodb://%s:%s@13.209.65.64:27017' % (MONGODB_USER, MONGODB_PASSWORD)
MONGODB_DATABASE = 'utopr'
client = pymongo.MongoClient(MONGODB_URI)
db = client[MONGODB_DATABASE]
col = db['feedbacks']


def count_feedbacks():
    ratio=0
    bad_feedback=list(col.find({'feedback':'bad'}))
    good_feedback=list(col.find({'feedback':'good'}))

    if len(bad_feedback) >len(good_feedback):
        ratio = (len(bad_feedback)-len(good_feedback))/len(bad_feedback)*100
    return ratio
