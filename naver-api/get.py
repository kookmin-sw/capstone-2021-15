import os
import sys
import urllib.request

client_id = "JFP6HWCIcCvfXUsfK_2h"
client_secret = "6u2tqJlH2U"

encText = urllib.parse.quote("쿨톤")
url = "https://openapi.naver.com/v1/search/shop.json?query=" + encText # json 결과# url = "https://openapi.naver.com/v1/search/blog.xml?query=" + encText # xml 결과
request = urllib.request.Request(url)
request.add_header("X-Naver-Client-Id",client_id)
request.add_header("X-Naver-Client-Secret",client_secret)
response = urllib.request.urlopen(request)
rescode = response.getcode()
if(rescode==200):
    response_body = response.read()
    print(response_body.decode('utf-8'))
else:
    print("Error Code:" + rescode)
