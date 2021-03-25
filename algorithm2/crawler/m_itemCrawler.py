import re
from bs4 import BeautifulSoup
import requests
from pymongo import MongoClient
import json
import os.path

class ItemCrawler:
    def __init__(self, req, category2):
        self.site = req
        self.category1 = 'makeup'
        self.req = requests.get(req)
        self.raw = self.req.text
        self.html = BeautifulSoup(self.raw, "html.parser")
        self.item_list = []
        self.brand = self.get_brand()
        self.price = self.get_price()
        self.name = self.get_name()
        self.category2 = category2

    def get_brand(self):
        brand_html = self.html.select_one('div.brand')
        self.brand = str(brand_html).split('<')[1].split('>')[-1]
        return self.brand

    def get_price(self): #31.000
        price_txt = self.html.select_one('div.price')
        self.price_txt = price_txt.select_one('strong').text
        self.price_str = re.findall('\d+', self.price_txt)
        self.price = int(''.join(self.price_str))
        return self.price

    def get_name(self):
        name_html = self.html.select_one('div.name')
        self.name = name_html.text
        return self.name

    def get_itemList(self):
        items_div = self.html.find_all('div', {'class': 'thumbnails'})
        for i in items_div:
            item = {}
            data_code = i['id']
            goods_li = i.findAll('li')
            img = goods_li[0].find('img')
            title = img['alt']
            item_img = img['src']
            item['brand'] = self.brand
            item['name'] = self.name
            item['category1'] = self.category1
            item['category2'] = self.category2
            item['data-code'] = data_code
            item['price'] = self.price
            item['title'] = title
            item['img-url'] = item_img
            self.item_list += [item]

        item_detail = self.html.find_all('label', {'class': 'color-item'})
        for idx, item in enumerate(item_detail):
            color_url = str(item).split('url(')[1].split(')')[0]
            self.item_list[idx]['color-url'] = color_url
        return self.item_list


if __name__ == '__main__':
    # mongodb
    # client = MongoClient('mongodb://localhost:27017/')
    # db = client['test']
    # collection = db['items']
    site = 'https://m.chicor.com/goods/0000000000537?dscatNo=71'
    category2 = 'lip'
    test = ItemCrawler(site, category2)
    item_list = test.get_itemList()
    # print(item_list)


    if os.path.isfile('./items.json'):
        with open('items.json', 'r', encoding='utf-8') as f:
            json_data_before = json.load(f)
        json_data_after = json_data_before + item_list

        with open('items.json', 'w', encoding='utf-8') as make_file:
            json.dump(json_data_after, make_file, ensure_ascii=False, indent='\t')
    else:
        with open('items.json', 'w', encoding='utf-8') as make_file:
            json.dump(item_list, make_file, ensure_ascii=False, indent='\t')
    # for i in item_list:
        # tmp = {'$set' : i}
        # collection.update_one(i, tmp, upsert=True)



