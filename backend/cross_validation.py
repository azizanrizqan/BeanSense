import pandas as pd
import matplotlib.pyplot as plt

from sklearn.model_selection import (
    cross_val_score,
    StratifiedKFold
)

from sklearn.preprocessing import (
    StandardScaler
)

from sklearn.pipeline import (
    Pipeline
)

from sklearn.neighbors import (
    KNeighborsClassifier
)

# LOAD DATASET
df = pd.read_csv(
    "training/coffee_features.csv"
)

# FEATURE & LABEL
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

# K-FOLD
kfold = StratifiedKFold(

    n_splits=5,

    shuffle=True,

    random_state=42

)

# CROSS VALIDATION
scores = cross_val_score(

    pipeline,

    X,

    y,

    cv=kfold,

    scoring="accuracy"

)

# PRINT
print("\nPer-Fold Accuracy:\n")

for i, score in enumerate(scores):

    print(
        f"Fold {i+1}: {score*100:.2f}%"
    )

print(
    f"\nAverage Accuracy: {scores.mean()*100:.2f}%"
)

# VISUALIZATION
plt.figure(figsize=(8,6))

plt.plot(

    range(1,6),

    scores * 100,

    marker="o"

)

plt.title(
    "5-Fold Cross Validation"
)

plt.xlabel(
    "Fold"
)

plt.ylabel(
    "Accuracy (%)"
)

plt.grid(True)

plt.show()