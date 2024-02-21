import React from 'react'
import './StyleHome/About.css'
const AboutImg = 'https://images.unsplash.com/photo-1603201667141-5a2d4c673378?q=80&w=2096&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
