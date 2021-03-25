import numpy as np
import cv2
from matplotlib import pyplot as plt

img = cv2.imread('./test.jpg')
mask = np.zeros(img.shape[:2], np.uint8)
bgdModel = np.zeros((1, 65), np.float64)
fgdModel = np.zeros((1, 65), np.float64)
# Step 1

rect = (120, 10, 100, 80)  # (x, y, width, height)
cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 1, cv2.GC_INIT_WITH_RECT)

# # Step 2
# newmask = cv2.imread('./test.jpg', 0)
# mask[newmask == 0] = 0
# mask[newmask == 255] = 1
# cv2.grabCut(img, mask, None, bgdModel, fgdModel, 1, cv2.GC_INIT_WITH_MASK)
mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')
img = img * mask2[:, :, np.newaxis]
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
plt.imshow(img), plt.colorbar(), plt.show()

