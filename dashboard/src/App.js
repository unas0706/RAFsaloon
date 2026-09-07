import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SaaSLedger from "./saas-ledger";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => <Router><Routes>
  <Route path="/" element={<SaaSLedger />} />
  <Route path="/ledger" element={<SaaSLedger />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
</Routes></Router>;
export default App;
