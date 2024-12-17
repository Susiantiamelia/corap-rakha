import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg py-3"
        style={{
          background: "linear-gradient(120deg, #e6f7ff, #f0f8ff)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="container">
          <Link
            className="navbar-brand fw-bold fs-4"
            to="/"
            style={{ color: "#007bff" }}
          >
            CORAP
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto mb-lg-0">
              <a
                className="nav-link"
                href="/news"
                style={{ color: "#007bff", fontWeight: "500" }}
              >
                News
              </a>
              <Link
                className="nav-link"
                to="/compare"
                style={{ color: "#007bff", fontWeight: "500" }}
              >
                Compare
              </Link>
              <Link
                className="nav-link"
                to="/"
                style={{ color: "#007bff", fontWeight: "500" }}
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
