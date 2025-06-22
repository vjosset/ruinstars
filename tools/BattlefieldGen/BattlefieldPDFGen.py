import os
import io
import argparse
from pathlib import Path
from PIL import Image, ImageDraw, ImageFile
ImageFile.LOAD_TRUNCATED_IMAGES = True
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.units import cm
from reportlab.lib.utils import ImageReader

# --- Constants ---
JPEG_QUALITY = 100
MIN_TILE_SIZE = 1024

# --- Argument Parsing ---
parser = argparse.ArgumentParser(description="Split an image into tiles with 5x5 grid and export as 20x20cm PDFs.")
parser.add_argument("input_image", help="Path to the input image")
parser.add_argument(
  "--tiles", default="1x1", help="Tiles for the image split, format: COLSxROWS (e.g. 3x2)")
parser.add_argument(
  "--grid-color", default="#c54c21",
  help="Hex color for the grid lines (default: orange #c54c21)"
)
parser.add_argument(
  "--grid-width-mm", type=int, default=1,
  help="Width of grid lines in millimeters (default: 1)"
)
parser.add_argument(
  "--upscale", type=int, default=1,
  help="Auto-upscale image to MIN_TILE_SIZE * COLS x MIN_TILE_SIZE * ROWS before processing (default: 1, upscale)"
)
parser.add_argument(
  "--instructions", type=int, default=0,
  help="Include instructions page with a thumbnail of the original image (default: 0, no instructions)"
)
parser.add_argument(
  "--page_size", default="US Letter",
  help="the page size for the PDF output (default: 'US Letter', also supports 'A4'). "
)
args = parser.parse_args()

input_path = Path(args.input_image).resolve()

if args.page_size.lower() == "a4":
  page_size = A4
  page_size_name = "A4"
else:
  page_size = letter 
  page_size_name = "Letter"

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

# Upscale to MIN_TILE_SIZE * cols x MIN_TILE_SIZE * rows before any other manipulation
if args.upscale > 0:
  target_size = (MIN_TILE_SIZE * cols, MIN_TILE_SIZE * rows)
  if target_size[0] > width or target_size[1] > height:
    scale_w = target_size[0] / width
    scale_h = target_size[1] / height
    scale = max(scale_w, scale_h)  # Use the larger scale to ensure both dimensions meet minimums

    new_width = int(width * scale)
    new_height = int(height * scale)

    print(f"⚠️ Upscaling image from {width}x{height} to {new_width}x{new_height}")
    image = image.resize((new_width, new_height), Image.LANCZOS)

    width, height = image.size
    tile_width = width // cols
    tile_height = height // rows

# --- PDF Layout Constants ---
img_size = 20 * cm
page_width, page_height = page_size
x_offset = (page_width - img_size) / 2
y_offset = (page_height - img_size) / 2

# Prepare the PDF canvas
output_pdf = input_path.with_name(f"{input_path.stem}_{page_size_name}.pdf")
c = canvas.Canvas(str(output_pdf), pagesize=page_size)
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
    cross_len = line_width_px  * 3

    for i in range(intersections):
      for j in range(intersections):
        x = i * tile_width // (intersections - 1)
        y = j * tile_height // (intersections - 1)

        # Horizontal line of the "+"
        draw.line([(x - cross_len - line_width_px, y), (x + cross_len + line_width_px, y)],
                  fill="#000000", width=line_width_px * 3 )

        # Vertical line of the "+"
        draw.line([(x, y - cross_len - line_width_px), (x, y + cross_len + line_width_px)],
                  fill="#000000", width=line_width_px * 3 )

        # Horizontal line of the "+"
        draw.line([(x - cross_len, y), (x + cross_len, y)],
                  fill=args.grid_color, width=line_width_px )

        # Vertical line of the "+"
        draw.line([(x, y - cross_len), (x, y + cross_len)],
                  fill=args.grid_color, width=line_width_px )
    
    ## Draw inner grid lines
    #line_width_px = round(line_width_px / 2)
    #half_len = round(half_len / 2)
    #intersections = 6
    #cross_len = line_width_px  * 2
    #for i in range(intersections):
    #  for j in range(intersections):
    #    x = i * tile_width // (intersections - 1)
    #    y = j * tile_height // (intersections - 1)
    #    # Horizontal line of the "+"
    #    draw.line([(x - cross_len, y), (x + cross_len, y)],
    #              fill="#000000", width=line_width_px )
    #    # Vertical line of the "+"
    #    draw.line([(x, y - cross_len), (x, y + cross_len)],
    #              fill="#000000", width=line_width_px )

    # Save tile to buffer - Convert to JPEG for PDF embedding and smaller output PDF file size
    # Note: JPEG is lossy, but we use high quality to minimize artifacts and they are not notticeable in this context
    buffer = io.BytesIO()
    tile.save(buffer, format="JPEG", quality=JPEG_QUALITY, optimize=True)
    buffer.seek(0)
    tile_reader = ImageReader(buffer)

    # PDF Output
    tile_name = f"{input_path.stem}_r{row+1}_c{col+1}.pdf"
    c.drawImage(tile_reader, x_offset, y_offset, width=img_size, height=img_size)

    # Add tile to the PDF on its own page
    c.showPage()

