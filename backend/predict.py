import sys
import os

# =========================
# ADD BACKEND PATH
# =========================

sys.path.append(

    os.path.abspath(

        os.path.join(

            os.path.dirname(__file__)

        )

    )

)

# =========================
# IMPORT
# =========================

import cv2
import numpy as np
import pickle
import pandas as pd

from feature_extraction.shape_features import (
    extract_features
)

# =========================
# LOAD MODEL
# =========================

with open(
    "backend/model/knn_model.pkl",
    "rb"
) as file:

    model = pickle.load(file)

# =========================
# LOAD SCALER
# =========================

with open(
    "backend/model/scaler.pkl",
    "rb"
) as file:

    scaler = pickle.load(file)

# =========================
# IMAGE PATH
# =========================

image_path = r"dataset/test/arabika/arabika1test.jpg"

# =========================
# READ IMAGE
# =========================

image = cv2.imread(image_path)

if image is None:

    print("Gambar tidak ditemukan!")

    exit()

# =========================
# RESIZE
# =========================

resize_image = cv2.resize(
    image,
    (256,256)
)

# =========================
# GRAYSCALE
# =========================

gray = cv2.cvtColor(
    resize_image,
    cv2.COLOR_BGR2GRAY
)

# =========================
# BLUR
# =========================

gray = cv2.GaussianBlur(
    gray,
    (5,5),
    0
)

# =========================
# THRESHOLD
# =========================

threshold = cv2.adaptiveThreshold(

    gray,

    255,

    cv2.ADAPTIVE_THRESH_GAUSSIAN_C,

    cv2.THRESH_BINARY_INV,

    11,

    2

)

# =========================
# MORPHOLOGY
# =========================

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

# =========================
# FIND CONTOUR
# =========================

contours, _ = cv2.findContours(

    closing,

    cv2.RETR_EXTERNAL,

    cv2.CHAIN_APPROX_SIMPLE

)

# Filter contour kecil
contours = [

    cnt

    for cnt in contours

    if cv2.contourArea(cnt) > 300

]

if len(contours) == 0:

    print("Contour tidak ditemukan!")

    exit()

# =========================
# LARGEST CONTOUR
# =========================

largest_contour = max(

    contours,

    key=cv2.contourArea

)

# =========================
# FEATURE EXTRACTION
# =========================

feature_values = extract_features(
    largest_contour
)

# =========================
# DATAFRAME
# =========================

features = pd.DataFrame([

    feature_values

], columns=[

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

    "hu_moment_2"

])

# =========================
# SCALING
# =========================

features = scaler.transform(
    features
)

# =========================
# PREDICT
# =========================

prediction = model.predict(
    features
)

# =========================
# CONFIDENCE
# =========================

probabilities = model.predict_proba(
    features
)

confidence = max(
    probabilities[0]
) * 100

# =========================
# RESULT
# =========================

print(
    "\nHasil Prediksi :",
    prediction[0]
)

print(
    "Confidence :",
    round(confidence,2),
    "%"
)