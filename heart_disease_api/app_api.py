# app_api.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import traceback

app = Flask(__name__)
CORS(app)  # allow cross-origin requests from your React dev server

# Load model artifacts once at startup
MODEL_PATH = "model_files/heart_disease_model.pkl"
SCALER_PATH = "model_files/scaler.pkl"
COLUMNS_PATH = "model_files/columns.pkl"

model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)
loaded_columns = joblib.load(COLUMNS_PATH)

# Ensure we do not include target column if present
train_columns = [c for c in loaded_columns if c != 'HeartDisease']

NUMERICAL_COLS = ['Age','RestingBP','Cholesterol','FastingBS','MaxHR']

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        payload = request.get_json()
        if not payload:
            return jsonify({"error": "No JSON body provided"}), 400

        # expected fields (example set) - adapt if your column names differ
        expected_fields = ["Age","Sex","ChestPainType","RestingBP","Cholesterol",
                           "FastingBS","RestingECG","MaxHR","ExerciseAngina",
                           "Oldpeak","ST_Slope"]

        # Build DataFrame from payload. Support both nested JSON and form-like JSON.
        # If payload is a list, take first element
        if isinstance(payload, list):
            payload = payload[0]

        # Basic validation: make sure required fields exist
        missing = [f for f in expected_fields if f not in payload]
        if missing:
            return jsonify({"error": f"Missing fields: {missing}"}), 400

        # Create DataFrame (single row)
        df = pd.DataFrame({k: [payload[k]] for k in expected_fields})

        # Convert types for numeric fields if necessary
        for col in ["Age","RestingBP","Cholesterol","FastingBS","MaxHR"]:
            df[col] = pd.to_numeric(df[col], errors='coerce')

        df['Oldpeak'] = pd.to_numeric(df['Oldpeak'], errors='coerce')

        # One-hot encode categorical features with same approach as training (drop_first=True)
        df_encoded = pd.get_dummies(df, drop_first=True)

        # Make sure all training columns are present
        for col in train_columns:
            if col not in df_encoded.columns:
                df_encoded[col] = 0

        # Reorder to match training columns
        df_encoded = df_encoded[train_columns]

        # Scale numerical columns (scaler expects 2D array)
        # If scaler was fit only on numeric columns, isolate and transform; otherwise,
        # scaler.transform on the appropriate numeric slice
        df_encoded[NUMERICAL_COLS] = scaler.transform(df_encoded[NUMERICAL_COLS])

        # Predict
        pred = model.predict(df_encoded)[0]
        proba = None
        if hasattr(model, "predict_proba"):
            proba = model.predict_proba(df_encoded).tolist()[0]  # as list

        result = {
            "prediction": int(pred),
            "label_text": "High risk of Heart Disease" if int(pred)==1 else "Low risk of Heart Disease",
            "probabilities": proba
        }
        
        return jsonify(result), 200

    except Exception as e:
        # helpful debug info during development
        traceback_str = traceback.format_exc()
        return jsonify({"error": "Server error", "details": str(e), "trace": traceback_str}), 500

if __name__ == "__main__":
    # For development only. Use gunicorn in production.
    app.run(host="0.0.0.0", port=5000, debug=True)
