import cv2
import numpy as np

def extract_features(contour):

    # =========================
    # AREA
    # =========================

    area = cv2.contourArea(
        contour
    )

    # =========================
    # PERIMETER
    # =========================

    perimeter = cv2.arcLength(
        contour,
        True
    )

    if perimeter == 0:
        perimeter = 1

    # =========================
    # CIRCULARITY
    # =========================

    circularity = (
        4 * np.pi * area
    ) / (perimeter ** 2)

    # =========================
    # BOUNDING BOX
    # =========================

    x, y, w, h = cv2.boundingRect(
        contour
    )

    if h == 0:
        h = 1

    # =========================
    # ASPECT RATIO
    # =========================

    aspect_ratio = float(w) / h

    # =========================
    # CONVEX HULL
    # =========================

    hull = cv2.convexHull(
        contour
    )

    hull_area = cv2.contourArea(
        hull
    )

    if hull_area == 0:
        hull_area = 1

    # =========================
    # SOLIDITY
    # =========================

    solidity = float(area) / hull_area

    # =========================
    # EQUIVALENT DIAMETER
    # =========================

    equivalent_diameter = np.sqrt(
        4 * area / np.pi
    )

    # =========================
    # EXTENT
    # =========================

    rect_area = w * h

    if rect_area == 0:
        rect_area = 1

    extent = float(area) / rect_area

    # =========================
    # CONVEX AREA
    # =========================

    convex_area = hull_area

    # =========================
    # RECTANGULARITY
    # =========================

    rectangularity = area / rect_area

    # =========================
    # COMPACTNESS
    # =========================

    if area == 0:
        area = 1

    compactness = (
        perimeter ** 2
    ) / area

    # =========================
    # ECCENTRICITY
    # =========================

    if len(contour) >= 5:

        ellipse = cv2.fitEllipse(
            contour
        )

        (_, _), (MA, ma), _ = ellipse

        if ma == 0:
            eccentricity = 0

        else:
            eccentricity = np.sqrt(
                1 - (MA / ma) ** 2
            )

    else:

        eccentricity = 0

    # =========================
    # HU MOMENTS
    # =========================

    moments = cv2.moments(
        contour
    )

    hu_moments = cv2.HuMoments(
        moments
    ).flatten()

    return [

        area,

        perimeter,

        circularity,

        aspect_ratio,

        solidity,

        equivalent_diameter,

        extent,

        convex_area,

        rectangularity,

        compactness,

        eccentricity,

        hu_moments[0],

        hu_moments[1]

    ]