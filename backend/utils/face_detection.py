import json
from imutils import face_utils
import numpy as np
import argparse
import imutils
import dlib
import cv2
import time
import boto3
import os
import sys

s3 = boto3.resource('s3')
s3_client = boto3.client('s3')
bucket_name = 'utpr'
input_path = 'inputs/'
result_path = 'results/'

# ap = argparse.ArgumentParser()
# ap.add_argument("-i", "--image", required=True,
#                 help="path to input image")
# args = vars(ap.parse_args())

shape_predictor = sys.argv[2]


def image_transparent(image):
    from PIL import Image

    img = Image.open(image)
    rgba = img.convert("RGBA")
    datas = rgba.getdata()

    newData = []
    for item in datas:
        if item[0] <= 10 and item[1] <= 10 and item[2] <= 10:  # finding black colour by its RGB value
            # storing a transparent value when we find a black colour
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)  # other colours remain unchanged

    rgba.putdata(newData)
    rgba.save(image, "PNG")


def face_remap(shape):
    remapped_image = cv2.convexHull(shape)
    return remapped_image


def face_detection():
    image = './' + sys.argv[1]
    image = cv2.imread(image)
    image = imutils.resize(image, width=500)

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    detector = dlib.get_frontal_face_detector()
    predictor = dlib.shape_predictor(shape_predictor)
    rects = detector(gray, 1)
    for (i, rect) in enumerate(rects):
        shape = predictor(gray, rect)
        # convert facial landmarks to numpy array
        shape = face_utils.shape_to_np(shape)

        # initialize new array layout as shape
        xmin, ymin = shape.min(axis=0)
        xmax, ymax = shape.max(axis=0)

        feature_mask = np.zeros((image.shape[0], image.shape[1]), np.uint8)
        remapped_shape = face_remap(shape)

        cv2.fillConvexPoly(feature_mask, remapped_shape, [255])
        out_face = cv2.bitwise_and(image, image, mask=feature_mask)

        (x, y, w, h) = cv2.boundingRect(remapped_shape)
        alpha = np.zeros((h, w), dtype=np.uint8)
        feature_mask = feature_mask[y:y + h, x:x + w]
        out_face = out_face[y:y + h, x:x + w]
        alpha[feature_mask == 255] = 255

        mv = []
        mv.append(out_face)
        mv.append(alpha)
        try:
            out_face = cv2.merge(mv)

            cv2.imwrite('./' + sys.argv[1], out_face)

            from PIL import Image

            img = Image.open('./' + sys.argv[1])
            rgba = img.convert("RGBA")
            datas = rgba.getdata()

            newData = []
            for item in datas:
                if item[0] <= 6 and item[1] <= 6 and item[2] <= 6:  # finding black colour by its RGB value
                    # storing a transparent value when we find a black colour
                    newData.append((255, 255, 255, 0))
                else:
                    newData.append(item)  # other colours remain unchanged

            rgba.putdata(newData)
            rgba.save('./' + sys.argv[1], "PNG")
            print('test')
        except Exception as e:
            print('error', e)
            pass
        # s3_client.upload_file(sys.argv[1], bucket_name, sys.argv[1].split('/')[1])
    return True


if __name__ == '__main__':
    var = face_detection()
    print(var)
