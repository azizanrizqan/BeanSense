import cv2
import numpy as np
import pickle
import pandas as pd

# Load model
with open(
    "backend/model/knn_model.pkl",
    "rb"
) as file:

    model = pickle.load(file)

# Path gambar baru
image_path = "dataset/test/arabika/arabika1test.jpg"

# Membaca gambar
image = cv2.imread(image_path)

# Resize
resize_image = cv2.resize(image, (32, 32))

# Grayscale
gray = cv2.cvtColor(
    resize_image,
    cv2.COLOR_BGR2GRAY
)

# Threshold
_, threshold = cv2.threshold(
    gray,
    120,
    255,
    cv2.THRESH_BINARY_INV
)

# Morphology
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

largest_contour = max(
    contours,
    key=cv2.contourArea
)

# Feature extraction
area = cv2.contourArea(
    largest_contour
)

perimeter = cv2.arcLength(
    largest_contour,
    True
)

circularity = (
    4 * np.pi * area
) / (perimeter ** 2)

# Data prediksi
features = pd.DataFrame([[
    area,
    perimeter,
    circularity
]], columns=[
    "area",
    "perimeter",
    "circularity"
])

# Prediksi
prediction = model.predict(features)

# Print hasil
print("\nHasil Prediksi :", prediction[0])

# Tampilkan gambar
cv2.imshow("Test Image", resize_image)

cv2.waitKey(0)
cv2.destroyAllWindows()