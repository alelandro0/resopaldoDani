/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Contact.css'; // Importa el archivo CSS del spinner

const Contact = () => {
    const [showSpinner, setShowSpinner] = useState(false); // Estado para controlar la visibilidad del spinner

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowSpinner(true); // Mostrar el spinner al enviar el formulario

        const formData = new FormData(event.target);

        axios.post('https://getform.io/f/raeggela', formData)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    iconColor: '#7F3FF5',
                    title: 'Gracias por contactarnos. ¡Será un placer trabajar contigo!',
                    showConfirmButton: true,
                    background: '#191a19',
                    color: '#fff',
                    confirmButtonColor: '#7F3FF5',
                    backdrop: `rgba(54, 55, 54,0.4)`
                });
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setShowSpinner(false); // Ocultar el spinner después de recibir la respuesta o el error
            });

        event.target.reset();
    };

    return (
        <section name='Contactanos' className='relative w-full md:h-screen p-4 text-white h-unset'>
            <div className='flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full'>
                <div className='pb-8 flex justify-center items-center flex-col'>
                    <h2 className='text-4xl font-bold inline border-b-4 border-blue-600 border-opacity-40 sm:text-5xl'>Contáctanos</h2>
                    <p className='py-6'>Completa el siguiente formulario para contactarnos</p>
                </div>


                <div className='flex justify-center items-center'>
                    <form onSubmit={handleSubmit} className='flex flex-col w-full md:w-1/2'>
                        <input
                            type="text"
                            name='name' placeholder='Ingresar nombre'
                            className='p-2 bg-transparent border-2 rounded-md text-white focus:outline-none focus:border-blue-600' required
                        />

                        <input
                            type="email"
                            name='email' placeholder='Ingresa correo electrónico'
                            className='my-4 p-2 bg-transparent border-2 rounded-md text-white focus:outline-none focus:border-blue-600' required
                        />

                        <textarea
                            name="message"
                            rows="10"
                            placeholder='Escriba un mensaje'
                            className='p-2 bg-transparent border-2 rounded-md text-white focus:outline-none focus:border-blue-600' required
                        ></textarea>

                        <button
                            className='text-white font-semibold bg-gradient-to-t from-blue-600  px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300'
                            disabled={showSpinner} // Deshabilitar el botón mientras se muestra el spinner
                        >
                            {showSpinner ? (
                                <div className="lds-spinner">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            ) : (
                                'Hablemos'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
