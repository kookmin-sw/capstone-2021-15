from math import sqrt
import numpy as np
import cv2
import colorsys
from colormath.color_objects import LabColor, sRGBColor
from colormath.color_conversions import convert_color
import rgb2lab
from colorExtraction import DominantColors
import json
import urllib.request
import ssl

context = ssl._create_unverified_context()


# PCCS tone dataset [v(명도), s(채도), PCCS tone]
pccsToneDataset = [
    [6.25,22.22222222,'p'],[6.25,55.55555555,'lt'],[12.5,88.88888888,'b'],
[31.25,22.22222222,'ltg'],[31.25,55.55555555,'sf'],[50,88.88888888,'s'],[50,100,'v'],
[62.5,22.22222222,'g'],[62.5,55.55555555,'d'],[81.25,88.88888888,'dp'],
[87.5,22.22222222,'dkg'],[87.5,55.55555555,'d']
]

# season
spring = ['p','lt','b','v']
summer = ['p','lt','b','ltg','sf','g','d']
fall = ['ltg','sf','s','g','d','dp','dkg','dk']
winter = ['s','v','dp','dkg','dk']


def findNeighbors(rgbColor):
    hsv = colorsys.rgb_to_hsv(rgbColor[0][0] / 255, rgbColor[0][1] / 255, rgbColor[0][2] / 255)
    s = hsv[1] * 100  # 명도
    v = hsv[2] * 100  # 채도
    # rgb -> lab 변환 후 b값 가져오기
    #lab = convert_color(rgb, LabColor, through_rgb_type=sRGBColor)
    b = rgb2lab.rgb2lab(rgbColor[0])[2]
    print(b)
    inputColor = [v,s]
    print(inputColor)
    inputTone = get_neighbors(pccsToneDataset,inputColor)
    print(inputTone)
    toneDataLabeling(b,v,s,inputTone[0][2])


def toneDataLabeling(b,v,s,tone):
    json_data[0]["v"] = v
    json_data[0]["s"] = s
    json_data[0]["tone"] = tone
    if b > 0:
        if tone in spring:
            print("봄 웜")
            json_data[0]["season"] = "spring"
        else:
            print("가을 웜")
            json_data[0]["season"] = "fall"
    elif b < 0:
        if tone in summer:
            print("여름 쿨")
            json_data[0]["season"] = "summer"
        else:
            print("겨울 쿨")
            json_data[0]["season"] = "winter"


# Euclidean distance
# row = [v, s, tone]
def euclidean_distance(row1, row2):
    distance = 0.0
    for i in range(len(row1)):
        distance += (row1[i] - row2[i]) ** 2
    return sqrt(distance)


# 가장 가까운 점 찾기(num_neighbors개)
def get_neighbors(toneDataset, inputColor, num_neighbors=1):
    distances = list()
    for tone_row in toneDataset:
        dist = euclidean_distance(inputColor, tone_row)
        distances.append((tone_row, dist))
    distances.sort(key=lambda x: x[1])
    neighbors = list()
    for i in range(num_neighbors):
        neighbors.append(distances[i][0])
    return neighbors

def url_to_image(url):
    # download the image, convert it to a NumPy array, and then read
    # it into OpenCV format
    resp = urllib.request.urlopen(url, context=context)
    image = np.asarray(bytearray(resp.read()), dtype="uint8")
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)
    # return the image
    return image


f = open('../images/items.json', 'r+', encoding='utf-8')
json_data = json.load(f)
f.close()

img = url_to_image(json_data[122]["color-url"])   # data for문으로
dc = DominantColors(img)
color = dc.dominantColors()
print(color)
findNeighbors(color)
print(json_data[122])

