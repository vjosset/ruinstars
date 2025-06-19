import os
import argparse
from pathlib import Path
from PIL import Image

# --- Argument Parsing ---
parser = argparse.ArgumentParser(description="Tile images from a folder into a single grid image.")
parser.add_argument("input_folder", help="Path to folder containing input images")
parser.add_argument("--tiles", default="3x3", help="Grid size in COLSxROWS format (e.g. 4x2)")
parser.add_argument("--output", default="tiled_output.jpg", help="Output filename (default: tiled_output.jpg)")
args = parser.parse_args()

print("Got arguments:")
print(f"  Input folder: {args.input_folder}")
print(f"  Tiles: {args.tiles}")
print(f"  Output: {args.output}")


input_folder = Path(args.input_folder).resolve()

# --- Parse grid size ---
try:
    cols, rows = map(int, args.tiles.lower().split("x"))
    if cols < 1 or rows < 1:
        raise ValueError
except ValueError:
    raise SystemExit("❌ Invalid --tiles value. Use format like 3x2 or 1x1")

# --- Load images ---
image_files = sorted([f for f in input_folder.iterdir() if f.suffix.lower() in [".jpg", ".jpeg", ".png"]])

if len(image_files) < cols * rows:
    raise SystemExit(f"❌ Not enough images in folder to fill {cols}x{rows} = {cols * rows} tiles")

images = [Image.open(f).convert("RGB") for f in image_files[:cols * rows]]

# --- Resize all images to the size of the first one ---
tile_width, tile_height = images[0].size
images = [img.resize((tile_width, tile_height)) for img in images]

# --- Create combined image ---
combined_width = cols * tile_width
combined_height = rows * tile_height
combined_img = Image.new("RGB", (combined_width, combined_height))

# --- Paste each image into the grid ---
for index, img in enumerate(images):
    x = (index % cols) * tile_width
    y = (index // cols) * tile_height
    combined_img.paste(img, (x, y))

# --- Save result ---
output_path = input_folder / "tiled.png"
combined_img.save(output_path)
print(f"✅ Saved combined image to: {output_path}")
