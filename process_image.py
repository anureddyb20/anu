import sys
from rembg import remove
from PIL import Image

input_path = "C:\\Users\\Anu Reddy\\.gemini\\antigravity-ide\\brain\\a1d2f9b0-9cf4-49fe-bf19-3832e3b119b5\\media__1786348267605.jpg"
output_path = "C:\\Users\\Anu Reddy\\OneDrive\\Desktop\\Projects\\anu\\public\\hero.png"

print("Loading original image...")
input_image = Image.open(input_path)

print("Removing background...")
output_image = remove(input_image)

print("Cropping image to half-length...")
# The original image is full length or 3/4 length. We want to crop from the top down to just below the chest.
# Let's inspect the dimensions
width, height = output_image.size

# Assuming the face is near the top center, we can crop the top 60% of the image 
# and maybe crop the sides slightly to center the person.
left = width * 0.1
top = height * 0.05
right = width * 0.9
bottom = height * 0.55 # Crop at 55% height to get chest level

cropped_image = output_image.crop((left, top, right, bottom))

print("Saving final image...")
cropped_image.save(output_path, "PNG")
print("Done!")
