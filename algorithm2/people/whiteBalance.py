# -*- coding: utf-8 -*-

# White balance/Grayworld assumption


import cv2 as cv
import numpy as np


def show(final):
    print('display')
    cv.imshow("Temple", final)
    cv.waitKey(0)
    cv.destroyAllWindows()


def saveimg(final):
    print('saving')
    cv.imwrite("result.jpg", final)


if __name__ == "__main__":
    # Insert any filename with path
    img = cv.imread("hyeon.png")
    res = img
    final = cv.cvtColor(res, cv.COLOR_BGR2LAB)
    avg_a = np.average(final[:, :, 1])
    avg_b = np.average(final[:, :, 2])

    for x in range(final.shape[0]):
        for y in range(final.shape[1]):
            l, a, b = final[x, y, :]
            # fix for CV correction
            l *= 100 / 255.0
            final[x, y, 1] = a - ((avg_a - 128) * (l / 100.0) * 1.1)
            final[x, y, 2] = b - ((avg_b - 128) * (l / 100.0) * 1.1)
    final = cv.cvtColor(final, cv.COLOR_LAB2BGR)
    final = np.hstack((res, final))
    show(final)
    saveimg(final)
