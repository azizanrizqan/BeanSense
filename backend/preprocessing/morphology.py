import cv2
import numpy as np

image_path = "dataset/train/arabika/coffee1.jpg"

image = cv2.imread(image_path)

resize_image = cv2.resize(image, (512, 512))

gray = cv2.cvtColor(
    resize_image,
    cv2.COLOR_BGR2GRAY
)

gray = cv2.GaussianBlur(gray, (5,5), 0)

_, threshold = cv2.threshold(
    gray,
    120,
    255,
    cv2.THRESH_BINARY_INV
)

kernel = np.ones((3,3), np.uint8)

closing = cv2.morphologyEx(
    threshold,
    cv2.MORPH_CLOSE,
    kernel
)

cv2.imshow("Original Image", image)
cv2.imshow("Grayscale Image", gray)
cv2.imshow("Threshold Image", threshold)
cv2.imshow("Morphology", closing)

cv2.waitKey(0)
cv2.destroyAllWindows()