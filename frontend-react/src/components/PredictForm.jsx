import React, { useState } from "react";
import axios from "axios";

const initialState = {
  Age: 50,
  Sex: "M",
  ChestPainType: "ATA",
  RestingBP: 120,
  Cholesterol: 200,
  FastingBS: 0,
  RestingECG: "Normal",
  MaxHR: 150,
  ExerciseAngina: "N",
  Oldpeak: 0.5,
  ST_Slope: "Up"
};

const labelStyle = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "16px",
  fontWeight: "500"
};

const inputStyle = {
  marginTop: "6px",
  padding: "8px",
  border: "1px solid #bbb",
  borderRadius: "5px",
  fontSize: "16px"
};

const selectStyle = {
  ...inputStyle,
  background: "#f9f9f9"
};

const buttonStyle = {
  padding: "12px 32px",
  marginTop: "18px",
  fontSize: "16px",
  fontWeight: "bold",
  color: "#fff",
  background: "linear-gradient(90deg,#0072ff 0%,#00c6ff 100%)",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "background 0.2s"
};
const cardStyle = {
  boxShadow: "0 2px 12px #bbb5",
  borderRadius: "12px",
  maxWidth: "600px",
  margin: "40px auto",
  padding: "28px 32px",
  border: "1px solid #e4e4e4",
  background: "#fff"
};

export default function PredictForm() {
  const [form, setForm] = useState(initialState);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const resp = await axios.post("http://127.0.0.1:5000/api/predict", form, {
        headers: { "Content-Type": "application/json" }
      });
      setResult(resp.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ textAlign: "center", marginBottom: 28, color: "#0072ff" }}>Heart Disease Prediction</h2>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Age:
          <input style={inputStyle} name="Age" value={form.Age} onChange={handleChange} type="number" />
        </label>
        <label style={labelStyle}>Sex:
          <select style={selectStyle} name="Sex" value={form.Sex} onChange={handleChange}>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </label>
        <label style={labelStyle}>Chest Pain:
          <select style={selectStyle} name="ChestPainType" value={form.ChestPainType} onChange={handleChange}>
            <option value="ATA">ATA</option>
            <option value="NAP">NAP</option>
            <option value="ASY">ASY</option>
            <option value="TA">TA</option>
          </select>
        </label>
        <label style={labelStyle}>RestingBP:
          <input style={inputStyle} name="RestingBP" value={form.RestingBP} onChange={handleChange} type="number" />
        </label>
        <label style={labelStyle}>Cholesterol:
          <input style={inputStyle} name="Cholesterol" value={form.Cholesterol} onChange={handleChange} type="number" />
        </label>
        <label style={labelStyle}>FastingBS:
          <select style={selectStyle} name="FastingBS" value={form.FastingBS} onChange={handleChange}>
            <option value={0}>0</option>
            <option value={1}>1</option>
          </select>
        </label>
        <label style={labelStyle}>RestingECG:
          <select style={selectStyle} name="RestingECG" value={form.RestingECG} onChange={handleChange}>
            <option value="Normal">Normal</option>
            <option value="ST">ST</option>
            <option value="LVH">LVH</option>
          </select>
        </label>
        <label style={labelStyle}>MaxHR:
          <input style={inputStyle} name="MaxHR" value={form.MaxHR} onChange={handleChange} type="number" />
        </label>
        <label style={labelStyle}>ExerciseAngina:
          <select style={selectStyle} name="ExerciseAngina" value={form.ExerciseAngina} onChange={handleChange}>
            <option value="N">No</option>
            <option value="Y">Yes</option>
          </select>
        </label>
        <label style={labelStyle}>Oldpeak:
          <input style={inputStyle} name="Oldpeak" step="0.1" value={form.Oldpeak} onChange={handleChange} type="number" />
        </label>
        <label style={labelStyle}>ST_Slope:
          <select style={selectStyle} name="ST_Slope" value={form.ST_Slope} onChange={handleChange}>
            <option value="Up">Up</option>
            <option value="Flat">Flat</option>
            <option value="Down">Down</option>
          </select>
        </label>
        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {error &&
        <div style={{ color: "#e00", background: "#ffeaea", borderRadius: 6, padding: "12px 20px", marginTop: 18}}>
          Error: {error}
        </div>
      }

      {result && (
        <div style={{
          marginTop: 30,
          borderRadius: "8px",
          background: "#f3fbff",
          border: "1px solid #d1eaff",
          padding: "16px 20px",
          textAlign: "center"
        }}>
          <h3 style={{color:"#0072ff"}}>Result</h3>
          <p style={{fontSize:"20px", fontWeight:"bold"}}>{result.label_text}</p>
          <p style={{fontSize:"15px"}}>Raw prediction: {result.prediction}</p>
          {result.probabilities && <p style={{wordBreak: "break-all"}}>Probabilities: {
          JSON.stringify(result.probabilities)}
          </p>}
        </div>
      )}
    </div>
  );
}
