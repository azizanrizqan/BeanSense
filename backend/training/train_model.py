import pandas as pd
import pickle

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

# Load CSV
feature_df = pd.read_csv(
    "backend/training/coffee_features.csv"
)

# Feature
X = feature_df[
    [
        "area",
        "perimeter",
        "circularity",
        "aspect_ratio",
        "solidity"
    ]
]

# Label
y = feature_df["label"]

# Scaling
scaler = StandardScaler()

X = scaler.fit_transform(X)

# Split train test
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Model KNN
model = KNeighborsClassifier(
    n_neighbors=3
)

# Training
model.fit(
    X_train,
    y_train
)

# Predict
y_pred = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(
    y_test,
    y_pred
)

print(
    "\nAccuracy :",
    accuracy * 100,
    "%"
)

# Classification report
print(
    "\nClassification Report:\n"
)

print(
    classification_report(
        y_test,
        y_pred
    )
)

# Confusion Matrix
print(
    "\nConfusion Matrix:\n"
)

print(
    confusion_matrix(
        y_test,
        y_pred
    )
)

# Save model
with open(
    "backend/model/knn_model.pkl",
    "wb"
) as file:

    pickle.dump(
        model,
        file
    )

# Save scaler
with open(
    "backend/model/scaler.pkl",
    "wb"
) as file:

    pickle.dump(
        scaler,
        file
    )

print(
    "\nModel berhasil disimpan!"
)