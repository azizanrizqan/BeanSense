import pandas as pd
import pickle
import seaborn as sns
import matplotlib.pyplot as plt

from sklearn.model_selection import (
    train_test_split
)

from sklearn.preprocessing import (
    StandardScaler
)

from sklearn.neighbors import (
    KNeighborsClassifier
)

from sklearn.metrics import (

    accuracy_score,

    classification_report,

    confusion_matrix

)

# =========================
# LOAD DATASET
# =========================

df = pd.read_csv(
    "backend/training/coffee_features.csv"
)

# =========================
# FEATURE
# =========================

X = df.drop(
    columns=["label"]
)

# =========================
# LABEL
# =========================

y = df["label"]

# =========================
# SPLIT DATASET
# =========================

X_train, X_test, y_train, y_test = train_test_split(

    X,

    y,

    test_size=0.2,

    random_state=42,

    stratify=y

)

# =========================
# SCALING FEATURE
# =========================

scaler = StandardScaler()

X_train = scaler.fit_transform(
    X_train
)

X_test = scaler.transform(
    X_test
)

# =========================
# MODEL K-NN
# =========================

model = KNeighborsClassifier(
    n_neighbors=3
)

# =========================
# TRAINING MODEL
# =========================

model.fit(
    X_train,
    y_train
)

# =========================
# PREDICTION
# =========================

y_pred = model.predict(
    X_test
)

# =========================
# ACCURACY
# =========================

accuracy = accuracy_score(
    y_test,
    y_pred
)

print(
    f"\nAccuracy : {accuracy * 100:.2f}%"
)

# =========================
# CLASSIFICATION REPORT
# =========================

print(
    "\nClassification Report:\n"
)

print(

    classification_report(

        y_test,

        y_pred

    )

)

# =========================
# CONFUSION MATRIX ARRAY
# =========================

cm = confusion_matrix(

    y_test,

    y_pred

)

print(
    "\nConfusion Matrix:\n"
)

print(cm)

# =========================
# VISUALIZATION
# =========================

plt.figure(figsize=(8,6))

sns.heatmap(

    cm,

    annot=True,

    fmt="d",

    cmap="Blues",

    xticklabels=model.classes_,

    yticklabels=model.classes_

)

plt.title(
    "Confusion Matrix Klasifikasi Biji Kopi"
)

plt.xlabel(
    "Predicted Label"
)

plt.ylabel(
    "Actual Label"
)

plt.tight_layout()

plt.show()

# =========================
# SAVE MODEL
# =========================

with open(
    "backend/model/knn_model.pkl",
    "wb"
) as file:

    pickle.dump(
        model,
        file
    )

# =========================
# SAVE SCALER
# =========================

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