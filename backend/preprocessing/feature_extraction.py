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

# Morphology Closing
kernel = np.ones((3,3), np.uint8)

closing = cv2.morphologyEx(
    threshold,
    cv2.MORPH_CLOSE,
    kernel
)

# Cari contour
contours, _ = cv2.findContours(
    closing,
    cv2.RETR_EXTERNAL,
    cv2.CHAIN_APPROX_SIMPLE
)

# Ambil contour terbesar
largest_contour = max(contours, key=cv2.contourArea)

# Hitung Area
area = cv2.contourArea(largest_contour)

# Hitung Perimeter
perimeter = cv2.arcLength(largest_contour, True)

# Hitung Circularity
circularity = (4 * np.pi * area) / (perimeter ** 2)

# Gambar contour
output = resize_image.copy()

cv2.drawContours(
    output,
    [largest_contour],
    -1,
    (0, 255, 0),
    1
)

# Print hasil
print("Area :", area)
print("Perimeter :", perimeter)
print("Circularity :", circularity)

# Tampilkan hasil
cv2.imshow("Threshold", threshold)
cv2.imshow("Morphology", closing)
cv2.imshow("Contour", output)

cv2.waitKey(0)
cv2.destroyAllWindows()