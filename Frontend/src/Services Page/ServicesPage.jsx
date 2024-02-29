import React from 'react';
import CoverServices from './CoverServices'; 
import AvailableServices  from './AvailableServices';
import ThreeSteps from './ThreeSteps'
import DefaultLayout from '../layout/DefaultLayout';

const ServicesPage = () => {
  return (
    <div>
      {/* <DefaultLayout>
      <CoverServices></CoverServices>
      </DefaultLayout> */}
      <CoverServices/>
      <AvailableServices/>
      <ThreeSteps/>
    </div>


  );
};

export default ServicesPage;
