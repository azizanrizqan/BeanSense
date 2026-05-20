import cv2

# Path gambar
image_path = "dataset/train/arabika/coffee1.jpg"

# Membaca gambar
image = cv2.imread(image_path)

# Resize menjadi 32x32
resize_image = cv2.resize(image, (32, 32))

# Convert ke grayscale
gray = cv2.cvtColor(
    resize_image,
    cv2.COLOR_BGR2GRAY
)

# Gaussian Blur
gray = cv2.GaussianBlur(
    gray,
    (5,5),
    0
)

# Tampilkan gambar asli
cv2.imshow("Original", resize_image)

# Tampilkan grayscale
cv2.imshow("Grayscale", gray)

# Tunggu keyboard
cv2.waitKey(0)

# Tutup window
cv2.destroyAllWindows()