from flask import Flask, request, send_file, jsonify
from flask_cors import CORS, cross_origin
import barcode
from barcode.writer import ImageWriter
from io import BytesIO
from PIL import Image

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def resize_image(image, width, height):
    return image.resize((width, height), Image.LANCZOS)

def create_composite_image(barcode_images, rows=2, cols=5, empty_placeholders=8, barcode_width=150, barcode_height=100):
    # Resize each barcode image
    barcode_images = [resize_image(img, barcode_width, barcode_height) for img in barcode_images]

    # Calculate the size of the composite image
    img_width, img_height = barcode_images[0].size
    composite_width = img_width * cols
    composite_height = img_height * (rows + 1)  # Add an extra row for empty placeholders

    # Create a new blank image for the composite
    composite_img = Image.new('RGB', (composite_width, composite_height), 'white')

    # Paste each barcode image into the composite image, starting after empty placeholders
    for i, img in enumerate(barcode_images):
        x = (i % cols) * img_width
        y = (i // cols + 1) * img_height  # Start past the empty placeholders
        composite_img.paste(img, (x, y))

    return composite_img

@app.route('/generate_barcode', methods=['GET'])
@cross_origin()
def generate_barcode():
    # Get the data from the query parameters
    data = request.args.get('data')
    barcode_type = request.args.get('type', 'ean13')

    if not data:
        return jsonify({"error": "Data parameter is required"}), 400

    try:
        # Choose the type of barcode
        barcode_class = barcode.get_barcode_class(barcode_type)

        # Generate 10 barcode images
        barcode_images = []
        for _ in range(10):
            barcode_obj = barcode_class(data, writer=ImageWriter())
            buffer = BytesIO()
            barcode_obj.write(buffer)
            buffer.seek(0)
            img = Image.open(buffer)
            barcode_images.append(img)

        # Create a composite image with 8 empty placeholders followed by 10 barcodes
        composite_img = create_composite_image(barcode_images)

        # Save the composite image to a BytesIO object
        buffer_with_composite = BytesIO()
        composite_img.save(buffer_with_composite, format='PNG')
        buffer_with_composite.seek(0)

        return send_file(buffer_with_composite, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)