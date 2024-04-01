

const GeneralFooter = () => {
    return (
        <footer className='relative mt-auto flex flex-col items-center text-gray-300 mb-6 gap-2 md:flex-row md:justify-evenly'>
            
            <div className='flex gap-x-4 md:order-last'>
                <a className='text-4xl hover:text-primary-color hover:animate-bounce' target='_blank' href="https://github.com/diegotellezc" rel="noreferrer">
                    <i className='bx bxl-whatsapp' ></i>
                </a>

                <a className='text-4xl hover:text-blue-600 hover:animate-bounce' target='_blank' href="https://www.linkedin.com/in/diegotellezc/" rel="noreferrer">
                    <i className='bx bxl-facebook' ></i>
                </a>

                <a className='text-4xl hover:text-primary-color hover:animate-bounce' target='_blank' href="https://users-crud-bydt.netlify.app/" rel="noreferrer">
                    <i className='bx bx-question-mark' ></i>
                </a>
            </div>

            <p className='md:order-2'>• Copyright ©2024 | Derechos Reservados a Multiservicios • </p>
            <p>MultiServiciosEnAmerica@gmail.com</p>
        </footer>
    )
}

export default GeneralFooter
