import cv2

image_path = "dataset/train/arabika/coffee1.jpg"

image = cv2.imread(image_path)

resize_image = cv2.resize(image, (256, 256))

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

cv2.imshow("Threshold", threshold)

cv2.waitKey(0)
cv2.destroyAllWindows()