from flask import Flask, request, jsonify, render_template
import sys
import os

# Find the project root folder
PROJECT_ROOT = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..")
)

# Allow Python to find predict.py
sys.path.append(os.path.join(PROJECT_ROOT, "src"))

from predict import predict_weather

app = Flask(
    __name__,
    template_folder=os.path.join(PROJECT_ROOT, "templates"),
    static_folder=os.path.join(PROJECT_ROOT, "static")
)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():

    try:
        data = request.get_json()

        result = predict_weather([[
            data["avg_temp"],
            data["min_temp"],
            data["max_temp"],
            data["wind_speed"],
            data["air_pressure"],
            data["elevation"],
            data["latitude"],
            data["longitude"],
            data["month"],
            data["season_code"],
            data["temp_range"]
        ]])

        return jsonify(result)

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 400


if __name__ == "__main__":
    app.run(debug=True)