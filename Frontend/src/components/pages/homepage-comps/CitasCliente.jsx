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
      <NabarMenu /> 
      <div className="relative container mx-auto mt-5 px-4 sm:px-6 lg:px-8">
        <h1 className="text-center font-bold text-3xl text-white">
          Mis Citas
        </h1>
        <div className= "grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          {Array.isArray(datos) && datos.length > 0 ? (
            datos.map((cita, index) => (
              <div key={index} className="shadow-md rounded-lg">
                <div className="bg-gray-100 p-4 rounded-t-lg ">
                  <h2 className="text-white bg-black text-lg font-bold px-4 py-2 rounded-t-lg">
                    Cita Programada
                  </h2>
                  <div className="mt-4 ">
                    <p className="font-semibold text-black">Fecha:</p>
                    <p className='text-black'>{formatFecha(cita.date)}</p>
                    <p className="font-semibold text-black">Hora:</p>
                    <p className='text-black'>{formatHora(cita.hora)}</p>
                    <p className="font-semibold text-black">Profesional:</p>
                    <p className='text-black'>{cita.nombre}</p>
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

