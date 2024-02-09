import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; 
import Home from './components/pages/Home/Home'
import Header from './components/layout/Header/Header';
import Login from './components/pages/Login/Login';
import Checkout from './components/pages/Checkout/Checkout';
import './App.css';

/*
function App() {

  return (
    <Router>
      <div className="app">
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}
*/

function AppWithHeader() {
  let location = useLocation();

  return (
    <div className="app">
      {location.pathname !== '/login' && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* Add more routes for other pages here */}
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