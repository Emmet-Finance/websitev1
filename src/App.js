import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './responsive.css';
import Homepage from './Homepage/Homepage';
import Form from './Homepage/Form';
import PrivacyPolicy from './Homepage/PrivacyPolicy';
import ScrollToTop from "react-scroll-to-top";
import React from 'react';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Form" element={<Form />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
        <ScrollToTop smooth color="#35CE8D" />
      </Router>
    </div>
  );
}

export default App;
