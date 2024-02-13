import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; 
import Home from './components/pages/Home/Home'
import Header from './components/layout/Header/Header';
import Login from './components/pages/Login/Login';
import Checkout from './components/pages/Checkout/Checkout';
import ForgotPassword from './components/pages/Login/forgotPassword/forgotPassword';
import './App.css';

function AppWithHeader() {
  let location = useLocation();
  const showHeader = location.pathname !== '/login' && location.pathname !== '/forgot-password';

  return (
    <div className="app">
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWithHeader />
    </Router>
  );
}

export default App;