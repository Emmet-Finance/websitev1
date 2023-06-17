<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage/Homepage';
import Form from './Homepage/Form';
import PrivacyPolicy from './Homepage/PrivacyPolicy';
import ScrollToTop from 'react-scroll-to-top';
import './App.css';
import './responsive.css';
=======
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import ReactGA from 'react-ga';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './responsive.css';
import Homepage from './Homepage/Homepage';
import Form from './Homepage/Form';
import PrivacyPolicy from './Homepage/PrivacyPolicy';
import ScrollToTop from "react-scroll-to-top";
import React from 'react';


// Инициализация Google Analytics
ReactGA.initialize('G-0DP30PHL61');


function usePageViews() {
  let location = useLocation();

  useEffect(() => {
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
  }, [location]);
}
>>>>>>> parent of 33cd2c3 (no google analitic)

function App() {
  usePageViews();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/form" element={<Form />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
        <ScrollToTop smooth color="#35CE8D" />
      </Router>
    </div>
  );
}

export default App;
