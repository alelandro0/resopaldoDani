import { useState, useEffect } from 'react'
import { FaBars, FaTimes } from "react-icons/fa"
import { Link } from "react-scroll"
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
    const links = [
        {
            id: 1,
            link: "Inicio"
        },
        {
            id: 2,
            link: "Acerca de nosotros"
        },
        {
            id: 3,
            link: "Servicios"
        },
        {
            id: 4,
            link: 'Clasificaciones'
        },
        {
            id: 5,
            link: "Iniciar Sesion"
        },
        {
            id: 6,
            link: "Registrate"
        }
    ]

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
                <h1 className='text-[1.1rem] lg:text-[1.3rem] hover:text-purple-600 hover:scale-125 duration-500'>
                    <i className='bx bx-code-curly mr-2 text-base'></i>
                    MultiServicios
                </h1>
            </div>

            <ul className='hidden lg:flex'>
                {links.map(({ id, link }) => (
                    <li key={id} className='cursor-pointer hover:scale-105 rounded-lg hover:bg-purple-600  hover: p-4 duration-200 text-[1.1rem] lg:text-[1.3rem] hover:opacity-70'>
                                  {link.toLowerCase().replace(' ', '-') === 'iniciar-sesion' || link.toLowerCase().replace(' ', '-') === 'registrate' ? (
                                <RouterLink to={`/${link.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => setIsShowNav(!isShowNav)}>{link}</RouterLink>
                        ) : (
                            <Link to={link} smooth duration={500}>{link}</Link>
                        )}

                    </li>
                ))}
            </ul>

            <div onClick={() => setIsShowNav(!isShowNav)} className='cursor-pointer pr-4 z-10 text-gray-100 lg:hidden'>
                {isShowNav ? <FaTimes size={30} /> : <FaBars size={30} />}
            </div>

            {isShowNav && (
                <ul className='flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black via-black to-purple-600 opacity-90'>
                    {links.map(({ id, link }) => (
                        <li
                            key={id}
                            className='px-4 cursor-pointer py-6 text-4xl opacity-100'>
                            {link.toLowerCase().replace(' ', '-') === 'iniciar-sesion' || link.toLowerCase().replace(' ', '-') === 'registrate' ? (
                                <RouterLink to={`/${link.toLowerCase().replace(/\s+/g, '-')}`} onClick={() => setIsShowNav(!isShowNav)}>{link}</RouterLink>
                            ) : (
                                <Link
                                    onClick={() => setIsShowNav(!isShowNav)}
                                    to={link}
                                    smooth
                                    duration={500}>{link}</Link>
                            )}


                        </li>
                    ))}
                </ul>
            )}
        </header>
    )
}

export default Navbar
