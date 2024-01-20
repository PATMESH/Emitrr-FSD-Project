import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./LandingPage/Navbar";
import { Spin } from "antd";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const name = localStorage.getItem("name");

  const navigate = useNavigate();

  useEffect(() => {
    if (name) {
      navigate("/select");
    }
  });

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(email === ''){
      setError("Enter your email");
      setLoading(false);
      return;
    }
    if(password === ''){
      setEmail("Enter your password");
      setLoading(false);
      return;
    }
    setError(null)
    try {
      const response = await fetch(
        "https://language-learning-game-z20w.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);
        console.log(data.token);
        const userDetailsResponse = await fetch(
          `https://language-learning-game-z20w.onrender.com/user/${email}`
        );

        if (userDetailsResponse.ok) {
          const ud = await userDetailsResponse.json();
          localStorage.setItem("name", ud["username"]);
          localStorage.setItem("email", ud["email"]);
          setUser({ name: ud["name"], email: email, id: ud["id"] });

          if (ud.learnings.length > 0) {
            navigate("/mylearnings");
          } else {
            navigate("/select");
          }
        } else {
          setError("An error occurred while fetching user details.");
        }
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div>
      <Navbar />
      <div className="auth">
        <div className="imagebg"></div>
        <div className="imagebg1"></div>
        <div className="imagebg2"></div>
        <div className="imagebg3"></div>
        <div className="imagebg4"></div>
        <div className="imagebg5"></div>
        <div className="imagebg6"></div>
        <div className="login-container">
          <h3>Welcome!</h3>
          <h2>Login</h2>
          <br />
          <form autoComplete="off" className="form-group" onSubmit={login}>
            <label htmlFor="email">Email Id :</label>
            <input
              type="email"
              className="form-control"
              style={{ width: "100%", marginRight: "50px" }}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <br />
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              className="form-control"
              style={{ width: "100%" }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <br />
            <div className="btn1">
              <button type="submit" className="btn btn-success btn-md mybtn">
                LOGIN
              </button>
            </div>
          </form>
          {error ? <span className="error-msg">{error}</span> : (loading ? <Spin /> : <></>)}
          <span>
            Don't have an account? Register
            <Link to="/register"> Here</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
export default Login;
