import pandas as pd
import joblib

features = [
    "avg_temp",
    "min_temp",
    "max_temp",
    "wind_speed",
    "air_pressure",
    "elevation",
    "latitude",
    "longitude",
    "month",
    "season_code",
    "temp_range"
]

# Project root
PROJECT_ROOT = r"C:\Users\Sudheer\OneDrive\Desktop\OneDrive\Desktop\weather-forecasting"

# Load trained models
rainfall_model = joblib.load(
    PROJECT_ROOT + r"\models\random_forest_model.pkl"
)

rain_classifier = joblib.load(
    PROJECT_ROOT + r"\models\rain_classifier.pkl"
)


def predict_weather(input_data):

    input_df = pd.DataFrame(
        input_data,
        columns=features
    )

    rainfall = rainfall_model.predict(input_df)[0]

    rain_probability = rain_classifier.predict_proba(input_df)[0][1]

    if rain_probability >= 0.5:
        condition = "Rain"
    else:
        condition = "No Rain"

    return {
        "predicted_rainfall": float(rainfall),
        "rain_probability": float(rain_probability * 100),
        "weather_condition": condition
    }