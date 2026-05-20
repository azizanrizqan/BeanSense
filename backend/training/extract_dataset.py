import cv2
import numpy as np
import pandas as pd
import os

# Path dataset
dataset_path = "dataset/train"

# Menyimpan semua data
data = []

# Loop semua folder class
for label in os.listdir(dataset_path):

    class_path = os.path.join(dataset_path, label)

    # Skip kalau bukan folder
    if not os.path.isdir(class_path):
        continue

    # Loop semua gambar
    for filename in os.listdir(class_path):

        image_path = os.path.join(class_path, filename)

        # Membaca gambar
        image = cv2.imread(image_path)

        # Skip kalau gambar gagal dibaca
        if image is None:
            continue

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

        # Skip kalau contour kosong
        if len(contours) == 0:
            continue

        # Contour terbesar
        largest_contour = max(
            contours,
            key=cv2.contourArea
        )

        # Area
        area = cv2.contourArea(
            largest_contour
        )

        # Perimeter
        perimeter = cv2.arcLength(
            largest_contour,
            True
        )

        # Hindari divide by zero
        if perimeter == 0:
            continue

        # Circularity
        circularity = (
            4 * np.pi * area
        ) / (perimeter ** 2)

        # Simpan data
        data.append([
            area,
            perimeter,
            circularity,
            label
        ])

# Buat dataframe
df = pd.DataFrame(
    data,
    columns=[
        "area",
        "perimeter",
        "circularity",
        "label"
    ]
)

# Simpan CSV
df.to_csv(
    "backend/training/coffee_features.csv",
    index=False
)

print(df.head())

print("\nFeature extraction selesai!")