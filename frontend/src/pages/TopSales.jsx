import React, { useEffect, useState } from "react";

const TopSales = () => {
  const [sales, setSales] = useState([]);
  const getTopFive = () => {
    fetch("https://sales-app-backend.onrender.com/top-five", {
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem("authToken") },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            console.log("Some error occured while fetching Top 5 Sales")
          );
        }
        return response.json();
      })
      .then((data) => setSales(data.sales))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getTopFive();
  }, []);

  return (
    <>
      <h2 className="text-center fw-bolder mt-3">TOP 5 SALES</h2>
      <div className=" top-sales container mt-2">
        <div className="table-responsive">
          <table className="table mt-1 table-hover table-bordered fw-semibold">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Sales ID:</th>
                <th scope="col">Product Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Sale Amount</th>
              </tr>
            </thead>
            <tbody>
              {sales &&
                sales.map((sales, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{sales._id}</td>
                    <td>{sales.productName}</td>
                    <td>{sales.quantity}</td>
                    <td>₹ {sales.amount}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TopSales;
