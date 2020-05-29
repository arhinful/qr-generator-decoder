
from pyzbar.pyzbar import decode
import cv2
import json


if __name__ == "__main__":
    video = cv2.VideoCapture(0)
    while True:
        check, frame = video.read()

        result = decode(frame)
        if result:
            result = result[0]
            data = result[0]
            data = data.decode('utf-8')
            _type = result[1]
            rect = result[2]

            message = {
                'text': data,
                '_type': _type,
                'rect': {
                    'left': rect[0],
                    'top': rect[1],
                    'width': rect[2],
                    'height': rect[3]
                },
            }
            print(json.dumps(message))
            break

        cv2.imshow('Capturing', frame)
        key = cv2.waitKey(1)
        if key == ord('q'):
            break
    cv2.destroyAllWindows()




