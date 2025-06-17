# Image Split to Print-Ready PDF

This Python script splits a high-resolution image into evenly sized tiles, overlays a 5×5 grid on each tile, and compiles them into a multi-page PDF — with each page sized to print exactly **20×20 cm** on a **US Letter** page.

This tool helps generate printable battlefield tiles from full-size input images and was used to generate the battlefield PDFs for print-at-home tiles in this game.

---

## Features

- Split an image into a grid of tiles (e.g. `3x2`)
- Overlay a customizable 5×5 grid on each tile
- Automatically generates a **multi-page PDF**
- Consistent print size: **20 cm × 20 cm**
- Optional grid color and line width control

---

## Usage

### Basic

Takes the input image, splits it into 6 tiles (3 columns, 2 rows), adds a white grid to each tile, and generates a 6-page PDF with a gridded tile on each page.

```bash
python split_image_to_pdfs.py "Path/To/Image.jpg" --tiles 3x2
```

### Grid Size and Color

Same as above, but thicker 10-pixel grid lines (`--grid-width 10`) in red (`--grid-color "#FF0000"`).

```bash
python split_image_to_pdfs.py "Path/To/Image.jpg" --tiles 3x2 --grid-color "#FF0000" --grid-width 10
```
