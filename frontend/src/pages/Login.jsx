import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerter from "sweetalert2";

const Login = () => {
  const [credentials, setCredentials] = useState({
    password: "",
    email: "",
  });

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://sales-app-backend.onrender.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      Alerter.fire({
        title: "Failed!",
        text: "Enter valid credentials!",
        icon: "error",
        confirmButtonText: "Try again",
      });
     
    } 
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);

      localStorage.setItem("authToken", json.authToken);
       console.log(localStorage.getItem("authToken"));
      Alerter.fire({
        title: "Success!",
        text: "User Logged In Successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigate("/addsale");
      
    } else {
      Alerter.fire({
        title: "Failed!",
        text: "Login failed",
        icon: "error",
        showConfirmButton: "OK",
      });
    }
  };
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <form className="container" onSubmit={handleSubmit}>
      <h2 className="text-center fw-bolder mb-2">Login Form</h2>
      <div className="mb-3">
        <label
          htmlFor="exampleInputEmail1"
          className="form-label fw-semibold fs-6"
        >
          Email address
        </label>
        <input
          type="email"
          placeholder="Enter Your Email"
          className="form-control py-2 fw-semibold"
          aria-describedby="emailHelp"
          name="email"
          value={credentials.email}
          onChange={onChange}
        />
        <div id="emailHelp" className="form-text">
         We will never share your email.
        </div>
      </div>
      <div className="mb-3">
        <label
          htmlFor="exampleInputPassword1"
          className="form-label fw-semibold fs-6"
        >
          Password
        </label>
        <input
          type="password"
          placeholder="Atleast 5 Characters"
          className="form-control py-2 fw-semibold"
          name="password"
          value={credentials.password}
          onChange={onChange}
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn py-2 fs-5 fw-bold">
          SignIn
        </button>
        <Link to="/signup" className="m-auto mt-3">
          New User? Signup here
        </Link>
      </div>
    </form>
  );
};

export default Login;
