import CoverServices from './CoverServices'; 
import AvailableServices  from './AvailableServices';
import ThreeSteps from './ThreeSteps'


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
