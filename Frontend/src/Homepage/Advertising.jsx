import React from 'react'
import './StyleHome/Advertising.css'
import computer from '../../public/img/computer.svg'
import star from '../../public/img/star.svg'
import innovation from '../../public/img/innovation.svg'

export const Advertising = () => {
  return (
    <section className='container-father-Advertising'>
        <div className="container-text-Advertising">
            <img className='icono-advertising' src= {computer} alt="" />
            <h1 className='h1-Advertising'>EXPERIENCIA</h1>
            <p className='p-Advertising' >Contamos con experiencia en nuestro campo. Tenemos un historial comprobado de éxito en los servicios que brindamos, contamos con los conocimientos necesarios para cumplir con las expectativas de nuestros clientes.
            </p>
        </div>
        <div className="container-text-Advertising">
            <img className='icono-advertising' src={star} alt="" />
            <h1 className='h1-Advertising'>CALIDAD Y PROFESIONALISMO</h1>
            <p className='p-Advertising' >Nos comprometemos a brindar servicios de alta calidad y mantener altos estándares de profesionalismo en todo lo que hacemos. Queremos superar lo que los clientes esperan y asegurarnos de que estén contentos con cada proyecto.
            </p>
        </div>
        <div className="container-text-Advertising">
            <img className='icono-advertising' src={innovation} alt="" />
            <h1 className='h1-Advertising'>INNOVACIÓN</h1>
            <p className='p-Advertising'>Nos mantenemos actualizados con las últimas tendencias y tecnologías en nuestro campo. Nos esforzamos por ser innovadores y creativos en nuestras soluciones.
            </p>
        </div>
    </section>
  )
}

export default Advertising;