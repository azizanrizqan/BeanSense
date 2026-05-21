import cv2
import numpy as np
import pandas as pd
import os

DATASET_PATH = "dataset/train"

all_data = []

for label in os.listdir(DATASET_PATH):

    class_path = os.path.join(
        DATASET_PATH,
        label
    )

    if not os.path.isdir(class_path):
        continue

    for filename in os.listdir(class_path):

        image_path = os.path.join(
            class_path,
            filename
        )

        image = cv2.imread(image_path)

        if image is None:
            continue

        resize_image = cv2.resize(
            image,
            (64,64)
        )

        gray = cv2.cvtColor(
            resize_image,
            cv2.COLOR_BGR2GRAY
        )

        gray = cv2.GaussianBlur(
            gray,
            (5,5),
            0
        )

        _, threshold = cv2.threshold(
            gray,
            120,
            255,
            cv2.THRESH_BINARY_INV
        )

        kernel = np.ones(
            (3,3),
            np.uint8
        )

        closing = cv2.morphologyEx(
            threshold,
            cv2.MORPH_CLOSE,
            kernel
        )

        contours, _ = cv2.findContours(
            closing,
            cv2.RETR_EXTERNAL,
            cv2.CHAIN_APPROX_SIMPLE
        )

        if len(contours) == 0:
            continue

        largest_contour = max(
            contours,
            key=cv2.contourArea
        )

        area = cv2.contourArea(
            largest_contour
        )

        perimeter = cv2.arcLength(
            largest_contour,
            True
        )

        if perimeter == 0:
            continue

        circularity = (
            4 * np.pi * area
        ) / (perimeter ** 2)

        x, y, w, h = cv2.boundingRect(
            largest_contour
        )

        aspect_ratio = float(w) / h

        hull = cv2.convexHull(
            largest_contour
        )

        hull_area = cv2.contourArea(
            hull
        )

        solidity = float(area) / hull_area

        all_data.append([
            area,
            perimeter,
            circularity,
            aspect_ratio,
            solidity,
            label
        ])

columns = [
    "area",
    "perimeter",
    "circularity",
    "aspect_ratio",
    "solidity",
    "label"
]

feature_df = pd.DataFrame(
    all_data,
    columns=columns
)

feature_df.to_csv(
    "backend/training/coffee_features.csv",
    index=False
)

print(feature_df.head())

print(
    "\nFeature extraction selesai!"
)