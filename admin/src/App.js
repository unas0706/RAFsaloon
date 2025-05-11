// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import FranchiseList from './pages/franchises/FranchiseList';
import ViewFranchise from './pages/franchises/ViewFranchise';
import EditFranchise from './pages/franchises/EditFranchise';
import CreateFranchise from './pages/franchises/CreateFranchise';
import { FranchiseProvider } from './context/FranchiseContext';
import './styles/style.css';

const App = () => (
  <Router>
    <FranchiseProvider>
      <AuthProvider>
        <Navigation />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/franchises"
              element={
                <PrivateRoute>
                  <FranchiseList />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-franchise"
              element={
                <PrivateRoute>
                  <CreateFranchise />
                </PrivateRoute>
              }
            />
            <Route
              path="/franchise/:id"
              element={
                <PrivateRoute>
                  <ViewFranchise />
                </PrivateRoute>
              }
            />
            <Route
              path="/franchise/:id/edit"
              element={
                <PrivateRoute>
                  <EditFranchise />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </FranchiseProvider>
  </Router>
);

export default App;
