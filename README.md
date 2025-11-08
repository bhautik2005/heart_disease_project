# Heart Disease Project

Two parts:
- `frontend/` — UI (run: `npm start`)
- `heart_disease_api/` — API (run: `python app_api.py`)

## Run locally

### Backend
```bash
cd heart_disease_api
python -m venv venv
source venv/bin/activate      # Linux/Mac
# or: venv\Scripts\activate    # Windows
pip install -r requirements.txt
python app_api.py
