import pandas as pd
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
    accuracy_score
)

# LOAD DATASET
df = pd.read_csv(
    "training/coffee_features.csv"
)

# LABEL
y = df["label"]

# FEATURE SETS
feature_sets = {

    "All Features":

        [
            "area",
            "perimeter",
            "circularity",
            "aspect_ratio"
        ],

    "Without Circularity":

        [
            "area",
            "perimeter",
            "aspect_ratio"
        ],

    "Without Aspect Ratio":

        [
            "area",
            "perimeter",
            "circularity"
        ]

}

accuracies = []

# LOOP
for name, features in feature_sets.items():

    X = df[features]

    X_train, X_test, y_train, y_test = train_test_split(

        X,

        y,

        test_size=0.2,

        random_state=42,

        stratify=y

    )

    scaler = StandardScaler()

    X_train = scaler.fit_transform(
        X_train
    )

    X_test = scaler.transform(
        X_test
    )

    model = KNeighborsClassifier(
        n_neighbors=3
    )

    model.fit(
        X_train,
        y_train
    )

    y_pred = model.predict(
        X_test
    )

    accuracy = accuracy_score(
        y_test,
        y_pred
    )

    accuracies.append(
        accuracy * 100
    )

    print(
        f"{name}: {accuracy*100:.2f}%"
    )

# VISUALIZATION
plt.figure(figsize=(8,6))

plt.bar(

    feature_sets.keys(),

    accuracies

)

plt.title(
    "Eksperimen Ablasi Fitur"
)

plt.ylabel(
    "Accuracy (%)"
)

plt.xticks(rotation=10)

plt.show()