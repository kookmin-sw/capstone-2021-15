import re
from bs4 import BeautifulSoup
import requests
from pymongo import MongoClient
import json
import os


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

    def get_price(self):  # 31.000
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
    site_format = 'https://m.chicor.com/goods/'
    site_list = [
        # 1페이지
        '0000000000537?dscatNo=71',
        '0000000002355?dscatNo=71',
        '0000000033043?dscatNo=71',
        '0000000001802?dscatNo=71',
        '0000000003312?dscatNo=71',
        '0000000030726?dscatNo=71',
        '0000000001803?dscatNo=71',
        '0000000001993?dscatNo=71',
        '0000000031630?dscatNo=71',
        '0000000021329?dscatNo=71',
        '0000000000100?dscatNo=71',
        '0000000004754?dscatNo=71',
        '0000000031382?dscatNo=71',
        '0000000003712?dscatNo=71',
        '0000000034441?dscatNo=71',
    ]
    json_path = '../images/items.json'
    json_data = []
    if os.path.isfile(json_path):
        f = open('../images/items.json', 'r+', encoding='utf-8')
        json_data = json.load(f)
        f.close()
        os.remove(json_path)

    for item in site_list:
        site = site_format + item
        category2 = 'lip'
        test = ItemCrawler(site, category2)
        item_list = test.get_itemList()
        # print(item_list)
        json_data += item_list

        # # for i in item_list:
        # tmp = {'$set' : i}
        # collection.update_one(i, tmp, upsert=True)
    f = open('../images/items.json', 'w+', encoding='utf-8')
    json.dump(json_data, f, ensure_ascii=False, indent='\t')

    f.close()
