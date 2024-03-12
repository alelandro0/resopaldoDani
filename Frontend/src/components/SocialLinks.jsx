
import { FaWhatsapp, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";


const SocialLinks = () => {

    const links = [
        {
            id: 1,
            child: (
                <>
                Facebook <FaFacebook size={30} />
                </>
            ),
            href: 'https://www.linkedin.com/in/diegotellezc/',
            style: 'rounded-tr-md'
        },
        {
            id: 2,
            child: (
                <>
                Whatsapp <FaWhatsapp size={30} />
                </>
            ),
            href: 'https://github.com/diegotellezc',
            style: 'rounded-br-md',
        },
        {
            id: 3,
            child: (
                <>
                Mail <HiOutlineMail size={30} />
                </>
            ),
            href: 'MultiServiciosEnAmerica@gmail.com'
        },
        {
            id: 4,
            child: (
                <>
                Resumen <BsFillPersonLinesFill size={30} />
                </>
            ),
            href: '/FullStack_Developer_DiegoTellez.pdf',
            style: 'rounded-br-md',
            download: true
        }
    ]

    return (
        <div className="hidden desktop:flex flex-col top-[35%] left-0 fixed z-30">
            <ul>
                {
                    links.map(({id, child, href, style, download}) => (
                        <li key={id} className={"flex justify-between items-center w-40 h-14 px-4 bg-blue-600 ml-[-100px] opacity-60 duration-500 hover:rounded-md hover:ml-[-10px]" + " " + style }>
                        <a href={href} className="flex justify-between items-center w-full text-white font-semibold " download={download} target="_blank" rel="noreferrer">
                        {child}
                        </a>
                        </li>
                    ))
                }
                
            </ul>
        </div>
    );
};

export default SocialLinks;
