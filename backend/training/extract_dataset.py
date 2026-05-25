import sys
import os

# =========================
# ADD BACKEND PATH
# =========================

sys.path.append(

    os.path.abspath(

        os.path.join(

            os.path.dirname(__file__),

            ".."

        )

    )

)

# =========================
# IMPORT
# =========================

import cv2
import numpy as np
import pandas as pd

from feature_extraction.shape_features import (
    extract_features
)

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

    # Resize
    image = cv2.resize(
        image,
        (256,256)
    )

    # Grayscale
    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    # Blur
    gray = cv2.GaussianBlur(
        gray,
        (5,5),
        0
    )

    # Adaptive Threshold
    threshold = cv2.adaptiveThreshold(

        gray,

        255,

        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,

        cv2.THRESH_BINARY_INV,

        11,

        2

    )

    # Morphology
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

    # Find Contour
    contours, _ = cv2.findContours(

        closing,

        cv2.RETR_EXTERNAL,

        cv2.CHAIN_APPROX_SIMPLE

    )

    # Filter Noise
    contours = [

        cnt

        for cnt in contours

        if cv2.contourArea(cnt) > 300

    ]

    # Check Contour
    if len(contours) == 0:

        return None

    # Largest Contour
    largest_contour = max(

        contours,

        key=cv2.contourArea

    )

    return largest_contour

# =========================
# LOOP DATASET
# =========================

for label in sorted(os.listdir(DATASET_PATH)):

    class_path = os.path.join(
        DATASET_PATH,
        label
    )

    # Check Folder
    if not os.path.isdir(class_path):

        continue

    # Loop Image
    for filename in sorted(os.listdir(class_path)):

        image_path = os.path.join(
            class_path,
            filename
        )

        # Read Image
        image = cv2.imread(image_path)

        if image is None:

            continue

        # Preprocess
        contour = preprocess_image(
            image
        )

        if contour is None:

            continue

        # =========================
        # FEATURE EXTRACTION
        # =========================

        features = extract_features(
            contour
        )

        # Save Feature
        all_data.append(

            features + [label]

        )

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

    "rectangularity",

    "compactness",

    "eccentricity",

    "hu_moment_1",

    "hu_moment_2",

    "label"

]

df = pd.DataFrame(

    all_data,

    columns=columns

)

# =========================
# SAVE CSV
# =========================

output_path = "backend/training/coffee_features.csv"

df.to_csv(

    output_path,

    index=False

)

# =========================
# RESULT
# =========================

print(df.head())

print(
    "\nTotal Data :",
    len(df)
)

print(
    "\nCSV berhasil disimpan di:"
)

print(output_path)