import re
from bs4 import BeautifulSoup
import requests
# from pymongo import MongoClient
import json
import os
from pprint import pprint
# from selenium import webdriver
# from selenium.webdriver.support.ui import Select


# 헤어 단일 상품만 가능
class ItemCrawler_olive:
    def __init__(self, req, category2):
        self.site = req
        self.category1 = 'hair'
        self.res = requests.get(site)
        self.html = BeautifulSoup(self.res.text, "html.parser")
        self.item_list = []
        self.brand = self.get_brand()
        self.price = self.get_price()
        self.name = self.get_name()
        self.category2 = category2

    def get_brand(self):
        self.brand = self.html.select_one('p.prd_brand').get_text()
        return self.brand

    def get_price(self):  # 31000
        try:
            price_span = self.html.select_one('span.price-1').get_text()
            price_str = re.findall('\d+', price_span)
            self.price = int(''.join(price_str))

        except:
            price_span = self.html.select_one('span.price-2').get_text()
            price_str = re.findall('\d+', price_span)
            self.price = int(''.join(price_str))
        return self.price


    def get_name(self):
        self.name = self.html.select_one('p.prd_name').get_text()
        return self.name

    def get_itemList(self):
        # items_div = self.html.find_all('div', {'class': 'color'})
        # for i in items_div:
        item = {}

        data_code = self.html.find('meta', property='eg:itemUrl')['content']
        img = self.html.select_one('div.prd_img').find('img')['src']
        try:
            color = self.html.select_one('div.prd_colorchip_list').find('img')['src']
        except:
            color = img
        item['site'] = self.site
        item['brand'] = self.brand[1:-1]
        item['name'] = self.name
        item['category1'] = self.category1
        item['category2'] = self.category2
        item['data-code'] = data_code
        item['price'] = self.price
        item['title'] = self.name # 올리음브영은 name에 상품 title들을 다 포함시키고 있
        item['img-url'] = img
        item['color-url'] = color
        return item


if __name__ == '__main__':
    site_list = [
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000140402&dispCatNo=1000001000400050001&trackingCd=Search_Result',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000123418&dispCatNo=1000001000400050003&trackingCd=Search_Result',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000123210&dispCatNo=1000001000400050003&trackingCd=Search_Result',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000123209&dispCatNo=1000001000400050003&trackingCd=Search_Result',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000122143&dispCatNo=1000001000400050003&trackingCd=Search_Result',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000140463&dispCatNo=1000001000400050003&trackingCd=Search_Result',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000122138&dispCatNo=1000001000400050003&trackingCd=Search_Result',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000122132&dispCatNo=1000001000400050003&trackingCd=Search_Result',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000135526&dispCatNo=1000001000400050003&trackingCd=Search_Result',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000014483&dispCatNo=1000001000400050003&trackingCd=Search_Result',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000014621&dispCatNo=1000001000400050004&trackingCd=Search_Result',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000123206&dispCatNo=1000001000400050003&trackingCd=Search_Result',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000122130&dispCatNo=1000001000400050003&trackingCd=Search_Result',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000122141&dispCatNo=1000001000400050003&trackingCd=Search_Result',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000135524&dispCatNo=1000001000400050003&trackingCd=Search_Result',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000140403&dispCatNo=1000001000400050001&trackingCd=Search_Result',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000140398&dispCatNo=1000001000400050003&trackingCd=Search_Result',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000123211&dispCatNo=1000001000400050003&trackingCd=Search_Result',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000131851&dispCatNo=1000001000400050003&trackingCd=Search_Result',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000123208&dispCatNo=1000001000400050003&trackingCd=Search_Result',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000122136&dispCatNo=1000001000400050003&trackingCd=Search_Result',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000122139&dispCatNo=1000001000400050003&trackingCd=Search_Result',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000127219&trackingCd=BrandA000577_PROD',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000118004&trackingCd=BrandA000577_PROD',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000118002&trackingCd=BrandA000577_PROD',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000102934&trackingCd=BrandA000577_PROD',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000008910&trackingCd=BrandA000577_PROD',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000008912&trackingCd=BrandA000577_PROD',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000008913&trackingCd=BrandA000577_PROD',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000014484&trackingCd=BrandA000577_PROD',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000008909&trackingCd=BrandA000577_PROD',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000008906&trackingCd=BrandA000577_PROD',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000008905&trackingCd=BrandA000577_PROD',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000008904&trackingCd=BrandA000577_PROD',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000005010&trackingCd=BrandA000577_PROD',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000001204&trackingCd=BrandA000577_PROD',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000001202&trackingCd=BrandA000577_PROD',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000122135&dispCatNo=1000001000400050003&trackingCd=Search_Result',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000122134&dispCatNo=1000001000400050003&trackingCd=Search_Result',
        'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000122131&dispCatNo=1000001000400050003&trackingCd=Search_Result'
    ]

    # site = 'https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000008910&trackingCd=BrandA000577_PROD'
    # response = requests.get(site)
    # html = response.text
    # soup = BeautifulSoup(html, "html.parser")
    #
    # test = ItemCrawler_olive(site, 'hair-color')
    # item_list = test.get_itemList()
    # pprint(item_list)
    json_path = '../images/hair_colors.json'
    json_data = []
    if os.path.isfile(json_path):
        f = open('../images/hair_colors.json', 'r+', encoding='utf-8')
        json_data = json.load(f)
        f.close()
        os.remove(json_path)

    for site in site_list:
        f = open('../images/hair_colors.json', 'w+', encoding='utf-8')
        json.dump(json_data, f, ensure_ascii=False, indent='\t')
        category2 = 'hair-color'
        test = ItemCrawler_olive(site, category2)
        item_list = test.get_itemList()
        pprint(item_list)
        json_data += [item_list]

    f = open('../images/hair_colors.json', 'w+', encoding='utf-8')
    json.dump(json_data, f, ensure_ascii=False, indent='\t')

    f.close()
