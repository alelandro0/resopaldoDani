
import './StyleHome/About.css'

const AboutImg ="https://firebasestorage.googleapis.com/v0/b/react-firebase-upload-480ee.appspot.com/o/logo%2FAboutUs.jpg_1707662367522?alt=media&token=2f2bda0d-892f-481c-9bc8-5909598e3750"
export const About = () => {
  return (
    <section className='Container-father-About'>
        <div className="Container-image-About">
            <img src={AboutImg} alt="" />
        </div>
        <div className="Container-text-About">
            <h1 className='h1-About'>ABOUT <span>US</span></h1>
            <p className='p-about'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae obcaecati sint nulla omnis, laborum libero nihil illum accusantium ratione officiis animi minus alias doloribus velit ad culpa numquam, aut laudantium?
            Ab at fuga quas, rerum exercitationem deleniti similique officiis eveniet perspiciatis obcaecati, enim quam reiciendis maxime facere provident tempore omnis, iusto ut iste voluptatem! Fugit minima fugiat inventore ipsam magni.
            Minus quis temporibus laborum nesciunt iure impedit magnam placeat fugiat ducimus reprehenderit hic, nostrum cum fugit voluptate a, dolore quidem totam? Ea fugit debitis doloribus excepturi tempora. Eaque, excepturi beatae.
            Provident optio fuga deserunt facilis incidunt debitis maxime nam vel voluptatem? Placeat repellendus blanditiis culpa, modi deleniti commodi in fugiat suscipit corrupti, architecto impedit mollitia officia fuga quis omnis a.
            Quae animi quisquam eligendi, deleniti tempore illo. Et rem voluptates ipsam velit alias magnam culpa esse consequatur, deleniti, quas qui modi natus delectus eos, magni adipisci doloribus exercitationem labore pariatur!</p>
        </div>
    </section>
  )
}

export default About;
