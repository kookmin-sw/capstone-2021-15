import cv2
from sklearn.cluster import KMeans
import colorsys
import urllib.request
import numpy as np
import ssl

context = ssl._create_unverified_context()


class DominantColors:
    CLUSTERS = 1
    IMAGE = None
    COLORS = None
    LABELS = None

    def __init__(self, image, clusters=3):
        self.CLUSTERS = clusters
        self.IMAGE = image

    def dominantColors(self):
        # read image
        img = self.IMAGE

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


def url_to_image(url):
    # download the image, convert it to a NumPy array, and then read
    # it into OpenCV format
    resp = urllib.request.urlopen(url, context=context)
    image = np.asarray(bytearray(resp.read()), dtype="uint8")
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)
    # return the image
    return image


img = url_to_image('https://cdn.chicor.com/images/product/20200813155626047.jpg')

clusters = 1  # 클러스터의 크기 = 이미지에서 추출할 색상 갯수 (단일 색상의 경우 1, 색이 다양할 경우 3~5로 하여 중간값으로 해야할 것 ㅏㄱㅌ음)
dc = DominantColors(img, clusters)
colors = dc.dominantColors()
print(colors)
r = colors[0][0]
g = colors[0][1]
b = colors[0][2]
hsv = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)

print(hsv)