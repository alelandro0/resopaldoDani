import { useState, useEffect } from 'react'
import { FaBars, FaTimes } from "react-icons/fa"
import { Link } from "react-scroll"
import { Link as RouterLink } from "react-router-dom";
import { Link as RouterPerfil } from "react-router-dom";
import { useAuth } from '../../../Autentication/AutProvider';

const Navbar = () => {
    const user = useAuth();
    const autentico = user.getUser();
   
    const links = autentico ? [
        { id: 1, link: "Inicio" },
        { id: 2, link: "Acerca de nosotros" },
        { id: 3, link: "Clasificaciones" },
        // Enlace al dashboard cuando el usuario está autenticado
    ] : [
        { id: 1, link: "Inicio" },
        { id: 2, link: "Acerca de nosotros" },
        { id: 3, link: "Servicios" },
        { id: 4, link: 'Clasificaciones' },
        { id: 5, link: "Iniciar Sesion" },
        { id: 6, link: "Registrate" }
    ];

    const [isShowNav, setIsShowNav] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset
            if (scrollTop > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <header className={`fixed top-0 flex bg-neutral-900/60 justify-between h-20 items-center py-4 px-4 md:px-6 text-white mx-auto lg:px-24 md:py-0 w-full z-30 transition-colors duration-700 ${isScrolled ? 'bg-black/90' : ''}`}>
            <div className='flex flex-row gap-4 items-center'>
                <h1 className='text-[1.1rem] lg:text-[1.3rem] hover:text-blue-600 hover:scale-125 duration-500'>
                    <i className='bx bx-code-curly mr-2 text-base'></i>
                    MultiServicios
                </h1>
            </div>

            <ul className='hidden lg:flex'>
                {links.map(({ id, link }) => (
                    <li key={id} className='cursor-pointer hover:scale-105 rounded-lg hover:bg-blue-600  hover: p-4 duration-200 text-[1.1rem] lg:text-[1.1rem] hover:opacity-70'>
                                  {link.toLowerCase().replace(' ', '-') === 'iniciar-sesion' || link.toLowerCase().replace(' ', '-') === 'registrate' ? (
                                <RouterLink to={`/${link.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => setIsShowNav(!isShowNav)}>{link}</RouterLink>
                        ) : (
                            <Link to={link} smooth duration={500}>{link}</Link>
                        )}

                    </li>
                ))}
                   <div className='flex items-center justify-center'>
                    <RouterPerfil to='/dashboard'>
                    <h2 style={{padding:6,fontSize:21}} className='mr-2 hover:text-blue-600'>{user.getUser()?.name}</h2>
                    </RouterPerfil>
                    <div style={{ width: '30px', height: '30px', overflow: 'hidden' }}>
                        {autentico && (
                            <img
                                src={user.getUser()?.imageProfile}
                                alt=""
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', border: '2px solid white', backgroundColor: 'white' }}
                            />
                        )}
                    </div>
                </div>
            </ul>

            <div onClick={() => setIsShowNav(!isShowNav)} className='cursor-pointer pr-4 z-10 text-gray-100 lg:hidden'>
                {isShowNav ? <FaTimes size={30} /> : <FaBars size={30} />}
            </div>

            {isShowNav && (
        <ul className='flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black via-black to-blue-600 opacity-90'>
        {links.map(({ id, link }) => (
          <li key={id} className='px-4 cursor-pointer py-6 text-xl md:text-2xl lg:text-3xl xl:text-4xl opacity-100'>
            {link.toLowerCase().replace(' ', '-') === 'iniciar-sesion' || link.toLowerCase().replace(' ', '-') === 'registrate' ? (
              <RouterLink to={`/${link.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => setIsShowNav(!isShowNav)} className="text-white hover:text-blue-600">{link}</RouterLink>
            ) : (
              <Link onClick={() => setIsShowNav(!isShowNav)} to={link} smooth duration={500} className="text-white hover:text-blue-600">{link}</Link>
            )}
          </li>
        ))}
        {autentico ? (
          <RouterPerfil to='/dashboard'>
            <h2 style={{padding: 6, fontSize: '2rem'}} className='mr-2 hover:text-blue-600 lg:text-xl xl:text-2xl'>Perfil de usuario</h2>
          </RouterPerfil>
        ) : null}
      </ul>
      

            )}
        </header>
    )
}

export default Navbar
