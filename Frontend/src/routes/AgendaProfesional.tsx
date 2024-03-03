import React, { useState, useEffect } from 'react';
import { PortalLayout } from '../layout/PortalLayout';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../Autentication/AutProvider";
import { API_URL } from "../Autentication/constanst";


type CitaData ={
    date: string;
    hora: string;
    _id: string;
    name: string;
    imageProfile: string;
}

const AgendaProfesional: React.FC = () => {
    const auth = useAuth();
    const [datos, setDatos] = useState<CitaData[]>([]);
   

    useEffect(() => {
        consultarCitas();
    }, []);

    const consultarCitas = async () => {
        try {
            const response = await fetch(`${API_URL}/agenda-profesional/${auth.getUser()?.name}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('No se pudieron cargar las citas');
            }
            const data = await response.json();
            console.log('Datos obtenidos:', data);
            const cita: CitaData = {
                date: data[0],
                hora: data[1],
                _id: data[2],
                name: data[3],
                imageProfile: data[4]
            };
    
            // Establecer el objeto de cita en el estado
            setDatos([cita]);
           
        } catch (error) {
            console.error("Error al cargar la imagen publicada:", error);  
        }
    };
    const formatHora = (hora: string) => {
        // Separar las horas y minutos
        const [hours, minutes] = hora.split(':');
        // Convertir a número
        const numHours = parseInt(hours, 10);
        // Determinar si es AM o PM
        const period = numHours >= 12 ? 'PM' : 'AM';
        // Ajustar a formato de 12 horas
        const formattedHours = numHours % 12 || 12;
        // Retornar la hora formateada
        return `${formattedHours}:${minutes} ${period}`;
    };
    
    const formatFecha = (fecha: string) => {
        // Crear objeto de fecha
        const dateObj = new Date(fecha);
        // Obtener año, mes y día
        const year = dateObj.getFullYear();
        const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
        const day = ('0' + dateObj.getDate()).slice(-2);
        // Retornar la fecha formateada
        return `${day}-${month}-${year}`;
    };

    return (
        <PortalLayout>
        <div className="container mt-5">
            <h1 className="text-center" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '3.5rem', fontWeight: 'bold', color: '#3c3c3c' }}
            >Consulta de Citas  Profesional</h1>
        
                <div className="row justify-content-center">
                    {datos.map((cita, index) => (
                        <div key={index} className="col-md-6 mt-4">
                            <div className="card">
                                 <h2 className='modal-header' style={{background:'#3c3c3c'}}>Cita Programada</h2>
                                <div className="card-body">
                                <img src={cita.imageProfile} className="card-img-top rounded-circle m-2"
                                     alt="Imagen de perfil" 
                                     style={{ width: '150px', height: '150px' }}/>
                                     <div style={{width:"100%",padding:'25px',background:'#3c3c3c',borderRadius:12,color:'white'}}>
                                    <h1 className="card-title">Fecha: {formatFecha(cita.date)}</h1>
                                    <h1 className="card-title">Hora: {formatHora(cita.hora)}</h1>
                                    <h1 className="card-title">Nombre del Cliente: {cita.name}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            
        </div>
    </PortalLayout>
    );
}

export default AgendaProfesional;
