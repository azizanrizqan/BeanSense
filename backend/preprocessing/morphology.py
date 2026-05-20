import cv2
import numpy as np

# Path gambar
image_path = "dataset/train/arabika/coffee1.jpg"

# Membaca gambar
image = cv2.imread(image_path)

# Resize 32x32
resize_image = cv2.resize(image, (32, 32))

# Grayscale
gray = cv2.cvtColor(resize_image, cv2.COLOR_BGR2GRAY)

# Threshold
_, threshold = cv2.threshold(
    gray,
    120,
    255,
    cv2.THRESH_BINARY_INV
)

# Kernel morphology
kernel = np.ones((3,3), np.uint8)

# Morphology Closing
closing = cv2.morphologyEx(
    threshold,
    cv2.MORPH_CLOSE,
    kernel
)

# Tampilkan hasil
cv2.imshow("Original", resize_image)
cv2.imshow("Threshold", threshold)
cv2.imshow("Morphology Closing", closing)

cv2.waitKey(0)
cv2.destroyAllWindows()