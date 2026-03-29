from rembg import remove
from PIL import Image
import os

input_dir = "public/images/icons"
output_dir = "public/images/icons"

for filename in os.listdir(input_dir):
    if filename.lower().endswith(".png"):
        input_path = os.path.join(input_dir, filename)
        output_path = os.path.join(output_dir, filename)
        print(f"Processing {filename}...")
        with open(input_path, "rb") as f:
            result = remove(f.read())
        with open(output_path, "wb") as f:
            f.write(result)
        print(f"  Done: {output_path}")

print("All icons processed.")
