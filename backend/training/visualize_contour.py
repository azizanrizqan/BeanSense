import cv2
import numpy as np
import matplotlib.pyplot as plt

# LOAD IMAGE
image = cv2.imread(
    "dataset/test/arabika/arabikatest.jpg"
)

image = cv2.resize(
    image,
    (400,400)
)

# GRAYSCALE
gray = cv2.cvtColor(
    image,
    cv2.COLOR_BGR2GRAY
)

# BLUR
blur = cv2.GaussianBlur(
    gray,
    (5,5),
    0
)

# THRESHOLD
threshold = cv2.adaptiveThreshold(

    blur,

    255,

    cv2.ADAPTIVE_THRESH_GAUSSIAN_C,

    cv2.THRESH_BINARY_INV,

    11,

    2

)

# MORPHOLOGY
kernel = np.ones(
    (3,3),
    np.uint8
)

morphology = cv2.morphologyEx(

    threshold,

    cv2.MORPH_CLOSE,

    kernel

)

# CONTOUR
contours, _ = cv2.findContours(

    morphology,

    cv2.RETR_EXTERNAL,

    cv2.CHAIN_APPROX_SIMPLE

)

largest_contour = max(
    contours,
    key=cv2.contourArea
)

# DRAW CONTOUR
contour_image = image.copy()

cv2.drawContours(

    contour_image,

    [largest_contour],

    -1,

    (0,255,0),

    3

)

# SHOW CONTOUR ONLY
plt.figure(figsize=(6,6))

plt.imshow(

    cv2.cvtColor(
        contour_image,
        cv2.COLOR_BGR2RGB
    )

)

plt.title(
    "Visualisasi Contour"
)

plt.axis("off")

plt.show()