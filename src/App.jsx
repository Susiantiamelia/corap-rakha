import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Compare from "./pages/Compare";
import News from "./pages/News";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/news" element={<Compare />} />
      </Routes>
    </Router>
  );
}

export default App;
