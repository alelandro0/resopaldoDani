import React from 'react'
import AboutImg from '../../public/img/AboutUs.jpg'
import './StyleHome/About.css'

export const About = () => {
  return (
    <section className='Container-father-About'>
        <div className="Container-image-About">
            <img src={AboutImg} alt="" />
        </div>
        <div className="Container-text-About">
            <h1 className='h1-About'>¿Quiénes <span>somos?</span></h1>
            <p className='p-about'>El Proyecto Multiservicios nace como respuesta a la cotidiana lucha de las personas por encontrar profesionales capaces de resolver sus problemas esenciales en nuestros hogares y satisfacer sus necesidades. Conscientes de la necesidad de simplificar este proceso, nuestro equipo se empeñó en la creación de una innovadora solución. Este proyecto se enfoca en proporcionar a los usuarios una plataforma de comunicación que les permita encontrar expertos en diversas áreas y, al mismo tiempo, agendar citas y resolver consultas para mejorar su experiencia en la búsqueda de servicios.</p>
        </div>
    </section>
  )
}

export default About;