# --- Append instructions page if requested ---
if args.instructions > 0:
  # Draw instructions on final page
  c.setFont("Helvetica-Bold", 16)
  c.drawString(2 * cm, page_height - 2 * cm, "How to Print and Use")

  c.setFont("Helvetica", 11)
  instructions = [
    "• Print this PDF at 100% scale (do NOT use 'Fit to page').",
    "• Each tile prints at 20×20 cm and forms a grid of your original image.",
    f"• This layout preview shows how to arrange the {cols}×{rows} tiles.",
    "• Cut and align the tiles according to the grid.",
    "• Mount to foam board, wood, or card for maximum durability."
  ]

  y = page_height - 3.2 * cm
  for line in instructions:
    c.drawString(2 * cm, y, line)
    y -= 0.6 * cm

  # Create preview thumbnail of cropped image with overlaid grid
  max_preview_width_cm = 10
  max_preview_height_cm = 10
  dpi_preview = 118 # ~300 DPI for preview sizing
  max_preview_width_px = int(max_preview_width_cm * dpi_preview)
  max_preview_height_px = int(max_preview_height_cm * dpi_preview)

  # Resize with aspect ratio preserved
  img_w, img_h = image.size
  aspect_ratio = img_w / img_h

  if (max_preview_width_px / max_preview_height_px) > aspect_ratio:
    # Height limits size
    preview_height_px = max_preview_height_px
    preview_width_px = int(preview_height_px * aspect_ratio)
  else:
    # Width limits size
    preview_width_px = max_preview_width_px
    preview_height_px = int(preview_width_px / aspect_ratio)

  # Resize the image
  # Note: Using LANCZOS filter for high-quality downscaling
  # | Filter       | Downscaling Quality |  Upscaling Quality  | Performance |
  # +--------------+---------------------+---------------------+-------------+
  # |NEAREST       |         0           |         0           |      5      |
  # |BOX           |         1           |         0           |      4      |
  # |BILINEAR      |         1           |         1           |      3      |
  # |HAMMING       |         2           |         0           |      3      |
  # |BICUBIC       |         3           |         3           |      2      |
  # |LANCZOS       |         4           |         4           |      1      |
  
  preview_img = image.resize((preview_width_px, preview_height_px), Image.LANCZOS)

  # Draw grid lines
  draw = ImageDraw.Draw(preview_img)
  line_color = "white"
  line_width = 2

  for i in range(1, cols):
    x = int(i * preview_width_px / cols)
    draw.line([(x, 0), (x, preview_height_px)], fill=line_color, width=line_width)
  for j in range(1, rows):
    y = int(j * preview_height_px / rows)
    draw.line([(0, y), (preview_width_px, y)], fill=line_color, width=line_width)

  # Convert preview image to buffer
  preview_buffer = io.BytesIO()
  preview_img.save(preview_buffer, format="JPEG", quality=JPEG_QUALITY, optimize=True)
  preview_buffer.seek(0)
  preview_reader = ImageReader(preview_buffer)

  # Convert to PDF dimensions (points), enforcing 10×10 cm max size
  preview_w_cm = preview_width_px / dpi_preview * 2.54
  preview_h_cm = preview_height_px / dpi_preview * 2.54

  # Final preview dimensions in points (cm -> pt)
  aspect_ratio = preview_width_px / preview_height_px

  if aspect_ratio >= 1:
    # Landscape or square
    preview_w_pt = max_preview_width_cm * cm
    preview_h_pt = preview_w_pt / aspect_ratio
  else:
    # Portrait
    preview_h_pt = max_preview_height_cm * cm
    preview_w_pt = preview_h_pt * aspect_ratio

  # Place the preview image centered on the page
  x_pos = (page_width - preview_w_pt) / 2
  y_pos = (page_height - preview_h_pt) / 2

  # Draw image on final page
  c.drawImage(preview_reader, x_pos, y_pos, width=preview_w_pt, height=preview_h_pt)
  c.showPage()


# --- Finalize PDF ---
c.save()

print(f"\n✅ PDF saved to: {output_pdf}")
