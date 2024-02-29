/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-prototype-builtins */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Estilos por defecto
import { PortalLayout } from "../layout/PortalLayout";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../Autentication/AutProvider";
import  "./agendar.css";

type allUserPost = {
    _id: string;
    name: string;
};

const AgendarCita = () => {
    const auth = useAuth();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selectedUserId, setSelectedUserId] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        nombre: '',
        date: new Date(), // Inicializa con la fecha actual
        hora:'',
        description: '',
        userId: '',
        estado: 'pendiente'
    });
    const [usuarios, setUsuarios] = useState<allUserPost[]>([]);

    const horasDisponibles = [
        '09:00 am', '10:00 am', '11:00 am', '12:00 pm', '13:00 pm', '14:00 pm', '15:00 pm', '16:00 pm', '17:00 pm'
    ];
    const handleChangehora = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedUserId = e.target.value;
        setFormData({ ...formData, title: selectedUserId });
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, description: e.target.value });
    };

    const handleDateChange = (date: Date) => {
        setFormData({ ...formData, date });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.title || !formData.description || !formData.date || !formData.hora) {
            console.error('Por favor complete todos los campos');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/citas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });


            if (!response.ok) {
                throw new Error(`Error al enviar los datos: ${response.status}`);
            }

            const data = await response.json();
            console.log('Cita creada:', data);
        } catch (error) {
            console.error('Error:', (error as Error).message);
        }
    };


    const getUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/getUser', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.getAccessToken()}`,
                },
            });
            console.log(response, 'este es reponse ');

            if (!response.ok) {
                throw new Error('Error al obtener los usuarios');
            }

            const data: allUserPost[] = await response.json();
            console.log(data);
            setUsuarios(data);
        } catch (error) {
            if (error && typeof error === 'object' && error.hasOwnProperty('message')) {
                console.error('Error obteniendo usuarios:', (error as Error).message);
            } else {
                console.error('Error obteniendo usuarios:', error);
            }


        }
    };

    useEffect(() => {
        getUsers();
    }, []);
    const cancelarCita = async () => {
        try {
            
          const response = await fetch(`http://localhost:5000/api/cancelar-cita/${selectedUserId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth.getAccessToken()}`,
            },
            body: JSON.stringify({ title: formData.title }), // Asegúrate de enviar el título correcto
          });
    
          if (!response.ok) {
            throw new Error('Error al cancelar la cita');
          }
    
          const data = await response.json();
          console.log('Cita cancelada:', data);
        } catch (error) {
          console.error('Error al cancelar la cita:', error);
        }
      };

    return (
        <PortalLayout>
            <div className='container mt-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-body'>
                                <h2 className='card-title text-center mb-4'>Agendar Cita</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className='form-group py-2'>
                                        <label htmlFor='title' className='form-label'>Nombre</label>
                                        <select
                                            id='title'
                                            className='form-control'
                                            name='title'
                                            value={formData.title}
                                            onChange={handleChange}
                                        >
                                            <option value='' disabled>Seleccione un nombre</option>
                                            {usuarios.map((usuario) => (
                                            
                                                <option key={usuario._id} value={usuario.name}>{usuario.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='form-group py-2'>
                                        <label htmlFor='hora'>Hora</label>
                                        <select
                                            id='hora'
                                            className='form-control'
                                            name='hora'
                                            value={formData.hora}
                                            onChange={handleChangehora}
                                        >
                                            <option value='' disabled>Seleccione una hora</option>
                                            {horasDisponibles.map((hora, index) => (
                                                <option key={index} value={hora}>{hora}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className='form-group d-flex flex-column py-2'>
                                        <label htmlFor='date'>Fecha</label>
                                        <DatePicker
                                            id='date'
                                            className='form-control'
                                            selected={formData.date}
                                            onChange={handleDateChange}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='description'>Descripción</label>
                                        <textarea
                                            id='description'
                                            className='form-control'
                                            name='description'
                                            value={formData.description}
                                            onChange={handleTextareaChange}
                                        ></textarea>
                                    </div>
                                    <div className='form-group text-center'>
                                        <button className='btn btn-primary my-4' type='submit'>Agendar Cita</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='eliminar btn btn-danger' onClick={cancelarCita}>Cancelar</button>
            </div>
        </PortalLayout>
    );
};

export default AgendarCita;
