# Image Split to Print-Ready PDF

This Python script splits a high-resolution image into evenly sized tiles, overlays a 5×5 grid on each tile, and compiles them into a multi-page PDF — with each page sized to print exactly **20×20 cm** on a **US Letter** page.

Perfect for creating printable battlefield maps, posters, or game assets with consistent tile sizes.

---

## Features

- Split an image into a grid of tiles (e.g. `3x2`)
- Overlay a customizable 5×5 grid on each tile
- Automatically generates a **multi-page PDF**
- Consistent print size: **20 cm × 20 cm**
- Optional grid color and line width control

---

## Usage

```bash
python BattlefieldPDFGen.py input.jpg --tiles 3x2
```

### Arguments

| Argument          | Description                                | Default           |
| ----------------- | ------------------------------------------ | ----------------- |
| `input.jpg`       | Path to the input image                    | *(required)*      |
| `--tiles`         | Grid size in `COLSxROWS` format            | `1x1`             |
| `--grid-color`    | Hex color for grid lines                   | `#FFFFFF` (white) |
| `--grid-width-mm` | Grid line width in **millimeters (print)** | `2`               |

---

## Output

- A single PDF file placed **in the same folder** as the input image
- PDF pages are sized to fit **one 20×20 cm tile per page**
- Filename matches the original image (e.g. `map.jpg` → `map.pdf`)
- PDF metadata includes the correct title

---

## Printing Instructions

- Open the PDF in your preferred viewer
- Print with **no scaling** (100% or “actual size”)
- Output size will be **exactly 20 × 20 cm per tile**

---

## Example

```bash
python BattlefieldPDFGen.py maps/city_sector.jpg --tiles 4x3 --grid-color "#FF0000" --grid-width-mm 3
```

This will:

- Split the image into **4 columns × 3 rows**
- Draw red grid lines, 3mm thick in print
- Output `maps/city_sector.pdf`

---

## Requirements

- Python 3.7+
- `Pillow`, `reportlab`

Install dependencies:

```bash
pip install pillow reportlab
```
