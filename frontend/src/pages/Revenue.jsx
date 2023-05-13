import React, { useEffect, useState } from "react";
import axios from "axios";

const Revenue = () => {
  const [totalRevenue, setTotalRevenue] = useState(null);
  useEffect(() => {
    axios
      .get("https://sales-app-backend.onrender.com/revenue")
      .then((response) => setTotalRevenue(response.data.totalRevenue))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
      <h1 className="text-center fw-bolder mb-3">Today's Revenue Is:</h1>
      {totalRevenue ? (
        <h1
          className="fw-bolder"
          style={{
            color: "#fff8ea",
            backgroundColor: "#815b5b",
            width: " max-content",
            margin: "auto",
            padding: "14px",
            borderRadius: "8px",
          }}
        >
          ₹ {totalRevenue}
        </h1>
      ) : (
        <h2>Loading total revenue...</h2>
      )}
    </div>
  );
};

export default Revenue;
