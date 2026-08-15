import os
import pymupdf
from PIL import Image, ImageChops

cert_dir = r"c:\Users\Anu Reddy\OneDrive\Desktop\Projects\anu\public\certificates"
preview_dir = r"c:\Users\Anu Reddy\OneDrive\Desktop\Projects\anu\public\certificate-previews"

os.makedirs(preview_dir, exist_ok=True)

files = [f for f in os.listdir(cert_dir) if f.lower().endswith('.pdf')]
print(f"Processing {len(files)} PDF files...")

def crop_white_borders(image_path, padding=10):
    img = Image.open(image_path).convert("RGB")
    # Create background image of pure white
    bg = Image.new("RGB", img.size, (255, 255, 255))
    diff = ImageChops.difference(img, bg)
    # Threshold diff to ignore slight compression noise
    diff = ImageChops.add(diff, diff, 2.0, -20)
    bbox = diff.getbbox()
    if bbox:
        left, upper, right, lower = bbox
        # Add small padding
        left = max(0, left - padding)
        upper = max(0, upper - padding)
        right = min(img.width, right + padding)
        lower = min(img.height, lower + padding)
        
        cropped = img.crop((left, upper, right, lower))
        cropped.save(image_path)
        print(f"[CROPPED] {os.path.basename(image_path)} (Original: {img.size} -> Cropped: {cropped.size})")

for filename in files:
    pdf_path = os.path.join(cert_dir, filename)
    try:
        doc = pymupdf.open(pdf_path)
        if len(doc) > 0:
            page = doc[0]  # Page 1
            zoom = 2.5
            mat = pymupdf.Matrix(zoom, zoom)
            pix = page.get_pixmap(matrix=mat, alpha=False)
            
            out_filename = os.path.splitext(filename)[0] + ".png"
            out_path = os.path.join(preview_dir, out_filename)
            pix.save(out_path)
            
            # Crop white margins
            crop_white_borders(out_path)
        doc.close()
    except Exception as e:
        print(f"[ERROR] processing {filename}: {e}")

print("All certificate previews cropped successfully!")
