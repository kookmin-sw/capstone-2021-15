from bs4 import BeautifulSoup
from pprint import pprint
import requests
from pymongo import MongoClient


class ItemCrawler:
    def __init__(self, req):
        self.req = requests.get(req)
        self.raw = self.req.text
        self.html = BeautifulSoup(self.raw, "html.parser")
        self.item_list = []
        self.brand = self.getBrand()

    def getBrand(self):
        brand_html = self.html.select_one('div.brand')
        self.brand = str(brand_html).split('<')[1].split('\t')[-1]
        return self.brand

    def getItemList(self):
        items_title = self.html.select('option.optnVal')
        for i in items_title:
            item = {}
            item['brand'] = self.brand
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

    test = ItemCrawler('https://chicor.com/goods/0000000000537?dscatNo=71')
    item_list = test.getItemList()
    for i in item_list:
        tmp = {'$set':i}
        collection.update_one(i, tmp, upsert=True)
    print(len(item_list))
