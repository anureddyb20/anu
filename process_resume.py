import os
import shutil
import pymupdf
from PIL import Image, ImageChops

source_pdf = r"c:\Users\Anu Reddy\OneDrive\Desktop\Projects\anu\public\ANU RESUME.pdf"
target_dir = r"c:\Users\Anu Reddy\OneDrive\Desktop\Projects\anu\public\resume"
target_pdf = os.path.join(target_dir, "Anu-Reddy-Resume.pdf")
preview_png = os.path.join(target_dir, "Anu-Reddy-Resume-preview.png")

os.makedirs(target_dir, exist_ok=True)

if os.path.exists(source_pdf):
    shutil.copy2(source_pdf, target_pdf)
    print(f"[OK] Copied {source_pdf} -> {target_pdf}")

doc = pymupdf.open(target_pdf)
print(f"Resume PDF loaded! Total pages: {len(doc)}")

# Read text from resume
full_text = ""
for page in doc:
    full_text += page.get_text()

print("--- RESUME TEXT START ---")
print(full_text[:2000])
print("--- RESUME TEXT END ---")

# Render page 1 preview image
page = doc[0]
zoom = 2.5
mat = pymupdf.Matrix(zoom, zoom)
pix = page.get_pixmap(matrix=mat, alpha=False)
pix.save(preview_png)

# Autocrop white margins slightly
img = Image.open(preview_png).convert("RGB")
bg = Image.new("RGB", img.size, (255, 255, 255))
diff = ImageChops.difference(img, bg)
diff = ImageChops.add(diff, diff, 2.0, -20)
bbox = diff.getbbox()
if bbox:
    left, upper, right, lower = bbox
    pad = 15
    left = max(0, left - pad)
    upper = max(0, upper - pad)
    right = min(img.width, right + pad)
    lower = min(img.height, lower + pad)
    cropped = img.crop((left, upper, right, lower))
    cropped.save(preview_png)
    print(f"[OK] Rendered & Cropped Resume Preview: {preview_png}")

doc.close()
