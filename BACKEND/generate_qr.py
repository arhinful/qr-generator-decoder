
import sys
import json
import pyqrcode
import io
from base64 import b64encode


if __name__ == "__main__":
    raw_data = sys.argv[1]
    data = eval(raw_data)
    text = data['text']
    img = pyqrcode.create(text)
    buffers = io.BytesIO()
    img.png(buffers, scale=10)
    encoded = b64encode(buffers.getvalue()).decode('ascii')
    if encoded:
        message = {'success': '1', 'image': encoded}
        print(json.dumps(message))

