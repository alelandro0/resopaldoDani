import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { ModalInfo } from "../../ModalInfo";
import ProjectCard from "../../ProjectCard";
import { API_URL } from "../../../Autentication/constanst";

const MyProjects = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleModalInfo = (project) => {
    setModalIsOpen(true);
    setSelectedProject(project);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    handleServicios();
  }, []);

  const handleServicios = async () => {
    try {
      const response = await fetch(`${API_URL}/publicationgetAll`);
      const data = await response.json();
      setServicios(data.publications.flat());
      setLoading(false);
    } catch (error) {
      setError("Ocurrió un error al obtener los servicios.");
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section
      name="Ser"
      className="relative w-full text-white md:h-screen h-unset"
    >
      <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
        <div className="mb-4">
          <h2 className="text-4xl font-bold inline border-b-4 border-blue-600 sm:text-5xl pb-1">
            Servicios
          </h2>
          <p className="py-6">Echa un vistazo a algunos de nuestros servicios</p>
        </div>
         
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-6">
          {servicios.length > 0 ? (
            servicios.map((project, index) => (
              <ProjectCard
              key={index}
              project={project}
              setSelectedProject={setSelectedProject}
              handleModalInfo={handleModalInfo}
          />
            ))
          ) : (
            <div>No hay servicios disponibles.</div>
          )}
        </div>

        <div className="flex justify-end mr-4">
          <Link
            to="projects"
            className="hover:underline hover:underline-offset-4 hover:text-blue-600 cursor-pointer text-blue-00 flex items-center"
          >
            Ver más servicios
            <MdOutlineKeyboardArrowRight size={20} />
          </Link>
        </div>
      </div>

      {modalIsOpen && (
        <ModalInfo SelectedProject={selectedProject} closeModal={closeModal} />
      )}
    </section>
  );
};

export default MyProjects;
