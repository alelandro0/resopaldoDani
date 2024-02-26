
import DefaultLayout from '../layout/DefaultLayout';
// @ts-ignore
import Footer from './Footer';
// @ts-ignore
import FrontPage from './FrontPage';
// @ts-ignore
import About from './About';
// @ts-ignore
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