import React from 'react';
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import ExecutiveLedger from './saas-ledger/ExecutiveLedger';
import SaaSLedger from './saas-ledger';
import AuthGate from './saas-ledger/AuthGate';

export default function App(){return <Router><Routes><Route path="/" element={<AuthGate><ExecutiveLedger/></AuthGate>}/><Route path="/legacy" element={<AuthGate><SaaSLedger/></AuthGate>}/><Route path="/ledger" element={<Navigate to="/" replace/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes></Router>}
