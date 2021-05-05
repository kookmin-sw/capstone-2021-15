import os
import sys
import json
import urllib.request

client_id = "JFP6HWCIcCvfXUsfK_2h"
client_secret = "6u2tqJlH2U"

def get_search_url(api_node, search_text, start_num, disp_num):
    base = 'https://openapi.naver.com/v1/search'
    node = '/' + api_node + '.json'
    param_query = '?query=' + urllib.parse.quote(search_text)
    param_start = '&start=' + str(start_num)
    param_disp = '&display=' + str(disp_num)
    
#     return base + node + param_query + param_disp
    return base + node + param_query + param_start + param_disp

def get_result_onpage(url):
    request = urllib.request.Request(url)
    request.add_header('X-Naver-Client-Id', client_id)
    request.add_header('X-Naver-Client-Secret', client_secret)

    response = urllib.request.urlopen(request)

    return json.loads(response.read().decode('utf-8'))

import pandas as pd


def get_fields(json_data,search_text):
    title = [each['title'] for each in json_data['items']]
    product_id = [each['productId'] for each in json_data['items']]
    price = [each['lprice'] for each in json_data['items']]
    link = [each['link'] for each in json_data['items']]
    img = [each['image'] for each in json_data['items']]
#     hprice = [each['hprice'] for each in json_data['items']]
    brand = [each['brand'] for each in json_data['items']]
    category = [each['category1'] for each in json_data['items']]
    tone = search_text

    result_pd = pd.DataFrame(
        {'title': title, 'product_id':product_id,'price': price, 'link': link,
        'image':img,'brand': brand,'category':category,'tone':tone},
        columns=['title', 'product_id','price', 'link','image','brand','category','tone'])

    return result_pd


def main(argv):
    API_NODE = argv[1]
    SEARCH_TEXT = argv[2]

    start_num=1
    disp_num=100
    
    total_result = pd.DataFrame()
    max_call = 0

    while (max_call<10):
        search_url = get_search_url(API_NODE,SEARCH_TEXT,start_num,disp_num)
        result = get_result_onpage(search_url)

        result_pd = get_fields(result,SEARCH_TEXT)
        total_result = pd.concat([total_result,result_pd],axis=0)
        start_num += disp_num
        max_call+=1
    print("END",len(total_result))

if __name__=="__main__":
    main(sys.argv)