"""

N 개 선택하는 방법

select_act : 조건에 맞는 select 실행 
cold_act : click log , impression log 둘다 충분하지 않을 때 
partial_act : impression log 는 쌓여있고 click log 가 충분하지 않을 때 부분적으로 랜덤하게 뽑는 과정 
warm_act : click log , impression log 가 충분할 때 reward 를 기준으로 ranking 과정을 거쳐 상품을 뽑는 과정 

"""


import random
import pymongo
import json
from bson import json_util


MONGODB_USER = ''
MONGODB_PASSWORD = ''
MONGODB_URI = '' % (MONGODB_USER, MONGODB_PASSWORD)
MONGODB_DATABASE = 'utopr'
client = pymongo.MongoClient(MONGODB_URI)
db = client[MONGODB_DATABASE]
col = db['products']


def select_act(N,psc,category):
    count = col.find().count()
    non_impressioned_count= col.find({"impression":{'$exists':False}}).count()
    non_clicked_count= col.find({"click_log":{'$exists':False}}).count()
    print(count)
    print(non_impressioned_count ," : ",non_clicked_count)

    # cold start , partial start , warm start 기준 나눌 standard_count
    # count 는 전체 상품의 개수 
    standard_count = count*1/4

    # 전체 상품의 1/4도 아직 user 에게 보여주지 않았다면 cold start 
    if non_impressioned_count > standard_count:
        # id list 반환 
        impression = cold_select(N,psc,category)
        acted='Cold start : random in total items 3 '

    # impression 된 상품은 기준 이상이나, click 된 상품이 기준 이하인 경우 
    # 1개는 top click_count ,N-1은 전체 상품에서 random 
    elif non_clicked_count > standard_count :
        impression=partial_select(N,psc,category)
        acted='Partial start : reward Top 1 + random in total items 2'

    #########################################################################
    # recommend system 적용할 부분 
    # 지금은 reward top seelct 
    # 1개는 top click_count , N-1 은 reward가 양수인 상품에서 random 
    else:
        impression = warm_select(N,psc,category)
        acted='Warm start : reward Top1 + random in positive_reward 2'
    
    impression = parse_json(impression)

    return  {"how":acted,"result":impression} 

def parse_json(data):
    return json.loads(json_util.dumps(data))

def cold_select(N,psc,category):
    # item 전체를 섞고 N 개 뽑기
    random_items = col.aggregate([{'$match':{'category2':category,'season' : psc }},{'$sample':{'size':N}}])

    pick_items = [ items for items in random_items]

    return pick_items

def partial_select(N,psc,category):
    pick_items=[]

    # 전체 N개 중에 1개는 reward 가장 큰 상품 하나 고르고 
    sorting=col.find().sort("click_log",-1)
    top_item=sorting[:1]


    for x in top_item:
        pick_items.append(x)

    # 나머지 N-1 개는 전체 상품에서(지정한 set가 있다면 지정 세트 내에서) 랜덤으로 2개 뽑는다
    random_items = col.aggregate([{'$match':{'category2' : category,'season' : psc }},{'$sample':{'size':N}}])
    

    random_items = [ items for items in random_items]
    random_items.sort(key=lambda random_items:random_items['click_log'],reverse=True)


    for i in range(N-1):
        pick_items.append(random_items[i])


    return pick_items


def warm_select(N,psc,category):
    pick_items=[]   

    sorting=col.find({'category2' : category , 'season' : psc }).sort("click_log",-1)
    
    # top reward product 가져오기 
    top_item=sorting[:1]

    for x in top_item:
        pick_items.append(x)
    
    # 0 ( standard_reward ) 보다 큰 reward 를 갖는 product 의 평균
    average_reward = calc_average_reward(0,psc,category)


    random_items = col.aggregate([{'$match':{'category2' : category , 'season' : psc ,'click_log':{'$gt':average_reward } }},{'$sample':{'size':N-1}}])

    pick_random_standard_items = [ items for items in random_items]
    pick_random_standard_items.sort(key=lambda pick_random_standard_items:pick_random_standard_items['click_log'],reverse=True)
    
    print(len(pick_random_standard_items))
    for i in range(N-1):
        pick_items.append(pick_random_standard_items[i])
        
    return pick_items

def calc_average_reward(standard_reward ,psc,category):
    positive_reward_products = col.find({'click_log':{'$gt':standard_reward} ,'category2' : category , 'season' : psc })
    positive_reward_products_count = col.find({'click_log':{'$gt':standard_reward} ,'category2' : category , 'season' : psc }).count()
    
    click_sum=0

    for item in positive_reward_products :
        click_sum+=item['click_log']

    try:
        average_reward = click_sum//positive_reward_products_count
    except:
        average_reward = -1

    return average_reward 


