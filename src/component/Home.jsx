// src/Home.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Helmet from "react-helmet";
import "./AuthForm.css";
import axios from "axios";

function Home({ title }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Add withcredentials is important, because we are using session.
  const getUser = async () => {
    setUser(localStorage.getItem("jwtToken"))
  };

  useEffect(() => {
    if (!user && !localStorage.getItem("jwtToken")) {
      getUser();
    }
  }, []);

  const handleLogout = async (e) => {
    console.log("logout clicked");
    localStorage.removeItem("jwtToken");
    navigate("/login")
  };

  return (
    <div className="auth-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      {user || localStorage.getItem("jwtToken") ? (
        <div className="auth-form">
          <h2>Welcome {user?.displayName}, you are logged in!</h2>
          {user && (
            <img
              src={user?.photos[0]?.value}
              alt="profile photo"
              style={{ width: "80px", borderRadius: "50%" }}
            />
          )}

          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="auth-form">
          <h2>
            You are not logged in.
            <br /> Please login with google.
          </h2>
          <Link to="/register">
            <button>Register</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
