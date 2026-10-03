# AI-Based Weather Forecasting and Prediction System

An AI-based weather prediction system that uses historical weather data and machine learning to predict rainfall and determine the probability of rain.

## Project Overview

This project analyzes historical weather data and uses machine learning models to predict rainfall and classify whether rain is likely.

The system provides predictions through a Flask-based web application with an interactive dashboard.

## Features

- Historical weather data analysis
- Data cleaning and preprocessing
- Feature engineering
- Exploratory Data Analysis (EDA)
- Rainfall prediction
- Rain / No-Rain classification
- Rain probability prediction
- Interactive Flask web dashboard
- Input validation
- Machine learning model integration

## Technologies Used

### Programming Languages
- Python
- HTML
- CSS
- JavaScript

### Libraries and Frameworks
- Pandas
- NumPy
- Matplotlib
- Seaborn
- Scikit-learn
- Joblib
- Flask

### Tools
- VS Code
- Jupyter Notebook
- Git
- GitHub

## Machine Learning Models

### Rainfall Prediction
Random Forest Regressor

Configuration:
- Number of trees: 100
- Maximum depth: 20
- Minimum samples per leaf: 2
- Max features: sqrt
- Random state: 42

### Rain / No-Rain Classification
Random Forest Classifier

Configuration:
- Number of trees: 100
- Maximum depth: 20
- Minimum samples per leaf: 2
- Max features: sqrt
- Class weight: balanced
- Random state: 42

## Model Performance

### Rainfall Prediction

| Metric | Score |
|---|---:|
| MAE | 4.26 |
| MSE | 111.32 |
| RMSE | 10.55 |
| R² Score | 0.4623 |

### Rain / No-Rain Classification

| Metric | Score |
|---|---:|
| Accuracy | 85.25% |
| Precision | 84.24% |
| Recall | 85.67% |
| F1 Score | 84.95% |

## Input Features

The model uses:

- Average Temperature
- Minimum Temperature
- Maximum Temperature
- Wind Speed
- Air Pressure
- Elevation
- Latitude
- Longitude
- Month
- Season Code
- Temperature Range

## Project Structure

```text
weather-forecasting/
│
├── notebooks/
│   └── 01_dataset_exploration.ipynb
│
├── src/
│   ├── app.py
│   └── predict.py
│
├── static/
│   ├── script.js
│   └── style.css
│
├── templates/
│   └── index.html
│
├── models/
│   └── trained models (not included in GitHub)
│
├── data/
│   └── dataset (not included in GitHub)
│
├── .gitignore
└── README.md