import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import "./AuthForm.css";

function Login({ title }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`,
        { email, password }
      );
      console.log(data);

      // toast.success('login successful! Please log in.');
      if (data.success) {
        localStorage.setItem("jwtToken", data.jwtToken);
        navigate("/");
        toast.success(data.message);

        window.parent.postMessage(
          { email: data.user.email, jwtToken: data.jwtToken },
          "*"
        );
      } else {
        toast.error(data.message);
        console.log(error);
      }
    } catch (error) {
      console.log("Error while login ", error);
      toast.error("unable to login");
    }
  };

  const googleAuth = () => {
    window.open("http://localhost:8080/auth/google/callback", "_self");
  };

  return (
    <div className="auth-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <form className="auth-form">
        <h2>Login</h2>
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
          Login
        </button>
        {/* <button onClick={googleAuth}>Login with Google</button> */}

        <p className="switch-page">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
