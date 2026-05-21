import cv2
import numpy as np
import pandas as pd
import os

# =========================
# DATASET PATH
# =========================

DATASET_PATH = "dataset/train"

# =========================
# ALL DATA
# =========================

all_data = []

# =========================
# PREPROCESS FUNCTION
# =========================

def preprocess_image(image):

    image = cv2.resize(
        image,
        (256,256)
    )

    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    gray = cv2.GaussianBlur(
        gray,
        (5,5),
        0
    )

    threshold = cv2.adaptiveThreshold(

        gray,

        255,

        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,

        cv2.THRESH_BINARY_INV,

        11,

        2

    )

    kernel = cv2.getStructuringElement(
        cv2.MORPH_ELLIPSE,
        (3,3)
    )

    opening = cv2.morphologyEx(

        threshold,

        cv2.MORPH_OPEN,

        kernel

    )

    closing = cv2.morphologyEx(

        opening,

        cv2.MORPH_CLOSE,

        kernel

    )

    contours, _ = cv2.findContours(

        closing,

        cv2.RETR_EXTERNAL,

        cv2.CHAIN_APPROX_SIMPLE

    )

    contours = [

        cnt

        for cnt in contours

        if cv2.contourArea(cnt) > 300

    ]

    if len(contours) == 0:

        return None

    largest_contour = max(
        contours,
        key=cv2.contourArea
    )

    return largest_contour

# =========================
# LOOP LABEL
# =========================

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

        contour = preprocess_image(image)

        if contour is None:
            continue

        # =========================
        # FEATURE EXTRACTION
        # =========================

        area = cv2.contourArea(
            contour
        )

        perimeter = cv2.arcLength(
            contour,
            True
        )

        if perimeter == 0:
            continue

        circularity = (
            4 * np.pi * area
        ) / (perimeter ** 2)

        x, y, w, h = cv2.boundingRect(
            contour
        )

        aspect_ratio = float(w) / h

        hull = cv2.convexHull(
            contour
        )

        hull_area = cv2.contourArea(
            hull
        )

        if hull_area == 0:
            continue

        solidity = float(area) / hull_area

        equivalent_diameter = np.sqrt(
            4 * area / np.pi
        )

        extent = float(area) / (w*h)

        convex_area = hull_area

        # =========================
        # SAVE DATA
        # =========================

        all_data.append([

            area,

            perimeter,

            circularity,

            aspect_ratio,

            solidity,

            equivalent_diameter,

            extent,

            convex_area,

            label

        ])

# =========================
# DATAFRAME
# =========================

columns = [

    "area",

    "perimeter",

    "circularity",

    "aspect_ratio",

    "solidity",

    "equivalent_diameter",

    "extent",

    "convex_area",

    "label"

]

df = pd.DataFrame(
    all_data,
    columns=columns
)

# =========================
# SAVE CSV
# =========================

df.to_csv(
    "backend/training/coffee_features.csv",
    index=False
)

print(df.head())

print(
    "\nFeature extraction selesai!"
)