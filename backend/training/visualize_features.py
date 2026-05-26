import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

# Load dataset fitur
df = pd.read_csv(
    "backend/training/coffee_features.csv"
)

# Pisahkan fitur dan label
X = df.drop(
    columns=["label"]
)

y = df["label"]

# Normalisasi fitur
scaler = StandardScaler()

X_scaled = scaler.fit_transform(X)

# =========================
# BOX PLOT
# =========================

plt.figure(figsize=(10,6))

sns.boxplot(
    data=df,
    x="label",
    y="circularity"
)

plt.title(
    "Box Plot Circularity Antar Jenis Kopi"
)

plt.xlabel(
    "Jenis Kopi"
)

plt.ylabel(
    "Nilai Circularity"
)

plt.tight_layout()

plt.show()

# =========================
# PCA SCATTER PLOT
# =========================

pca = PCA(
    n_components=2
)

X_pca = pca.fit_transform(
    X_scaled
)

pca_df = pd.DataFrame()

pca_df["PCA1"] = X_pca[:,0]

pca_df["PCA2"] = X_pca[:,1]

pca_df["label"] = y

plt.figure(figsize=(10,7))

sns.scatterplot(

    data=pca_df,

    x="PCA1",

    y="PCA2",

    hue="label",

    s=80

)

plt.title(
    "Scatter Plot PCA Fitur Biji Kopi"
)

plt.xlabel(
    "Principal Component 1"
)

plt.ylabel(
    "Principal Component 2"
)

plt.legend(
    title="Jenis Kopi"
)

plt.tight_layout()

plt.show()