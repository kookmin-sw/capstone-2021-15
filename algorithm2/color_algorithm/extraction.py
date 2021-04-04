import cv2
from sklearn.cluster import KMeans
import numpy as np


class DominantColors:
    CLUSTERS = 1
    IMAGE = None
    COLORS = None
    LABELS = None

    def __init__(self, image, clusters=1):
        self.CLUSTERS = clusters
        self.IMAGE = image

    def dominantColors(self):
        # 웹 이미지 read
        # img = self.IMAGE
        # 로컬 이미지 read
        img = cv2.imread(self.IMAGE)
        # convert to rgb from bgr
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        # reshaping to a list of pixels
        img = img.reshape((img.shape[0] * img.shape[1], 3))

        # save image after operations
        self.IMAGE = img

        # using k-means to cluster pixels
        kmeans = KMeans(n_clusters=self.CLUSTERS)
        kmeans.fit(img)

        # the cluster centers are our dominant colors.
        self.COLORS = kmeans.cluster_centers_

        # save labels
        self.LABELS = kmeans.labels_

        # returning after converting to integer from float
        return self.COLORS.astype(int)



# img = url_to_image('https://cdn.chicor.com/images/product/20200813155626047.jpg')
# clusters = 1  # 클러스터의 크기 = 이미지에서 추출할 색상 갯수 (단일 색상의 경우 1, 색이 다양할 경우 3~5로 하여 중간값으로 해야할 것 같음)
# dc = DominantColors(img, clusters)
# colors = dc.dominantColors()
# hsv = colorsys.rgb_to_hsv(colors[0][0] / 255, colors[0][1] / 255, colors[0][2] / 255)
# s = hsv[1]*100
# v = hsv[2]*100
