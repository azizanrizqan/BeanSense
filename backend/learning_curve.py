import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

from sklearn.model_selection import (
    learning_curve
)

from sklearn.pipeline import (
    Pipeline
)

from sklearn.preprocessing import (
    StandardScaler
)

from sklearn.neighbors import (
    KNeighborsClassifier
)

# LOAD DATASET
df = pd.read_csv(
    "training/coffee_features.csv"
)

X = df.drop(
    columns=["label"]
)

y = df["label"]

# PIPELINE
pipeline = Pipeline([

    (
        "scaler",
        StandardScaler()
    ),

    (
        "knn",
        KNeighborsClassifier(
            n_neighbors=3
        )
    )

])

# LEARNING CURVE
train_sizes, train_scores, test_scores = learning_curve(

    pipeline,

    X,

    y,

    cv=5,

    train_sizes=np.linspace(
        0.1,
        1.0,
        10
    ),

    scoring="accuracy"

)

# MEAN
train_mean = train_scores.mean(axis=1)

test_mean = test_scores.mean(axis=1)

# PLOT
plt.figure(figsize=(8,6))

plt.plot(

    train_sizes,

    train_mean * 100,

    marker="o",

    label="Training Accuracy"

)

plt.plot(

    train_sizes,

    test_mean * 100,

    marker="o",

    label="Validation Accuracy"

)

plt.title(
    "Learning Curve K-NN"
)

plt.xlabel(
    "Training Size"
)

plt.ylabel(
    "Accuracy (%)"
)

plt.legend()

plt.grid(True)

plt.show()