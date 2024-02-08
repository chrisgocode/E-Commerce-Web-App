import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './components/pages/Home/Home'
import Header from './components/layout/Header/Header';


function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes for other pages here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;