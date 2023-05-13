import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerter from "sweetalert2";

const Register = () => {
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://sales-app-backend.onrender.com/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: credentials.firstName,
          lastName: credentials.lastName,
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    Alerter.fire({
      title: "Success!",
      text: "User Registered Successfully",
      icon: "success",
      confirmButtonText: "Login",
      
    });
  

     const json = await response.json();
     console.log(json);
    if (json.success) {
     navigate("/login")
    } else {
      Alerter.fire({
        title: "Registration failed!",
        text: "Invalid Credentials",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  const onChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <form className="container register" onSubmit={handleSubmit}>
      <h2 className="text-center fw-bolder mb-2">Registration Form</h2>
      <div className="mb-3">
        <label
          htmlFor="exampleFormControlInput1"
          className="form-label fw-semibold fs-6"
        >
          First Name
        </label>
        <input
          type="text"
          className="form-control py-2 fw-semibold"
          placeholder="First Name"
          name="firstName"
          value={credentials.firstName}
          onChange={onChange}
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="exampleFormControlInput1"
          className="form-label fw-semibold fs-6"
        >
          Last Name
        </label>
        <input
          type="text"
          className="form-control py-2 fw-semibold"
          placeholder="Last Name"
          name="lastName"
          value={credentials.lastName}
          onChange={onChange}
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="exampleFormControlInput1"
          className="form-label fw-semibold fs-6"
        >
          Email
        </label>
        <input
          type="email"
          className="form-control py-2 fw-semibold"
          placeholder="Enter Email ID"
          name="email"
          value={credentials.email}
          onChange={onChange}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="exampleFormControlInput1"
          className="form-label fw-semibold fs-6"
        >
          Password 
        </label>
        <input
          type="password"
          className="form-control py-2 fw-semibold"
          placeholder="Password Must be of Atleast 5 Characters"
          name="password"
          value={credentials.passwords}
          onChange={onChange}
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn py-2 fs-5 fw-bold">
          Signup
        </button>
        <Link to="/login" className="m-auto mt-2">
          Already a user? Login here
        </Link>
      </div>
    </form>
  );
};

export default Register;
