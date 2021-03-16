from bs4 import BeautifulSoup
from pprint import pprint
import requests
from pymongo import MongoClient
import json


# mongodb
client = MongoClient('mongodb://localhost:27017/')
db = client['test']
collection = db['items']

req = requests.get('https://chicor.com/goods/0000000000537?dscatNo=71')
raw = req.text
html = BeautifulSoup(raw, "html.parser")

goods_title = html.select('option.optnVal')

brand_html = html.select_one('div.brand')
brand = str(brand_html).split('<')[1].split('\t')[-1]

goods_list = []

for i in goods_title:
    goods = {}
    goods['brand'] = brand
    title = i.get_text()
    data_code = i.get('value')
    goods['title'] = title
    goods['data-code'] = data_code
    goods_list += [goods]

# pprint(goods_title)
# pprint(goods_detail)

#
goods_detail = html.select('label .color')

for idx, item in enumerate(goods_detail):
    url = item['style'].split("url(")[1][:-2]
    data_code = item.parent.find('input', attrs={'name': 'goodsOptions'})['data-code']
    goods_list[idx]['color-url'] = url

collection.insert_many(goods_list, ordered=False)
