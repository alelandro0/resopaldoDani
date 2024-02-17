import React from 'react';
import './StyleHome/Footer.css'
import Whatsapp from '../../public/img/Whatsapp.webp'
import Email from '../../public/img/Email.webp'

const Footer = () => {
  return (
    <footer>
      <div className="container-footer">
        <hr />
        
        <div className="info">
          <div className="copyrigth">
            <p>&copy; MULTISERVICIOS COMPANY</p>
          </div>
          <div className="social">
            <div className="media">
              <a href="https://wa.me/573207385815"><img src={Whatsapp} className="redes" /></a>
              <a href="danielasanchezo2000@gmail.com"><img src= {Email}  className="redes" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
