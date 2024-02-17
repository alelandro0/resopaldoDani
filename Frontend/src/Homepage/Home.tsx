import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Footer from './Footer';
import FrontPage from './FrontPage';
import About from './About';
import Advertising from './Advertising';

const Home = () => {
  return (
    <DefaultLayout>
      <FrontPage/>
      <About/>
      <Advertising/>
      <Footer/>
    </DefaultLayout>
  );
};

export default Home;