/* eslint-disable react/no-unescaped-entities */

import {MdOutlineKeyboardArrowRight} from 'react-icons/md'
import { Link } from "react-scroll"
import MobileSocialLinks from './MobileSocialLinks';

const Home = () => {
    return (
      <section name="Inicio" className='relative w-full md:h-screen h-unset'>

        <div className='max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 py-16 md:py-0 md:flex-row md:gap-8'>

          <div className='flex flex-col justify-center items-center h-[85%] md:h-full order-2 md:order-1 md:items-start'>
            
            <h1 className='text-4xl md:text-6xl font-bold text-white mb-2 mt-3 md:mt-0 md:mb-4 '>MultiServicios</h1>
            <h2 className='rounded-md bg-purple-600 max-w-max px-6 inline text-xl md:text-3xl lg:text-3xl font-semibold text-white  bg-opacity-20'>¡Es la solucion a la puerta de tu casa! </h2>
            <p className='text-gray-300 py-4 max-x-md text-justify'>¡Bienvenido a MultiServicios! Somos una plataforma dedicada al trabajo tanto formal como informal, ofreciendo una amplia variedad de servicios para satisfacer todas tus necesidades.</p>

            <div className='hidden desktop:flex'>
              <Link to='Acerca de nosotros' smooth duration={500} className='group text-white font-semibold w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-t from-purple-600  cursor-pointer mx-auto md:mx-0'>
                Sobre Nosotros
                <span className='group-hover:rotate-90 duration-300'><MdOutlineKeyboardArrowRight size={25} className='ml-1' /></span>
              </Link>
            </div>

            <MobileSocialLinks />
          </div>

          <div className='flex order-1  md:order-2 mt-8 md:mt-0 '>
              <img src="/images/servicio.webp" alt="My profile" className='mb-2 rounded-2xl mx-auto w-1/2 max-w-md md:max-w-sm h-[450px] object-cover md:w-[70rem] shadow-2xl shadow-purple-600' style={{ filter: 'drop-shadow(0px -4px 4px rgba(124, 58, 237, 0.5))' }} />
              {/* <img src="https://imgur.com/mebuqDk.png" alt="My profile" className='rounded-2xl mx-auto w-2/3 max-w-lg md:max-w-sm object-cover md:w-[70rem] shadow-2xl shadow-primary-color/20' style={{ filter: 'drop-shadow(0px -4px 4px rgba(0, 255, 0, 0.5))' }} /> */}
            </div>
        </div>
      </section>
    );
}

export default Home
