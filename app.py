from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

latest_data = {
    "prediction": "MI",
    "norm": 12.5,
    "mi": 82.3,
    "sttc": 5.2
}

@app.route('/update', methods=['POST'])
def update():
    global latest_data
    latest_data = request.json
    return jsonify({"status": "ok"})

@app.route('/data')
def get_data():
    return jsonify(latest_data)

app.run(host="0.0.0.0", port=5000)