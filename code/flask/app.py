import time

import cv2
from flask import Flask, request, render_template
import base64
import io
from io import BytesIO
import numpy as np
import oss2

import requests as req
from PIL import Image
from flask import Flask, request, render_template, jsonify
import tryonService
from flask_cors import CORS, cross_origin
from chatBot import chatbot

# flask web service
app = Flask(__name__, template_folder="web")
CORS(app)


@app.route('/chatbot', methods=['get'])
def getResponse():
    question = request.args.get("question")
    print(question)
    answer = chatbot.get_response(question)
    print(answer)
    response = jsonify({'ans': answer.text})
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


@app.route('/tryon', methods=['post'])
def upload():
    # step 1.
    # generate edge
    cloth0 = request.files['cloth']
    cloth = cloth0.read()
    cloth = np.frombuffer(cloth, np.uint8)
    cloth = Image.fromarray(cloth)
    cloth = cv2.imdecode(np.array(cloth), cv2.IMREAD_COLOR)

    edge = tryonService.generateEdge(cloth)
    # edge = Image.open('C:\JHU\\22sp\oose\\virtual-try-on\PF-AFN-main\PF-AFN_test\dataset\\test_edge\\000066_1.jpg')

    # receive img
    cloth_original = request.files['cloth']
    photo = request.files['photo']
    cloth_new = Image.open(cloth_original)
    photo = Image.open(photo)

    # step 2. process image
    result = tryonService.process(cloth_new, photo, Image.fromarray(edge))

    endpoint = 'http://oss-us-west-1.aliyuncs.com'  # Suppose that your bucket is in the Hangzhou region.

    auth = oss2.Auth('LTAI5t5pZETZiJEBsyXuF97q', 'jKV1Dibd2hJ3T6XsDdqFTUgfpreEm0')
    bucket = oss2.Bucket(auth, endpoint, 'stylebox')

    filename = "tryon/" + str(int(round(time.time() * 1000))) + ".jpg"
    bucket.put_object(filename, result)
    # filename = "tryon/1650524225880.jpg"
    print("https://stylebox.oss-us-west-1.aliyuncs.com/" + filename)
    response = jsonify({'tryonUrl': "https://stylebox.oss-us-west-1.aliyuncs.com/" + filename})
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


if __name__ == '__main__':
    app.jinja_env.auto_reload = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.run(debug=False, port=8081)
