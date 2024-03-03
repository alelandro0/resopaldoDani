import React, { useState, useEffect } from 'react';
import { PortalLayout } from '../layout/PortalLayout';
import { API_URL } from '../Autentication/constanst';
import { useAuth } from '../Autentication/AutProvider';
type CitaData ={
  date: string;
  hora: string;
  _id: string;
  nombre: string;
  imageProfile: string;
}

const CitasCliente = () => {
  const auth= useAuth();
  const [datos, setDatos] = useState<CitaData[]>([]);


    useEffect(() => {
        const fetchCitasCliente = async () => {
            try {
                const response = await fetch(`${API_URL}/citas-usuario/${auth.getUser()?.id}`);
                const data= await response.json()
                console.log('respuesta del servidor',data);
            
                setDatos (data);
                console.log('respuesta usuario',response);
                
                
            } catch (error) {
              console.error("Error al listar:", error);  
            }
        };

        fetchCitasCliente();
    }, []);
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
        <h1 className="text-center" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '3.5rem', fontWeight: 'bold', color: '#3c3c3c' }}>
          Mis Citas
        </h1>
        <div className="row justify-content-center">
            {datos.map((cita, index) => (
              <div key={index} className="col-md-6 mt-4">
                <div className="card h-auto">
                  <h2 className='modal-header' style={{ background: '#3c3c3c' }}>Cita Programada</h2>
                  <div className="card-body">
                    <h1 className="card-title">Fecha: {formatFecha(cita.date)}</h1>
                    <h1 className="card-title">Hora: {formatHora(cita.hora)}</h1>
                    <h1 className="card-title">Profesional: {cita.nombre}</h1>
                  </div>
                </div>
              </div>
            ))}
          
        </div>
      </div>
    </PortalLayout>
    );
};

export default CitasCliente;

