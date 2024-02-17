
import './StyleHome/Footer.css'

const Whatsapp= "https://firebasestorage.googleapis.com/v0/b/react-firebase-upload-480ee.appspot.com/o/logo%2FWhatsapp.webp_1707655457978?alt=media&token=823531d3-58ed-43fb-8edb-e7479ba5ce4f";
const Email= "https://firebasestorage.googleapis.com/v0/b/react-firebase-upload-480ee.appspot.com/o/logo%2FEmail.webp_1707655635764?alt=media&token=b11a9abf-96ec-49dd-83de-f6218605d7c8"
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
