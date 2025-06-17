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
  "--grid-width", type=int, default=3,
  help="Width of grid lines in pixels (default: 3)"
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

# --- Process Each Tile ---
for row in range(rows):
  for col in range(cols):
    left = col * tile_width
    upper = row * tile_height
    right = left + tile_width
    lower = upper + tile_height
    tile = image.crop((left, upper, right, lower))

    # Draw 5x5 grid
    draw = ImageDraw.Draw(tile)
    for i in range(1, 5):
      x = i * tile_width // 5
      y = i * tile_height // 5
      draw.line([(x, 0), (x, tile_height)], fill=args.grid_color, width=args.grid_width)
      draw.line([(0, y), (tile_width, y)], fill=args.grid_color, width=args.grid_width)

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
