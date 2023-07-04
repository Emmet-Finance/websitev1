import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage/Homepage';
import Form from './Homepage/Form';
import PrivacyPolicy from './Homepage/PrivacyPolicy';
import ScrollToTop from 'react-scroll-to-top';
import './App.css';
import './responsive.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmmetBridge2 from './Homepage/EmmetBridge2';
import TransactionDetails from './Homepage/TransactionDetails';


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/form" element={<Form />} />
          <Route path="/emmetbridge2" element={<EmmetBridge2 />} />
          <Route path="/transactiondetails" element={<TransactionDetails />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
        <ScrollToTop smooth color="#35CE8D" />
      </Router>
    </div>
  );
}

export default App;
