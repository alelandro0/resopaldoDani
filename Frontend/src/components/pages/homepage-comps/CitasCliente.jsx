import  { useState, useEffect } from 'react';
import { API_URL } from '../../../Autentication/constanst';
import { useAuth } from '../../../Autentication/AutProvider';
import NabarMenu from './NabarMenu';



const CitasCliente = () => {
  const auth= useAuth();
  const [datos, setDatos] = useState([]);


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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const formatHora = (hora) => {
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
  
  const formatFecha = (fecha) => {
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
    <>
     <NabarMenu/>
      <div className="container mt-5">
        <h1 className="text-center" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '3.5rem', fontWeight: 'bold', color: '#3c3c3c' }}>
          Mis Citas
        </h1>
        <div className="row justify-content-center">
          {Array.isArray(datos) && datos.length > 0 ? (
            datos.map((cita, index) => (
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
            ))
          ) : (
            <div className="col-md-6 mt-4">
              <p>No hay citas pendientes</p>
            </div>
          )}
        </div>
      </div>
    </>
    );
};

export default CitasCliente;

