import re
from bs4 import BeautifulSoup
import requests
import json
from pprint import pprint
import os.path

def extractURL(req):
    req = requests.get(req)
    raw = req.text
    html = BeautifulSoup(raw, "html.parser")
    div_tag = html.find_all('a', {'class':'name'})
    urls = []
    for i in div_tag:
        tmp = str(i).split('(')[1].split(')')[0]
        onlyNum = re.findall('\d+', tmp)

        print(onlyNum)
        urls += ['https://m.chicor.com/goods/'+onlyNum[0]+'?dscatNo='+onlyNum[1]]
    return urls

if __name__ =='__main__':
    # 사이트
    # site='https://chicor.com/goods?dscatNo1=2&dscatNo=71&reqDscatNo=71&re=Y&currPage=5&dscatNo2=13&dscatNo3=71&hrchyLv=3&alinTy=RCMD&srchBranNm=&srchBranCdList=&srchFltrKwrdList=&srchFltrColrchipList=&srchAmtRangList=&srchAmtRangFlrList=&srchAmtRangOriList=&srchFltrTotalList='

    urls = extractURL(site)
    # 현재 디렉토리의 'urls.json'으로 들어감

    if os.path.isfile('./urls.json'):
        with open('urls.json', 'r', encoding='utf-8') as f:
            json_data_before = json.load(f)
        json_data_after = json_data_before + urls

        with open('urls.json', 'w', encoding='utf-8') as make_file:
            json.dump(json_data_after, make_file, ensure_ascii=False, indent='\t')
    else:
        with open('urls.json', 'w', encoding='utf-8') as make_file:
            json.dump(urls, make_file, ensure_ascii=False, indent='\t')