import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './responsive.css';
import Homepage from './Homepage/Homepage';
import Form from './Homepage/Form';
import React from 'react';
import test1 from './Homepage/test1';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Form" element={<Form />} />
          <Route path="/test1" element={<test1 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
