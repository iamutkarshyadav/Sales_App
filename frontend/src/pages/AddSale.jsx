import React, { useState } from "react";
import Alerter from "sweetalert2";
import "./Pages.css";

const AddSale = () => {
  const [salesData, setSalesData] = useState({
    productName: "",
    quantity: "",
    amount: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { productName, quantity, amount } = salesData;
    try {
      await fetch("https://sales-app-backend.onrender.com/addsale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        body: JSON.stringify({ productName, quantity, amount }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            alert("User Not Registered");
          }
        })
        .then((found) => {
          console.log(found);
          Alerter.fire({
            title: "Success!",
            text: "Sales Added Successfully",
            icon: "success",
            confirmButtonText: "Add More!",
          });
        })
        .catch((err) => {
          if (err) {
            Alerter.fire({
              title: "error!",
              text: "User Not Register.",
              icon: "error",
              confirmButtonText: "OK",
            });
          } else {
            Alerter.fire({
              title: "error!",
              text: "Server Not Responding/Connection Error.",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        });
      setSalesData({ productName: "", quantity: "", amount: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event) => {
    setSalesData({
      ...salesData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <form className="registration container" onSubmit={handleSubmit}>
        <h1 className="text-center fw-bolder mb-3">Add Sale Entry</h1>
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label fw-semibold fs-6"
          >
            Product Name
          </label>
          <input
            type="text"
            className="form-control py-2 fw-semibold"
            placeholder="Enter Product Name"
            name="productName"
            value={salesData.productName}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label fw-semibold fs-6"
          >
            Quantity
          </label>
          <input
            type="number"
            className="form-control py-2 fw-semibold"
            placeholder="Enter Qauntity of Product"
            name="quantity"
            value={salesData.quantity}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label fw-semibold fs-6"
          >
            Amount
          </label>
          <input
            type="number"
            className="form-control py-2 fw-semibold"
            placeholder="Enter the amount"
            name="amount"
            value={salesData.amount}
            onChange={onChange}
            required
          />
        </div>
        <div className="d-grid">
          <button
            className="btn py-2 fs-5 fw-bold"
            type="submit"
            value="Submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSale;
