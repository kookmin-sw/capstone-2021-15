import numpy as np
import cv2
from matplotlib import pyplot as plt
import os
import json
import requests
import time

start = time.time()
with open('images/hair_colors.json') as f:
    json_data = json.load(f)
for data in json_data:
    # idx = 2
    # image_url = "https://cdn.chicor.com/images/product/20210119122828333.jpg"
    try:
        image_url = data["color-url"]
    except:
        image_url = data["img-url"]
    data_code = data["data-code"]

    print(data["data-code"] + ' 진행 중...')

    image_nparray = np.asarray(bytearray(requests.get(image_url).content), dtype=np.uint8)
    img = cv2.imdecode(image_nparray, cv2.IMREAD_COLOR)

    mask = np.zeros(img.shape[:2], np.uint8)
    bgdModel = np.zeros((1, 65), np.float64)
    fgdModel = np.zeros((1, 65), np.float64)

    try:
        # lip (200, 100, 300, 200)
        rect = (200, 300, 200, 200)  # (x, y, width, height)
        cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 1, cv2.GC_INIT_WITH_RECT)
        mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')
        img = img * mask2[:, :, np.newaxis]
    except:
        # rect = (40, 40, 30, 30)  # (x, y, width, height)
        # cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 1, cv2.GC_INIT_WITH_RECT)
        pass
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    # if show
    # plt.imshow(img), plt.colorbar(), plt.show()

    cv2.imwrite('./results_images/hair_color_url/' + data_code + '.jpg', cv2.cvtColor(img, cv2.COLOR_BGR2RGB))

print('총 걸린 시간: ', time.time() - start)
