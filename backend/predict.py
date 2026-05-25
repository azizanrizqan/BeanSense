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

# Load scaler
with open(
    "backend/model/scaler.pkl",
    "rb"
) as file:

    scaler = pickle.load(file)

# Path image
image_path = "dataset/test/arabika/sample.jpg"

# Read image
image = cv2.imread(image_path)

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

# Dataframe feature
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

print(
    "\nHasil Prediksi :",
    prediction[0]
)

print(
    "Confidence :",
    round(confidence,2),
    "%"
)