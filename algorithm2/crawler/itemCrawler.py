import re
from bs4 import BeautifulSoup
import requests
from pymongo import MongoClient


class ItemCrawler:
    def __init__(self, req, category2):
        self.site = req
        self.category1 = 'makeup'
        self.category2 = category2
        self.req = requests.get(req)
        self.raw = self.req.text
        self.html = BeautifulSoup(self.raw, "html.parser")
        self.item_list = []
        self.goods_detail_html = self.html.select_one('div.goods-detail-info')
        self.brand = self.get_brand()
        self.name = self.get_name()
        self.price = self.get_price()

    def get_brand(self):
        brand_html = self.html.select_one('div.brand')
        self.brand = str(brand_html).split('<')[1].split('\t')[-1]
        return self.brand

    def get_name(self): # ex) lipstick(korean)
        self.name = self.goods_detail_html.select_one('h1').text
        return self.name

    def get_price(self): #31.000
        price_txt = self.goods_detail_html.select_one('div.price-inner strong').text
        price_frac = re.findall("\d+", price_txt)
        price_str = ''.join(price_frac)
        self.price = int(price_str)
        return self.price


    def get_itemList(self):
        items_title = self.html.select('option.optnVal')
        for i in items_title:
            item = {}
            item['site'] = self.site
            item['brand'] = self.brand
            item['category1'] = self.category1
            item['category2'] = self.category2
            item['name'] = self.name
            item['price'] = self.price
            title = i.get_text()
            item['title'] = title
            data_code = i.get('value')
            item['data-code'] = data_code

            self.item_list += [item]

        item_detail = self.html.select('label .color')

        for idx, item in enumerate(item_detail):
            url = item['style'].split("url(")[1][:-2]
            self.item_list[idx]['color-url'] = url

        return self.item_list


if __name__ == '__main__':
    # mongodb
    client = MongoClient('mongodb://localhost:27017/')
    db = client['test']
    collection = db['items']
    site = 'https://chicor.com/goods/0000000000537?dscatNo=71'
    test = ItemCrawler(site, 'lip')
    item_list = test.get_itemList()
    for i in item_list:
        tmp = {'$set' : i}
        collection.update_one(i, tmp, upsert=True)
    print(len(item_list))
