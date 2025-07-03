import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState("email"); // email | otp | reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [OTP, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const colors = {
    background: "#000",
    text: "#fff",
    secondaryText: "#b3b3b3",
    accent: "#ab7427",
  };

  const containerStyle = {
    backgroundColor: colors.background,
    color: colors.text,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  };

  const cardStyle = {
    backgroundColor: "#111",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: `0 0 10px ${colors.accent}`,
    width: "100%",
    maxWidth: "400px",
  };

  const headingStyle = {
    color: colors.text,
    marginBottom: "1rem",
    fontSize: "24px",
    textAlign: "center",
  };

  const labelStyle = {
    color: colors.secondaryText,
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "14px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: `1px solid ${colors.accent}`,
    backgroundColor: "#222",
    color: colors.text,
    marginBottom: "1rem",
  };

  const buttonStyle = {
    backgroundColor: colors.accent,
    color: "#000",
    border: "none",
    padding: "10px",
    width: "100%",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  // 1. Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:5000/api/owners/sendOTP", {
        email,
      });
      console.log(res.data);

      alert("OTP sent to your email.");
      setOTP(res.data.otp);
      setStep("otp");
    } catch (err) {
      console.error(err);
      alert("Error sending OTP");
    }
  };

  // 2. Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      if (OTP == otp)
        //   await axios.post("http://localhost:5000/api/verify-otp", { email, otp });
        //   alert("OTP verified successfully.");
        setStep("reset");
    } catch (err) {
      console.error(err);
      alert("Invalid OTP");
    }
  };

  // 3. Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/owners/reset-password", {
        email,
        newPassword,
      });
      alert("Password reset successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Failed to reset password");
    }
  };

  return (
    <div style={containerStyle}>
      <form
        onSubmit={
          step === "email"
            ? handleSendOtp
            : step === "otp"
            ? handleVerifyOtp
            : handleResetPassword
        }
        style={cardStyle}
      >
        <h2 style={headingStyle}>Forgot Password</h2>

        {step === "email" && (
          <>
            <label style={labelStyle}>Enter your email address</label>
            <input
              type="email"
              required
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <button type="submit" style={buttonStyle}>
              Send OTP
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <label style={labelStyle}>Enter the OTP sent to your email</label>
            <input
              type="text"
              required
              style={inputStyle}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit OTP"
            />
            <button type="submit" style={buttonStyle}>
              Verify OTP
            </button>
          </>
        )}

        {step === "reset" && (
          <>
            <label style={labelStyle}>Enter your new password</label>
            <input
              type="password"
              required
              style={inputStyle}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
            />
            <button type="submit" style={buttonStyle}>
              Reset Password
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
