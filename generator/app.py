# generator/app.py
from flask import Flask, request, send_file, jsonify
from flask_cors import CORS, cross_origin
import barcode
from barcode.writer import ImageWriter
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def resize_image(image, width, height):
    return image.resize((width, height), Image.LANCZOS)

def create_composite_image(barcode_images, descriptions, rows=6, cols=6, empty_placeholders=8, barcode_width=110, barcode_height=30, row_spacing=30):
    # Resize each barcode image
    barcode_images = [resize_image(img, barcode_width, barcode_height) for img in barcode_images]

    # Calculate the size of the composite image
    img_width, img_height = barcode_images[0].size
    composite_width = img_width * cols
    composite_height = img_height * (rows + 1) + row_spacing * (rows + 1) + 40  # Add extra space for rows and text

    # Create a new blank image for the composite
    composite_img = Image.new('RGB', (composite_width, composite_height), 'white')
    draw = ImageDraw.Draw(composite_img)

    # Load a font
    try:
        font = ImageFont.truetype("arial.ttf", 12)
    except IOError:
        font = ImageFont.load_default()

    # Paste each barcode image into the composite image, starting after empty placeholders
    for i, (img, desc) in enumerate(zip(barcode_images, descriptions)):
        x = (i % cols) * img_width
        y = (i // cols + 1) * (img_height + row_spacing)  # Start past the empty placeholders and add row spacing
        composite_img.paste(img, (x, y))

        # Add text below the barcode
        text_bbox = draw.textbbox((0, 0), desc, font=font)
        text_width = text_bbox[2] - text_bbox[0]
        text_height = text_bbox[3] - text_bbox[1]
        text_x = x + (img_width - text_width) / 2
        text_y = y + img_height
        draw.text((text_x, text_y), desc, font=font, fill='black')

    return composite_img

@app.route('/generate_barcode', methods=['GET'])
@cross_origin()
def generate_barcode():
    # Get the data from the query parameters
    codigo = request.args.get('codigo')
    descripcion = request.args.get('descripcion')
    ubicacion = request.args.get('ubicacion')
    quantity = int(request.args.get('quantity', 10))
    barcode_type = request.args.get('type', 'code39')

    if not codigo:
        return jsonify({"error": "Data parameter is required"}), 400

    try:
        # Choose the type of barcode
        barcode_class = barcode.get_barcode_class(barcode_type)

        # Generate barcode images and descriptions
        barcode_images = []
        descriptions = []
        for _ in range(quantity):
            barcode_obj = barcode_class(codigo, writer=ImageWriter())
            buffer = BytesIO()
            barcode_obj.write(buffer)
            buffer.seek(0)
            img = Image.open(buffer)
            barcode_images.append(img)
            descriptions.append(descripcion)

        # Create a composite image with 8 empty placeholders followed by barcodes
        composite_img = create_composite_image(barcode_images, descriptions)

        # Save the composite image to a BytesIO object
        buffer_with_composite = BytesIO()
        composite_img.save(buffer_with_composite, format='PNG')
        buffer_with_composite.seek(0)

        return send_file(buffer_with_composite, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)