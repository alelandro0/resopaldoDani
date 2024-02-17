// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HeaderHome } from './HeaderHome';
import About from './About';
import Advertising from './Advertising';
import Footer from './Footer';

function FooterFather() {
  return (
    <Router>
      <HeaderHome />
      <Routes>
        <Route path="/nosotros" element={<About />} />
        <Route path="/elegirnos" element={<Advertising />} />
        <Route path="/contactanos" element={<Footer />} />
      </Routes>
    </Router>
  );
}

export default FooterFather;
