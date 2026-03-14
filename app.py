from flask import Flask, render_template, jsonify
from flask_cors import CORS
import random
import json

app = Flask(__name__)
CORS(app)

# Live farm data
sensors = {"temp": 28.4, "humidity": 65, "moisture": 14.2, "risk": 12, "profit": 12400}
market = {"current": 25, "predicted": 32, "quantity": 400}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/sensors')
def api_sensors():
    sensors["temp"] += random.uniform(-0.5, 0.5)
    sensors["humidity"] += random.uniform(-1, 1)
    return jsonify(sensors)

@app.route('/api/market')
def api_market():
    return jsonify(market)

@app.route('/api/alerts')
def api_alerts():
    return jsonify([
        {"id": 1, "msg": "High Humidity! Ventilate", "time": "2min ago"},
        {"id": 2, "msg": "Temp OK", "time": "5min ago"}
    ])

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
