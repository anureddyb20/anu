import os
import pymupdf

cert_dir = r"c:\Users\Anu Reddy\OneDrive\Desktop\Projects\anu\public\certificates"
preview_dir = r"c:\Users\Anu Reddy\OneDrive\Desktop\Projects\anu\public\certificate-previews"

os.makedirs(preview_dir, exist_ok=True)

files = [f for f in os.listdir(cert_dir) if f.lower().endswith('.pdf')]
print(f"Found {len(files)} PDF files in {cert_dir}")

for filename in files:
    pdf_path = os.path.join(cert_dir, filename)
    try:
        doc = pymupdf.open(pdf_path)
        if len(doc) > 0:
            page = doc[0]  # Page 1
            # Render page to high-res pixmap (matrix = 2.0 zoom for crisp text & logos)
            zoom = 2.0
            mat = pymupdf.Matrix(zoom, zoom)
            pix = page.get_pixmap(matrix=mat, alpha=False)
            
            out_filename = os.path.splitext(filename)[0] + ".png"
            out_path = os.path.join(preview_dir, out_filename)
            pix.save(out_path)
            print(f"[OK] Rendered: {out_filename}")
        doc.close()
    except Exception as e:
        print(f"[ERROR] rendering {filename}: {e}")

print("All preview images rendered!")
