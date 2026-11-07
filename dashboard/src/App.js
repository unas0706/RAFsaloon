import React from 'react';
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import ExecutiveLedger from './saas-ledger/ExecutiveLedger';
import SaaSLedger from './saas-ledger';
import AuthGate from './saas-ledger/AuthGate';

<<<<<<< HEAD
const App = () => {
  return (
    <Router basename="/dashboard">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
=======
export default function App(){return <Router><Routes><Route path="/" element={<AuthGate><SaaSLedger/></AuthGate>}/><Route path="/ledger" element={<AuthGate><ExecutiveLedger/></AuthGate>}/><Route path="/legacy" element={<AuthGate><SaaSLedger/></AuthGate>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes></Router>}
>>>>>>> 53cfb02512713216b3b3e06375192c107916b6f7
