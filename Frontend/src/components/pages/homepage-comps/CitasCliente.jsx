import  { useState, useEffect } from 'react';
import { API_URL } from '../../../Autentication/constanst';
import { useAuth } from '../../../Autentication/AutProvider';
import NabarMenu from './NabarMenu';
import Swal from 'sweetalert2';

const CitasCliente = () => {
  const auth = useAuth();
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    fetchCitasCliente();
  }, []);

  const fetchCitasCliente = async () => {
    try {
      const response = await fetch(`${API_URL}/citas-usuario/${auth.getUser()?.id}`);
      const data = await response.json();
      console.log('respuesta del servidor', data);
      setDatos(data);
      console.log('respuesta usuario', response);
    } catch (error) {
      console.error("Error al listar:", error);
    }
  };

  const formatHora = (hora) => {
    const [hours, minutes] = hora.split(':');
    const numHours = parseInt(hours, 10);
    const period = numHours >= 12 ? 'PM' : 'AM';
    const formattedHours = numHours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  const formatFecha = (fecha) => {
    const dateObj = new Date(fecha);
    const year = dateObj.getFullYear();
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const day = ('0' + dateObj.getDate()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  const cancelarCita = async (id) => {
    try {
      const response = await fetch(`${API_URL}/cancelar-cita/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('estado de cancelacion', response);
      const data = await response.json();
      console.log('cita cancelada ', data);
      
      // Actualizar la lista de citas después de la cancelación
      await Swal.fire({
        icon: 'success',
        title: '¡Cita cancelada con exito!',
        showConfirmButton: false,
        timer: 1500
      });
      fetchCitasCliente();
    } catch (error) {
      console.log('error al cancelar la cita');
    }
  };

  return (
    <>
      <NabarMenu />
      <div className="relative container mx-auto mt-5 px-4 sm:px-6 lg:px-8">
        <h1 className="text-center font-bold text-3xl text-white">
          Mis Citas
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          {Array.isArray(datos) && datos.length > 0 ? (
            datos.map((cita, index) => (
              <div key={index} className="shadow-md rounded-lg">
                <div className="bg-gray-100 p-4 rounded-t-lg">
                  <h2 className="text-white bg-black text-lg font-bold px-4 py-2 rounded-t-lg">
                    Cita Programada
                  </h2>
                  <div className="mt-4">
                    <p className="font-semibold text-black">Fecha:</p>
                    <p className='text-black'>{formatFecha(cita.date)}</p>
                    <p className="font-semibold text-black">Hora:</p>
                    <p className='text-black'>{formatHora(cita.hora)}</p>
                    <p className="font-semibold text-black">Profesional:</p>
                    <p className='text-black'>{cita.nombre}</p>
                  </div>
                  <button onClick={() => cancelarCita(cita._id)} className='bg-black p-5 rounded-lg my-5'>Cancelar cita</button>
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
