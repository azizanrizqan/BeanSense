import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

import pickle

# Membaca CSV
df = pd.read_csv(
    "backend/training/coffee_features.csv"
)

# Feature
X = df[
    [
        "area",
        "perimeter",
        "circularity"
    ]
]

# Label
y = df["label"]

# Split train dan test
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Buat model KNN
model = KNeighborsClassifier(
    n_neighbors=3
)

# Training
model.fit(X_train, y_train)

# Prediksi
y_pred = model.predict(X_test)

# Hitung akurasi
accuracy = accuracy_score(
    y_test,
    y_pred
)

# Print hasil
print("Accuracy :", accuracy * 100, "%")

# Simpan model
with open(
    "backend/model/knn_model.pkl",
    "wb"
) as file:

    pickle.dump(model, file)

print("\nModel berhasil disimpan!")