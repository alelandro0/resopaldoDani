// App.js


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HeaderHome } from './HeaderHome';
// @ts-ignore
import About from './About';
// @ts-ignore
import Advertising from './Advertising';
// @ts-ignore
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
