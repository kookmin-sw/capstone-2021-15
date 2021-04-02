from math import sqrt
import numpy as np
import cv2
import colorsys
from colormath.color_objects import LabColor, sRGBColor
from colormath.color_conversions import convert_color
import rgb2lab
from color_extraction import DominantColors
import json
import urllib.request
import ssl
import os

context = ssl._create_unverified_context()

# PCCS tone dataset [v(명도), s(채도), PCCS tone]
pccsToneDataset = [
    [93.75, 22.22222222, 'p'], [93.75, 55.55555555, 'lt'], [87.5, 88.88888888, 'b'],
    [68.75, 22.22222222, 'ltg'], [68.75, 55.55555555, 'sf'], [50, 88.88888888, 's'], [50, 100, 'v'],
    [37.5, 22.22222222, 'g'], [37.5, 55.55555555, 'd'], [18.75, 88.88888888, 'dp'],
    [12.5, 22.22222222, 'dkg'], [12.5, 55.55555555, 'd']
]

# season
spring = ['p', 'lt', 'b', 'v']
summer = ['p', 'lt', 'b', 'ltg', 'sf', 'g', 'd']
fall = ['ltg', 'sf', 's', 'g', 'd', 'dp', 'dkg', 'dk']
winter = ['s', 'v', 'dp', 'dkg', 'dk']


def findNeighbors(rgbColor):
    hsv = colorsys.rgb_to_hsv(rgbColor[0][0] / 255, rgbColor[0][1] / 255, rgbColor[0][2] / 255)
    saturation = hsv[1] * 100  # 채도
    value = hsv[2] * 100  # 명
    # rgb -> lab 변환 후 b값 가져오기
    # lab = convert_color(rgb, LabColor, through_rgb_type=sRGBColor)
    b = rgb2lab.rgb2lab(rgbColor[0])[2]
    inputColor = [value, saturation]
    inputTone = get_neighbors(pccsToneDataset, inputColor)
    pccs = inputTone[0][2]
    season = toneDataLabeling(b, value, saturation, inputTone[0][2])
    return saturation, value, pccs, season


def toneDataLabeling(b, v, s, tone):
    result = ''
    if b > 17:
        if tone in spring:
            result = 'spring'
        else:
            result = 'fall'
    elif b < 17:
        if tone in summer:
            result = 'summer'
        else:
            result = 'winter'
    return result


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


json_path = '../images/items.json'
json_data = []

if os.path.isfile(json_path):
    f = open('../images/items.json', 'r+', encoding='utf-8')
    json_data = json.load(f)
    f.close()
image_list = os.listdir('../results_image/color_url')

tone_dict = {}
for img in image_list:
    data_code = img.split('.')[0]
    img = '../results_image/color_url/' + img
    dc = DominantColors(img)
    color = dc.dominantColors()
    saturation, value, pccs, season = findNeighbors(color)

    for idx in range(len(json_data)):
        if json_data[idx]['data-code'] == data_code:
            json_data[idx]['saturation'] = saturation
            json_data[idx]['value'] = value
            json_data[idx]['pccs'] = pccs
            json_data[idx]['season'] = season
    print(img)
os.remove(json_path)

f = open('../images/items.json', 'w+', encoding='utf-8')
json.dump(json_data, f, ensure_ascii=False, indent='\t')

f.close()
