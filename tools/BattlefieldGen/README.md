# Image Split to Print-Ready PDF

This Python script splits a high-resolution image into evenly sized square tiles, overlays a 5x5 grid of **crosshairs (`+`)** on each tile, and compiles them into a multi-page PDF — with each page sized to print exactly **20x20 cm** on a **US Letter** page.

Perfect for creating printable battlefield maps, posters, or modular game boards with consistent tile sizes.

---

## Features

* Split any image into a grid of square tiles (e.g. `3x2`)
* Automatically crops and centers to preserve square tiles
* Overlays a **5x5 grid of crosses (+)** on each tile
* Customizable grid color and print-scale line width
* Generates a **single, multi-page PDF** with one tile per page
* Includes an **optional instruction page** with layout preview
* PDF metadata includes correct title and page size

---

## Usage

```bash
python BattlefieldPDFGen.py input.jpg --tiles 3x2
```

### Arguments

| Argument          | Description                                               | Default           |
| ----------------- | --------------------------------------------------------- | ----------------- |
| `input.jpg`       | Path to the input image                                   | *(required)*      |
| `--tiles`         | Tile layout in `COLSxROWS` format                         | `1x1`             |
| `--grid-color`    | Hex color for the grid "+" markers                        | `#FFFFFF` (white) |
| `--grid-width-mm` | Grid line width in **millimeters (print)**                | `1`               |
| `--instructions`  | Include instructions page with a layout preview (1 = yes) | `0` (no)          |

---

## Output

* A single PDF file saved **in the same folder** as the input image
* PDF filename matches the input (e.g. `map.jpg` → `map.pdf`)
* Each tile is printed on its own US Letter page at **exactly 20x20 cm**
* The optional instructions page appears **last**, and includes:

  * Print and assembly guidance
  * A preview of the full layout with grid lines overlaid

---

## Printing Instructions

* Open the generated PDF in a standard viewer (e.g. Adobe Acrobat)
* Print using **"Actual Size"** or **100% scaling** (disable "Fit to Page")
* Each tile will print at **exactly 20x20 cm**
* Trim and arrange tiles using the preview guide on the final page

---

## Example

```bash
python BattlefieldPDFGen.py maps/ruined_city.jpg --tiles 4x3 --grid-color "#FF0000" --grid-width-mm 2 --instructions 1
```

This will:

* Split the image into **4 columns x 3 rows** of square tiles
* Add red cross-style grid marks to each tile
* Save a multi-page PDF named `ruined_city.pdf`
* Append a final page with usage instructions and a layout preview

---

## Requirements

* Python 3.7+
* [`Pillow`](https://pypi.org/project/Pillow/) (for image manipulation)
* [`reportlab`](https://pypi.org/project/reportlab/) (for PDF generation)

Install dependencies:

```bash
pip install pillow reportlab
```
