import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="fixed top-0 flex bg-neutral-900/60 justify-between h-20 items-center py-4 px-4 md:px-6 text-white mx-auto lg:px-24 md:py-0 w-full z-30 transition-colors duration-700">
      <div className='flex flex-row gap-4 items-center'>
        <h1 className='text-[1.1rem] lg:text-[1.3rem] hover:text-blue-600 hover:scale-125 duration-500'>
          <i className='bx bx-code-curly mr-2 text-base'></i>
          MultiServicios
        </h1>
      </div>
      <ul className='hidden lg:flex flex-row space-x-4 items-center'>
        <li className={`cursor-pointer rounded-lg p-4 duration-200 text-[1.1rem] lg:text-[1.3rem] opacity-70 ${location.pathname === '/' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}>
          <Link to="/" className='hover:text-white'>
            Inicio
          </Link>
        </li>
        <li className={`cursor-pointer rounded-lg p-4 duration-200 text-[1.1rem] lg:text-[1.3rem] opacity-70 ${location.pathname === '/iniciar-sesion' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}>
          <Link to="/iniciar-sesion" className='hover:text-white'>
            Iniciar Sesion
          </Link>
        </li>
        <li className={`cursor-pointer rounded-lg p-4 duration-200 text-[1.1rem] lg:text-[1.3rem] opacity-70 text-white ${location.pathname === '/registrate' ? 'bg-blue-600' : 'hover:bg-blue-600'}`}>
          <Link to="/registrate" className='hover:text-white'>
            Regístrate
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
