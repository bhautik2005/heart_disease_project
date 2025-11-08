# ❤️ Heart Disease Prediction Project

This is my first Machine Learning project that predicts the likelihood of **heart disease** based on patient health parameters.  
It has two main parts:
- **Frontend** (React / JavaScript) — user interface  
- **Backend API** (Python Flask) — ML model server

---

## 🧠 Project Overview

Heart disease is one of the leading causes of death worldwide.  
This project uses a trained **Machine Learning model** to predict if a patient is likely to have heart disease based on clinical features such as age, cholesterol, resting blood pressure, etc.

The backend ML model was trained using **Scikit-learn**, and the API was built using **Flask**.  
The frontend interacts with the API to display predictions to users.

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Machine Learning | Python, scikit-learn, pandas, numpy |
| Backend API | Flask, Flask-CORS |
| Frontend | React.js (npm start) |
| Model Storage | `.pkl` file using joblib |
| Version Control | Git & GitHub |

---

## 📁 Folder Structure

heart_disease_project/
├── frontend/ # React frontend
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── ...
│
├── heart_disease_api/ # Flask backend
│ ├── app_api.py
│ ├── model.pkl
│ ├── requirements.txt
│ └── ...
│
├── .gitignore
├── README.md
└── LICENSE (MIT)



## 🚀 How to Run Locally

### 🧩 1. Clone the repository

bash
git clone https://github.com/<your-username>/heart_disease_project.git
cd heart_disease_project
🧠 2. Run the Backend (Flask API)
bash
 
cd heart_disease_api

# create virtual environment
python -m venv venv
## activate venv
## -> Windows
venv\Scripts\activate
## -> Mac/Linux
source venv/bin/activate

## install dependencies
pip install -r requirements.txt

## run backend server
python app_api.py
Server will start on:

cpp
 
http://127.0.0.1:5000
💻 3. Run the Frontend (React)
In a new terminal:

bash

cd frontend
npm install
npm start
Frontend runs on:

arduino
 
http://localhost:3000
Make sure the backend (Flask) is running before starting the frontend.

📡 API Endpoints
Method	Endpoint	Description
GET	/	Health check
POST	/predict	Predict heart disease probability

Example Request (POST /predict)
json
 
{
  "Age": 45,
  "Sex": 1,
  "ChestPainType": "ATA",
  "RestingBP": 120,
  "Cholesterol": 230,
  "FastingBS": 0,
  "RestingECG": "Normal",
  "MaxHR": 160,
  "ExerciseAngina": "N",
  "Oldpeak": 1.2,
  "ST_Slope": "Up"
}
Example Response
json
 
{
  "prediction": "No Heart Disease",
  "confidence": 0.87
}
🧩 Model Details
Algorithm Used: Logistic Regression / Random Forest (depending on training)

Dataset: Heart Disease UCI Dataset (Kaggle / UCI Repository)

Target Variable: Presence or absence of heart disease

Evaluation Metrics: Accuracy, Precision, Recall, F1-Score

The trained model is stored as model.pkl using joblib.

📷 App Preview (Optional)
You can add screenshots of your frontend here:

scss
 
![App Screenshot](https://github.com/bhautik2005/heart_disease_project/blob/71fde813e4d4ef5cd860596763cfb9809a597102/image_1.jpg))
![App Screenshot](https://github.com/bhautik2005/heart_disease_project/blob/71fde813e4d4ef5cd860596763cfb9809a597102/image.jpg))

🧰 Requirements
Backend
nginx
Copy code
Flask
Flask-CORS
pandas
numpy
scikit-learn
joblib
Frontend
nginx
Copy code
React
axios
🧑‍💻 Author
Your Name

🌐 GitHub: @bhautik2005
 
💼 LinkedIn:www.linkedin.com/in/bhautik-gondaliya-310181370

✉️ Email: gondaliyabhautik419@gmail.com


🪪 License
This project is licensed under the MIT License.

⭐ If you found this helpful, consider giving it a star on GitHub!
 ---

 
