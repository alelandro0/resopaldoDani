import { Link as ScrollLink } from "react-scroll";
import { useEffect, useState } from 'react';
import { API_URL } from '../../../Autentication/constanst';
import { ModalInfo } from '../../ModalInfo';
import { useAuth } from "../../../Autentication/AutProvider";

const AllProjects = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const auth = useAuth();
    const esAutentico = auth.esAutentico;

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${API_URL}/publicationgetAll`);
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const data = await response.json();
                setProjects(data.publications.flat().slice(0, 6));
            } catch (error) {
                console.log(error);
            }
        };

        fetchProjects();
    }, []);

    // Función para abrir el modal con el proyecto seleccionado
    const openModal = (image, description) => {
        setSelectedProject({ image, description });
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setSelectedProject(null);
    };

    return (
        <section name="Servicios" className='relative w-full text-white md:h-screen h-unset'>
            {!esAutentico && (
                <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
                    <div className='mb-4'>
                        <h2 className='text-4xl font-bold inline border-b-4 border-blue-600 sm:text-5xl  pb-1'>Todos los Servicios</h2>
                        <p className='py-6'>Servicios Ofertados.</p>
                    </div>
                    <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-8'>
                        {projects.map(({ image, description }, index) => (
                            <div key={index} className='shadow-md shadow-blue-600 rounded-lg w-full flex-shrink-0'>
                                <img
                                    loading='lazy'
                                    src={image}
                                    alt="project card"
                                    className='rounded-md h-36 w-full object-cover duration-200 hover:scale-105'
                                    onClick={() => openModal(image, description)} // Abrir el modal al hacer clic en la imagen
                                />
                                <div className='p-4'>
                                    <p className='text-sm text-justify text-white-800 font-medium'>{description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Enlace de desplazamiento */}
            {!auth.esAutentico &&   <ScrollLink
                to="Clasificaciones"
                smooth
                duration={500}
                className="absolute bottom-2 -left-full md:left-1/2 md:-translate-x-1/2 cursor-pointer hover:text-primary-color"
            >
                <i className="bx bx-chevron-down text-7xl text-blue-400 animate-bounce font hover:text-blue-600"></i>
            </ScrollLink> }
          

            {/* Modal */}
            {selectedProject && <ModalInfo SelectedProject={selectedProject} closeModal={closeModal} />}
        </section>
    );
};

export default AllProjects;
