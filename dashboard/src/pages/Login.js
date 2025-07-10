import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedin, setIsLoggesin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);

    if (loggedin || user) {
      navigate("/");
    }
  }, [loggedin]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      var loggedin = await login(email, password);
      setIsLoggesin(loggedin);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }

    // Simulate API call
    // try {
    //   let val = await AuthApi.post("/api/owners/login", { email, password });
    //   console.log(val);
    //   // jane@example.com
    //   // securePassword123
    // } catch (err) {
    //   if (err.response) {
    //     // Server responded with a status other than 2xx
    //     console.error("Error Response:", err.response.data);
    //     console.error("Status:", err.response.status);
    //   } else if (err.request) {
    //     // No response received
    //     console.error("No response from server:", err.request);
    //   } else {
    //     // Something else went wrong
    //     console.error("Error:", err.message);
    //   }
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <img src="logo.jpg" alt="Company Logo" className="logo" />
          <h1 className="login-title">Welcome Back</h1>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
