import cv2

# Path gambar
image_path = "dataset/train/arabika/coffee1.jpg"

# Membaca gambar
image = cv2.imread(image_path)

# Resize 32x32
resize_image = cv2.resize(image, (32, 32))

# Convert grayscale
gray = cv2.cvtColor(resize_image, cv2.COLOR_BGR2GRAY)

# Thresholding
threshold = cv2.adaptiveThreshold(
    gray,
    255,
    cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
    cv2.THRESH_BINARY_INV,
    11,
    2
)

# Tampilkan hasil
cv2.imshow("Original", resize_image)
cv2.imshow("Grayscale", gray)
cv2.imshow("Threshold", threshold)

cv2.waitKey(0)
cv2.destroyAllWindows()