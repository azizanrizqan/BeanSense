import pandas as pd

# Load dataset fitur
df = pd.read_csv(
    "backend/training/coffee_features.csv"
)

# Tampilkan 5 data pertama
print("\n[TABEL DATASET VEKTOR FITUR KOPI]\n")

print(
    df.head()
)

print("\nUkuran Dataset :")

print(
    df.shape
)