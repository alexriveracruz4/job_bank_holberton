import "./HomeFooter.css";

function HomeFooter() {
  return (
    <footer className="padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <h4>Suscríbete a nuestro Newsletter</h4>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <input type="email" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="email" />
                <span className="input-group-text btn btn-danger" id="email">
                  <i className="fab fa-telegram-plane"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <h4>Información</h4>
            <ul>
              <li>
                <a href="https://holberton-peru.com/admisiones" target="_self">Admisiones</a>
              </li>
              <li>
                <a href="https://holberton-peru.com/contrata-holbies" target="_self">Contrata Holbies</a>
              </li>
              <li>
                <a href="https://holberton-peru.com/becas" target="_self">Becas</a>
              </li>
              <li>
                <a href="https://holberton-peru.com/blog" target="_self">Blog</a>
              </li>
              <li>
                <a href="https://holberton-peru.com/events" target="_self">Eventos</a>
              </li>
              <li>
                <a href="https://holberton-peru.com/faq" target="_self">Preguntas Frecuentes</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <h4>Carreras</h4>
            <ul>
              <li>
                <a href="https://holberton-peru.com/" target="_self">General</a>
              </li>
              <li>
                <a href="https://holberton-peru.com/carreras/fundamentos-full-stack" target="_self">Fundamentos</a>
              </li>
              <li>
                <a href="https://holberton-peru.com/carreras/desarrollo-web-full-stack" target="_self">Desarrollo Web Full-Stack</a>
              </li>
              <li>
                <a href="https://holberton-peru.com/carreras/machine-learning" target="_self">Machine Learning</a>
              </li>
              <li>
                <a href="https://holberton-peru.com/carreras/realidad-aumentada-realidad-virtual" target="_self">AR/VR</a>
              </li>
              <li>
                <a href="https://holberton-peru.com/carreras/low-level-algoritmos" target="_self">Low-Level &amp; Algoritmos</a>
              </li>
              <li>
                <a href="https://holberton-peru.com/carreras/front-end_Holberton%20School" target="_self">Front End</a>
              </li>
              <li>
                <a href="https://holberton-peru.com/carreras/back-end_Holberton%20School" target="_self">Back End</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6">
            <h4>Contacto</h4>
            <ul className="contact-info">
              <li>
                <a href="mailto: hola-peru@holbertonschool.com" target="_blank">
                  <i className="far fa-envelope"></i> hola-peru@holbertonschool.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/51923898366?text=Hola, necesito información" target="_blank">
                  <i className="fab fa-whatsapp"></i> (+51) 923898366
                </a>
              </li>
            </ul>
            <ul className="social-info">
              <li>
                <a href="https://www.facebook.com/holbertonPeru">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/HolbertonPeru">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/holbertonperu/">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UCOboTq3w8XTV5Qv38p_wu9A/videos">
                  <i className="fab fa-youtube"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/holbertonperu">
                  <i className="fab fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
