import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import Alerter from "sweetalert2";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Alerter.fire({
      title: "Success!",
      text: "Are you sure you want to logout ?",
      icon: "warning",
      confirmButtonText: "Yes",
    });
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    // console.log("clicked logout");
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg fw-semibold">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          SalesApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!localStorage.getItem("authToken") ? (
              <>
                <NavLink to="/login" className="nav-item">
                  <div className="nav-link me-3">Login</div>
                </NavLink>
                <NavLink to="/signup" className="nav-item">
                  <div className="nav-link me-3">Register</div>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/addsale" className="nav-item">
                  <div className="nav-link me-3">Add Sales</div>
                </NavLink>
                <NavLink to="/top-five" className="nav-item">
                  <div className="nav-link me-3">Top 5 Sales</div>
                </NavLink>
                <NavLink to="/revenue" className="nav-item">
                  <div className="nav-link me-3">Total Revenue</div>
                </NavLink>
                <NavLink
                  onClick={handleLogout}
                  className="nav-item"
                  style={{
                    position: "absolute",
                    right: "10px",
                    paddingLeft: "15px",
                  }}
                  to="/"
                >
                  <div className="nav-link me-3">Logout</div>
                </NavLink>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
