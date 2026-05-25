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
# HOME
# =========================

@app.route("/")
def home():

    return {
        "message":
        "BeanSense API Running"
    }

# =========================
# PREDICT
# =========================

@app.route(
    "/predict",
    methods=["POST"]
)

def predict():

    if "image" not in request.files:

        return {
            "error":
            "No image uploaded"
        }

    file = request.files["image"]

    filepath = os.path.join(

        app.config["UPLOAD_FOLDER"],

        file.filename

    )

    file.save(filepath)

    image = cv2.imread(filepath)

    if image is None:

        return {
            "error":
            "Image gagal dibaca"
        }

    contour = preprocess_image(image)

    if contour is None:

        return {
            "error":
            "Contour tidak ditemukan"
        }

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

    solidity = float(area) / hull_area

    equivalent_diameter = np.sqrt(
        4 * area / np.pi
    )

    extent = float(area) / (w*h)

    convex_area = hull_area

    # =========================
    # DATAFRAME
    # =========================

    features = pd.DataFrame([[
        
        area,

        perimeter,

        circularity,

        aspect_ratio,

        solidity,

        equivalent_diameter,

        extent,

        convex_area

    ]], columns=[

        "area",

        "perimeter",

        "circularity",

        "aspect_ratio",

        "solidity",

        "equivalent_diameter",

        "extent",

        "convex_area"

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

    probabilities = model.predict_proba(
        features
    )

    confidence = max(
        probabilities[0]
    ) * 100

    return {

        "prediction":
        prediction[0],

        "confidence":
        round(confidence,2),

        "image":
        file.filename

    }

# =========================
# RUN APP
# =========================

if __name__ == "__main__":

    app.run(
        debug=True
    )