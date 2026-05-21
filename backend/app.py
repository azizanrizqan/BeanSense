from flask import (
    Flask,
    render_template,
    request,
    url_for
)

import cv2
import numpy as np
import pickle
import pandas as pd
import os

app = Flask(__name__)

# Folder upload
UPLOAD_FOLDER = "backend/static"

app.config[
    "UPLOAD_FOLDER"
] = UPLOAD_FOLDER

# Load model
with open(
    "backend/model/knn_model.pkl",
    "rb"
) as file:

    model = pickle.load(file)

# Load scaler
with open(
    "backend/model/scaler.pkl",
    "rb"
) as file:

    scaler = pickle.load(file)

@app.route("/")
def home():

    return render_template(
        "index.html"
    )

@app.route(
    "/predict",
    methods=["POST"]
)

def predict():

    # Cek upload
    if "image" not in request.files:
        return "No image uploaded"

    file = request.files["image"]

    # Simpan gambar
    filepath = os.path.join(
        app.config["UPLOAD_FOLDER"],
        file.filename
    )

    file.save(filepath)

    # Baca gambar
    image = cv2.imread(filepath)

    if image is None:
        return "Image gagal dibaca"

    # Resize
    resize_image = cv2.resize(
        image,
        (64,64)
    )

    # Grayscale
    gray = cv2.cvtColor(
        resize_image,
        cv2.COLOR_BGR2GRAY
    )

    # Blur
    gray = cv2.GaussianBlur(
        gray,
        (5,5),
        0
    )

    # Threshold
    _, threshold = cv2.threshold(
        gray,
        120,
        255,
        cv2.THRESH_BINARY_INV
    )

    # Morphology
    kernel = np.ones(
        (3,3),
        np.uint8
    )

    closing = cv2.morphologyEx(
        threshold,
        cv2.MORPH_CLOSE,
        kernel
    )

    # Contour
    contours, _ = cv2.findContours(
        closing,
        cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE
    )

    # Jika contour tidak ditemukan
    if len(contours) == 0:
        return "Contour tidak ditemukan"

    # Ambil contour terbesar
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
        return "Perimeter error"

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

    # DataFrame feature
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

    # Scaling
    features = scaler.transform(
        features
    )

    # Predict
    prediction = model.predict(
        features
    )

    # Confidence
    probabilities = model.predict_proba(
        features
    )

    confidence = max(
        probabilities[0]
    ) * 100

    # Render hasil
    return render_template(
        "index.html",
        prediction=prediction[0],
        confidence=round(confidence,2),
        image=file.filename
    )

# Run Flask
if __name__ == "__main__":

    app.run(
        debug=True
    )