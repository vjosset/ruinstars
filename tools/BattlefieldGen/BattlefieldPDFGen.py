import os
import io
import argparse
from pathlib import Path
from PIL import Image, ImageDraw
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import cm
from reportlab.lib.utils import ImageReader

# --- Argument Parsing ---
parser = argparse.ArgumentParser(description="Split an image into tiles with 5x5 grid and export as 20x20cm PDFs.")
parser.add_argument("input_image", help="Path to the input image")
parser.add_argument(
  "--tiles", default="1x1", help="Tiles for the image split, format: COLSxROWS (e.g. 3x2)")
parser.add_argument(
  "--grid-color", default="#FFFFFF",
  help="Hex color for the grid lines (default: white)"
)
parser.add_argument(
  "--grid-width-mm", type=int, default=2,
  help="Width of grid lines in millimeters (default: 2)"
)
args = parser.parse_args()

input_path = Path(args.input_image).resolve()

# --- Parse Grid Size ---
try:
  cols, rows = map(int, args.tiles.lower().split("x"))
  if cols < 1 or rows < 1:
    raise ValueError
except ValueError:
  raise SystemExit("❌ Invalid --grid value. Use format like 3x2 or 1x1")

# --- Load Image ---
image = Image.open(input_path).convert("RGB")
width, height = image.size
tile_width = width // cols
tile_height = height // rows

# --- PDF Layout Constants ---
img_size = 20 * cm
page_width, page_height = letter
x_offset = (page_width - img_size) / 2
y_offset = (page_height - img_size) / 2

# Prepare the PDF canvas
output_pdf = input_path.with_suffix(".pdf")
c = canvas.Canvas(str(output_pdf), pagesize=letter)
c.setTitle(input_path.stem)

# Get original image size
img_w, img_h = image.size
cols, rows = map(int, args.tiles.lower().split("x"))

# Calculate pixel aspect ratio per tile
aspect_x = img_w / cols
aspect_y = img_h / rows

# Choose the smaller to preserve square tiles
tile_size = int(min(aspect_x, aspect_y))

# Calculate final dimensions to crop to
crop_w = tile_size * cols
crop_h = tile_size * rows

# Center crop the image to this new size
left = (img_w - crop_w) // 2
top = (img_h - crop_h) // 2
right = left + crop_w
bottom = top + crop_h
image = image.crop((left, top, right, bottom))

# Save new tile dimensions
tile_width = tile_size
tile_height = tile_size

# (You can print these to debug)
print(f"→ Cropped to {crop_w}x{crop_h}, each tile is {tile_size}px square")

# --- Process Each Tile ---
for row in range(rows):
  for col in range(cols):
    left = col * tile_width
    upper = row * tile_height
    right = left + tile_width
    lower = upper + tile_height
    tile = image.crop((left, upper, right, lower))

    # Add this tile
    draw = ImageDraw.Draw(tile)

    # Draw 5x5 grid
    # Get this tile's size (width) in pixels, get its final pixel density, and use that to calculate the line width in pixels
    tile_pixel_width = tile.width  
    PIXELS_PER_MM = tile_pixel_width / 200.0  # 200mm target print width
    line_width_px = int(round(args.grid_width_mm * PIXELS_PER_MM))
    half_len = line_width_px * 5  # or keep as-is
    intersections = 6
    cross_len = line_width_px  * 2

    for i in range(intersections):
      for j in range(intersections):
        x = i * tile_width // (intersections - 1)
        y = j * tile_height // (intersections - 1)

        # Horizontal line of the "+"
        draw.line([(x - cross_len, y), (x + cross_len, y)],
                  fill=args.grid_color, width=line_width_px )

        # Vertical line of the "+"
        draw.line([(x, y - cross_len), (x, y + cross_len)],
                  fill=args.grid_color, width=line_width_px )

    # Save tile to buffer
    buffer = io.BytesIO()
    tile.save(buffer, format="PNG")
    buffer.seek(0)
    tile_reader = ImageReader(buffer)

    # PDF Output
    tile_name = f"{input_path.stem}_r{row+1}_c{col+1}.pdf"
    c.drawImage(tile_reader, x_offset, y_offset, width=img_size, height=img_size)

    # Add tile to the PDF on its own page
    c.showPage()
c.save()

print(f"\n✅ All PDFs saved to: {output_pdf}")
