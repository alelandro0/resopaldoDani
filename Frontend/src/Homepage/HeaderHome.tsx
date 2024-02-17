
import './StyleHome/HeaderHome.css'


export const HeaderHome = () => {
  return (
    <header className='Header-Home'>
        <nav className='Navegations-Home'>
            <a href="#">About</a>
            <a href="#">Work</a>
            <a href="#">Contact</a>
        </nav>

        <nav className='Container-Serves'>
            <a href="#" >Services</a>
            <a href="#">Professionals</a>
            <a href="#">Comments</a>
        </nav>
    </header>
    )
}

export default HeaderHome;
