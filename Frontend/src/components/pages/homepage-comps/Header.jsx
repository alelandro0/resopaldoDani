// Header.jsx

import { Link } from 'react-router-dom';
import logoImage from "../../../assets/multiservicios.png";

const Header = () => {
  return (
    <header className="fixed top-0 z-30 lg:flex text-gray-100 p-4 flex items-center justify-evenly h-full w-full bg-black opacity-0.5"  style={{ height: "90px" }}>
      <div className="flex items-center space-x-4">
        <Link to="/" className='mr-3 hover:bg-purple-600'>
          <img
            src={logoImage}
            alt="Logo"
            className="m-3 h-15 max-h-16 max-w-32 "
            style={{ filter: 'invert(100%)' }}
          />
        </Link> MultiServicios
        <nav className="flex space-x-4">
          <Link to="/iniciar-sesion" className=' h-100% hover:text-purple-600'>Iniciar Sesion</Link>
        </nav>
        <nav className="flex space-x-4">
          <Link to="/Registrate" className=' h-100% hover:text-purple-600'>Regístrate</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
