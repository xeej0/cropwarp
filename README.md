# Cropwarp

A single-file, zero-dependency photo editor that runs entirely in the browser (nothing is uploaded).

- **Crop** with free or fixed aspect ratios, numeric entry, drag/resize handles
- **Perspective correction**: drag four corners, get a flattened rectangle (A4/Letter/other output shapes, live preview, magnifier loupe)
- **Rotate / flip / straighten** with auto-crop of empty corners
- **Resize** by pixels, percent or long edge, with high-quality stepped downscaling
- **Adjust** brightness, contrast, saturation
- Undo/redo, revert, drag-drop, paste, export PNG/JPEG/WebP

The perspective warp is a hand-written homography solver plus bilinear sampling, so there is no library to bundle.

Run locally: open `index.html`, or `npx serve .`.
