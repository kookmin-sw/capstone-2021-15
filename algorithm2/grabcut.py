import numpy as np
import cv2
from matplotlib import pyplot as plt
import os
import json
import requests
import time

start = time.time()
with open('./images/items.json') as f:
    json_data = json.load(f)
for data in json_data:
    # idx = 2
    image_url = data["img-url"]
    data_code = data["data-code"]
    image_nparray = np.asarray(bytearray(requests.get(image_url).content), dtype=np.uint8)
    img = cv2.imdecode(image_nparray, cv2.IMREAD_COLOR)

    mask = np.zeros(img.shape[:2], np.uint8)
    bgdModel = np.zeros((1, 65), np.float64)
    fgdModel = np.zeros((1, 65), np.float64)

    ipt = '0'

    if ipt != '1':
        # lip (200, 100, 300, 200)
        rect = (200, 100, 300, 200)  # (x, y, width, height)
        cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 1, cv2.GC_INIT_WITH_RECT)

        mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')
        img = img * mask2[:, :, np.newaxis]

    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    # if show
    # plt.imshow(img), plt.colorbar(), plt.show()

    cv2.imwrite('./results_image/' + data_code + '.jpg', cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
    print(data["data-code"] + ' 진행 중...')

print('총 걸린 시간: ', time.time() - start)
