from flask import Flask, render_template, request
import cv2
import numpy as np
import pickle
import pandas as pd
import os

app = Flask(__name__)

# Folder upload
UPLOAD_FOLDER = "backend/uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Load model
with open(
    "backend/model/knn_model.pkl",
    "rb"
) as file:

    model = pickle.load(file)

# Homepage
@app.route("/")
def home():
    return render_template("index.html")

# Predict
@app.route("/predict", methods=["POST"])
def predict():

    if "image" not in request.files:
        return "Tidak ada file"

    file = request.files["image"]

    if file.filename == "":
        return "File kosong"

    # Simpan file
    filepath = os.path.join(
        app.config["UPLOAD_FOLDER"],
        file.filename
    )

    file.save(filepath)

    # Baca gambar
    image = cv2.imread(filepath)

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

    # Contour
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

    # DataFrame feature
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

    return render_template(
        "index.html",
        prediction=prediction[0],
        image=file.filename
    )

# Run Flask
if __name__ == "__main__":
    app.run(debug=True)