from math import sqrt
import numpy as np
import cv2
import colorsys
from colormath.color_objects import LabColor, sRGBColor
from colormath.color_conversions import convert_color
from colorExtraction import DominantColors
import json


# PCCS tone 별로 dataset 만들기
# 톤 이름 딕셔너리에 저장
pccs = {1:"p",2:"lt",3:"b",4:'v'}

# [x(v, 명도), y(s, 채도),tone(번호)]
dataset = [
            ]
# 계절 정보 저장 ex) springWarm = ['p','lt'.....]



  #웜/쿨


# -------------------------------------------------------------------------------------------------------------------------
# 두 점 사이 거리 구하기 - Euclidean distance
# row = [x, y, tone]
def euclidean_distance(row1, row2):
    distance = 0.0
    for i in range(len(row1) - 1):
        distance += (row1[i] - row2[i]) ** 2
    return sqrt(distance)

## test ##
# for row in dataset:
#     distance = euclidean_distance(inputColor, row)
#     print(distance)


# 가장 가까이 있는 num_neighbors개의 요소 뽑기
def get_neighbors(toneDataset, inputColor, num_neighbors):
    distances = list()
    for tone_row in toneDataset:
        dist = euclidean_distance(inputColor, tone_row)
        distances.append((tone_row, dist))
    distances.sort(key=lambda x: x[1])
    neighbors = list()
    for i in range(num_neighbors):
        neighbors.append(distances[i][0])
    return neighbors

## test ##
f = open('../images/items.json', 'r+', encoding='utf-8')
json_data = json.load(f)
f.close()
img = json_data[0]["color-url"]
clusters = 1  # 클러스터의 크기 = 이미지에서 추출할 색상 갯수 (단일 색상의 경우 1, 색이 다양할 경우 3~5로 하여 중간값으로 해야할 것 ㅏㄱㅌ음)
dc = DominantColors(img, clusters)
colors = dc.dominantColors()
r = colors[0][0]
g = colors[0][1]
b = colors[0][2]

hsv = colorsys.rgb_to_hsv(r/255, g/255, b/255)
s = hsv[0][1]       #명도
v = hsv[0][2]       #채도




neighbors = get_neighbors(dataset, inputColor, 1)
for neighbor in neighbors:
    print(neighbor)


