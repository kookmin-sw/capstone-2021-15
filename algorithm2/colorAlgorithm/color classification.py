from math import sqrt
import numpy as np
import cv2

# PCCS tone 별로 dataset 만들기
# 톤 이름 딕셔너리에 저장
tone = {1:"p",2:"lt",3:"b",4:'v'}

# [x(v, 명도), y(s, 채도),tone(번호)]
dataset = [[,,],
            ]
# 계절 정보 저장 ex) springWarm = ['p','lt'.....]

#read image
img = cv2.imread('colors.jpg')


# RGB를 HSV로 바꿔서 각각 명도값 채도값 할당
img = cv2.cvtColor(img, cv2.COLOR_RGB2HSV)

#get hsv values from image to 1D array
h, s, v = cv2.split(img)
h = h.flatten()
s = s.flatten()
v = v.flatten()



temp =   #웜/쿨
inputColor = [v,s]


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
neighbors = get_neighbors(dataset, inputColor, 1)
for neighbor in neighbors:
    print(neighbor)


