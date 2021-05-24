import re
from bs4 import BeautifulSoup
import requests
from pymongo import MongoClient
import json
import os
import time


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
            item['site'] = self.site
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
    site_list = [
        # 2-5페이지
        "https://m.chicor.com/goods/0000000030358?dscatNo=71",
        "https://m.chicor.com/goods/0000000022260?dscatNo=71",
        "https://m.chicor.com/goods/0000000028625?dscatNo=71",
        "https://m.chicor.com/goods/0000000000852?dscatNo=71",
        "https://m.chicor.com/goods/0000000035565?dscatNo=71",
        "https://m.chicor.com/goods/0000000031407?dscatNo=71",
        "https://m.chicor.com/goods/0000000032841?dscatNo=71",
        "https://m.chicor.com/goods/0000000034623?dscatNo=71",
        "https://m.chicor.com/goods/0000000021013?dscatNo=71",
        "https://m.chicor.com/goods/0000000001929?dscatNo=71",
        "https://m.chicor.com/goods/0000000004030?dscatNo=71",
        "https://m.chicor.com/goods/0000000021484?dscatNo=71",
        "https://m.chicor.com/goods/0000000002638?dscatNo=71",
        "https://m.chicor.com/goods/0000000034405?dscatNo=71",
        "https://m.chicor.com/goods/0000000004490?dscatNo=71",
        "https://m.chicor.com/goods/0000000004310?dscatNo=71",
        "https://m.chicor.com/goods/0000000004994?dscatNo=71",
        "https://m.chicor.com/goods/0000000000519?dscatNo=71",
        "https://m.chicor.com/goods/0000000001740?dscatNo=71",
        "https://m.chicor.com/goods/0000000033824?dscatNo=71",
        "https://m.chicor.com/goods/0000000002672?dscatNo=71",
        "https://m.chicor.com/goods/0000000028624?dscatNo=71",
        "https://m.chicor.com/goods/0000000033825?dscatNo=71",
        "https://m.chicor.com/goods/0000000008970?dscatNo=71",
        "https://m.chicor.com/goods/0000000034030?dscatNo=71",
        "https://m.chicor.com/goods/0000000021485?dscatNo=71",
        "https://m.chicor.com/goods/0000000006536?dscatNo=71",
        "https://m.chicor.com/goods/0000000031414?dscatNo=71",
        "https://m.chicor.com/goods/0000000021441?dscatNo=71",
        "https://m.chicor.com/goods/0000000008432?dscatNo=71",
        "https://m.chicor.com/goods/0000000028000?dscatNo=71",
        "https://m.chicor.com/goods/0000000020296?dscatNo=71",
        "https://m.chicor.com/goods/0000000002761?dscatNo=71",
        "https://m.chicor.com/goods/0000000000544?dscatNo=71",
        "https://m.chicor.com/goods/0000000002623?dscatNo=71",
        "https://m.chicor.com/goods/0000000026331?dscatNo=71",
        "https://m.chicor.com/goods/0000000002789?dscatNo=71",
        "https://m.chicor.com/goods/0000000003711?dscatNo=71",
        "https://m.chicor.com/goods/0000000025117?dscatNo=71",
        "https://m.chicor.com/goods/0000000021008?dscatNo=71",
        "https://m.chicor.com/goods/0000000021901?dscatNo=71",
        "https://m.chicor.com/goods/0000000005671?dscatNo=71",
        "https://m.chicor.com/goods/0000000001801?dscatNo=71",
        "https://m.chicor.com/goods/0000000035464?dscatNo=71",
        "https://m.chicor.com/goods/0000000026334?dscatNo=71",
        "https://m.chicor.com/goods/0000000025119?dscatNo=71",
        "https://m.chicor.com/goods/0000000001713?dscatNo=71",
        "https://m.chicor.com/goods/0000000008281?dscatNo=71",
        "https://m.chicor.com/goods/0000000005926?dscatNo=71",
        "https://m.chicor.com/goods/0000000033826?dscatNo=71",
        "https://m.chicor.com/goods/0000000025118?dscatNo=71",
        "https://m.chicor.com/goods/0000000002121?dscatNo=71",
        "https://m.chicor.com/goods/0000000034784?dscatNo=71",
        "https://m.chicor.com/goods/0000000000539?dscatNo=71",
        "https://m.chicor.com/goods/0000000000210?dscatNo=71",
        "https://m.chicor.com/goods/0000000005686?dscatNo=71",
        "https://m.chicor.com/goods/0000000000330?dscatNo=71",
        "https://m.chicor.com/goods/0000000007644?dscatNo=71",
        "https://m.chicor.com/goods/0000000000671?dscatNo=71",
        "https://m.chicor.com/goods/0000000001420?dscatNo=71"

    ]
    json_path = '../images/lips.json'
    json_data = []
    start = time.time()
    if os.path.isfile(json_path):
        f = open('../images/lips.json', 'r+', encoding='utf-8')
        json_data = json.load(f)
        f.close()
        os.remove(json_path)

    for site in site_list:
        try:
            category2 = 'lip'

            test = ItemCrawler(site, category2)
            item_list = test.get_itemList()
            # print(item_list)
            json_data += item_list

            # # for i in item_list:
            # tmp = {'$set' : i}
            # collection.update_one(i, tmp, upsert=True)
        except:
            pass
    f = open('../images/lips.json', 'w+', encoding='utf-8')
    json.dump(json_data, f, ensure_ascii=False, indent='\t')

    f.close()

    print('총 걸린 시간', time.time() - start)
