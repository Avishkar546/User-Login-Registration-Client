// src/Register.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import {toast} from 'react-toastify';
import "./AuthForm.css";

function Register({title}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    // console.log(username, email, password);
    e.preventDefault();
    const { data } = await axios.post(
      "https://user-login-registration-with-google-sso.onrender.com/api/v1/user/register",
      { username, email, password }
    );

    console.log(data);
    
    if (data.success) {
      navigate("/login");
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };
  return (
    <div className="auth-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <form className="auth-form">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Register
        </button>
        <p className="switch-page">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
