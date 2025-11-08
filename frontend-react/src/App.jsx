import React from "react";
import PredictForm from "./components/PredictForm";

function App() {
  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(90deg, #eef6fc 0%, #f0f7ff 100%)",
          minHeight: "24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 16px #ddebf7",
          paddingTop: "20px",
          paddingBottom: "10px"
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            color: "#0072ff",
            marginBottom: "16px",
            letterSpacing: "1px"
          }}
        >
          🚀 Heart Disease Prediction
        </h1>
        <p
          style={{
            fontSize: "1.15rem",
            color: "#204d74",
            marginBottom: 5,
            fontWeight: "500",
            letterSpacing: ".5px"
          }}
        >
          React Frontend Connected Successfully!
        </p>
      </div>
      <div>
        <PredictForm />
      </div>
    </>
  );
}

export default App;
