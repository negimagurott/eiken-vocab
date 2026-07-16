from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
CANVAS = 1024


def render(size: int, filename: str) -> None:
    gradient = Image.linear_gradient("L").resize((CANVAS, CANVAS)).rotate(-45)
    image = ImageOps.colorize(gradient, black="#14213d", white="#3157d5").convert("RGBA")
    draw = ImageDraw.Draw(image)
    font = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 620)
    box = draw.textbbox((0, 0), "C", font=font)
    x = (CANVAS - (box[2] - box[0])) / 2 - box[0]
    y = (CANVAS - (box[3] - box[1])) / 2 - box[1]
    draw.text((x, y), "C", fill="white", font=font)
    draw.ellipse((714, 478, 782, 546), fill="#55d2b2")
    image.resize((size, size), Image.Resampling.LANCZOS).save(ROOT / filename, optimize=True)


render(180, "apple-touch-icon.png")
render(192, "icon-192.png")
render(512, "icon-512.png")
print("Rendered iPhone and PWA icons.")
