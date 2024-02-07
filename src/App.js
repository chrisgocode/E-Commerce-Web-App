import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Notice "Routes" instead of "Switch"
import Home from './components/pages/Home/Home'
import Header from './components/layout/header/Header';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/" element={<Home />} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;