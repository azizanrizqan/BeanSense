from flask import Flask, request
from flask_cors import CORS

import cv2
import numpy as np
import pickle
import pandas as pd
import os

# =========================
# FLASK SETUP
# =========================

app = Flask(__name__)

CORS(app)

# =========================
# UPLOAD FOLDER
# =========================

UPLOAD_FOLDER = "static"

app.config[
    "UPLOAD_FOLDER"
] = UPLOAD_FOLDER

# Buat folder static otomatis
os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

# =========================
# LOAD MODEL
# =========================

with open(
    "model/knn_model.pkl",
    "rb"
) as file:

    model = pickle.load(file)

# =========================
# LOAD SCALER
# =========================

with open(
    "model/scaler.pkl",
    "rb"
) as file:

    scaler = pickle.load(file)

# =========================
# HOME ROUTE
# =========================

@app.route("/")
def home():

    return {
        "message":
        "BeanSense API Running"
    }

# =========================
# PREDICT ROUTE
# =========================

@app.route(
    "/predict",
    methods=["POST"]
)

def predict():

    # =========================
    # CHECK FILE
    # =========================

    if "image" not in request.files:

        return {
            "error":
            "No image uploaded"
        }

    file = request.files["image"]

    # =========================
    # SAVE IMAGE
    # =========================

    filepath = os.path.join(
        app.config["UPLOAD_FOLDER"],
        file.filename
    )

    file.save(filepath)

    # =========================
    # READ IMAGE
    # =========================

    image = cv2.imread(filepath)

    if image is None:

        return {
            "error":
            "Image gagal dibaca"
        }

    # =========================
    # RESIZE
    # =========================

    resize_image = cv2.resize(
        image,
        (64,64)
    )

    # =========================
    # GRAYSCALE
    # =========================

    gray = cv2.cvtColor(
        resize_image,
        cv2.COLOR_BGR2GRAY
    )

    # =========================
    # GAUSSIAN BLUR
    # =========================

    gray = cv2.GaussianBlur(
        gray,
        (5,5),
        0
    )

    # =========================
    # THRESHOLD
    # =========================

    _, threshold = cv2.threshold(
        gray,
        120,
        255,
        cv2.THRESH_BINARY_INV
    )

    # =========================
    # MORPHOLOGY
    # =========================

    kernel = np.ones(
        (3,3),
        np.uint8
    )

    closing = cv2.morphologyEx(
        threshold,
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

    # =========================
    # CHECK CONTOUR
    # =========================

    if len(contours) == 0:

        return {
            "error":
            "Contour tidak ditemukan"
        }

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

    area = cv2.contourArea(
        largest_contour
    )

    perimeter = cv2.arcLength(
        largest_contour,
        True
    )

    if perimeter == 0:

        return {
            "error":
            "Perimeter error"
        }

    circularity = (
        4 * np.pi * area
    ) / (perimeter ** 2)

    # Aspect ratio
    x, y, w, h = cv2.boundingRect(
        largest_contour
    )

    aspect_ratio = float(w) / h

    # Solidity
    hull = cv2.convexHull(
        largest_contour
    )

    hull_area = cv2.contourArea(
        hull
    )

    solidity = float(area) / hull_area

    # =========================
    # DATAFRAME FEATURE
    # =========================

    features = pd.DataFrame([[
        area,
        perimeter,
        circularity,
        aspect_ratio,
        solidity
    ]], columns=[
        "area",
        "perimeter",
        "circularity",
        "aspect_ratio",
        "solidity"
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
    # RETURN JSON
    # =========================

    return {
        "prediction":
        prediction[0],

        "confidence":
        round(confidence,2),

        "image":
        file.filename
    }

# =========================
# RUN FLASK
# =========================

if __name__ == "__main__":

    app.run(
        debug=True
    )