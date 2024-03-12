/* eslint-disable react/no-unescaped-entities */

import { Link as ScrollLink } from 'react-scroll';

const AboutSectionAbout = () => {
    return (
        <section name="About" className='relative w-full h-screen'>

            <div className='max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 py-16 md:py-24 lg:py-0 lg:flex-row lg:gap-8'>
                
                {/* <div className='flex mt-8 md:mt-0'>
                    <img src="/images/diego-videospage.webp" alt="My profile" className='rounded-2xl mx-auto w-2/3 max-w-lg md:max-w-sm object-cover md:w-[70rem] shadow-2xl shadow-purple-600' style={{ filter: 'drop-shadow(rgba(139, 92, 246, 0.5))' }} />
                </div> */}

                <div className='flex flex-col justify-center items-center h-[85%] md:h-full'>
                    
                    <h1 className='text-4xl md:text-5xl font-bold text-white mb-2 md:mb-4'>Quienes somos?</h1>

                    <div className='flex items-center bg-blue-600 rounded-md py-2 px-4'>
                    </div>
                    
                    <p className='text-md md:text-lg text-gray-300 py-4 max-x-md text-justify'>En MultiServicios, nos dedicamos a ofrecer una plataforma integral para el trabajo tanto formal como informal. Nuestro objetivo es conectar a personas que buscan servicios con profesionales capacitados en una amplia gama de áreas, desde mantenimiento del hogar hasta servicios profesionales especializados.</p>

                    <p className='text-md md:text-lg text-gray-300 max-x-md text-justify'>Únase a nuestro equipo MultiServicios y podras ver cómo estamos transformando el mundo laboral,</p>
                </div>
            </div>

            <ScrollLink to="Edition" smooth duration={500} className='absolute bottom-2 -left-full md:left-1/2 md:-translate-x-1/2 cursor-pointer hover:text-primary-color'>
                <i className='bx bx-chevron-down text-7xl text-gray-400 animate-bounce font hover:text-blue-600'></i>
            </ScrollLink>
        </section>
    );
}

export default AboutSectionAbout
