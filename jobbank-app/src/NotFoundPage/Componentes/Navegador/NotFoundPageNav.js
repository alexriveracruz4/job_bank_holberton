import React, { useEffect } from 'react'
import "./NotFoundPageNav.css"
import { useHistory } from 'react-router';


function NotFoundPageNav() {

  const history = useHistory();

  return (
    <header className="header-wrap fixed-top scrolled" id="header-top">
      <div className="container d-flex justify-content-lg-around">
        <div className="row">
          <nav className="navbar navbar-expand-lg navbar-dark">
            <a className="navbar-brand" href="https://holberton-peru.com">
              <img src="https://holberton-peru.com/storage/media/3rXHgQvQ8LqvY4ClnG2ncJgBrnufN3NRDDRvuCFB.png" alt="logo" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHolberton"
                aria-controls="navbarHolberton" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse ps-5" id="navbarHolberton">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                    <a href="https://partners.holberton-peru.com/home" className="nav-link " target="_self"
                    data-text="Home">Home</a>
                </li>
                <li className="nav-item dropdown multi-level">
                  <a className="nav-link dropdown-toggle " href="https://holberton-peru.com/carreras" id="navbarDropdownPrimary2"
                  role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Carrera
                  </a>
      
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownPrimary2">
                    <a href="https://holberton-peru.com/carreras" className="dropdown-item " target="_self">
                        General
                    </a>

                    <a href="https://holberton-peru.com/carreras/fundamentos-full-stack" className="dropdown-item " target="_self">
                        Fundamentos Full Stack
                    </a>
                
                    <a href="https://holberton-peru.com/carreras/desarrollo-web-full-stack" className="dropdown-item " target="_self">
                        Desarrollo Web Full-Stack
                    </a>
                
                    <a href="https://holberton-peru.com/carreras/machine-learning" className="dropdown-item " target="_self">
                        Machine Learning
                    </a>
                
                    <a href="https://holberton-peru.com/carreras/realidad-aumentada-realidad-virtual" className="dropdown-item " target="_self">
                        AR/VR
                    </a>

                    <a href="https://holberton-peru.com/carreras/low-level-algoritmos" className="dropdown-item " target="_self">
                        Low-Level &amp; Algoritmos
                    </a>

                    <a href="https://holberton-peru.com/carreras/front-end_Holberton%20School" className="dropdown-item " target="_self">
                        Front End
                    </a>

                    <a href="https://holberton-peru.com/carreras/back-end_Holberton%20School" className="dropdown-item " target="_self">
                        Back End
                    </a>
                  </div>
                </li>
                <li className="nav-item">
                  <a href="https://holberton-peru.com/admisiones" className="nav-link " target="_self"
                  data-text="Admisiones">Admisiones</a>
                </li>
                <li className="nav-item">
                  <a href="https://holberton-peru.com/faq" className="nav-link " target="_self"
                  data-text="FAQs">FAQs</a>
                </li>
                <li className="nav-item">
                  <a href="https://holberton-peru.com/nosotros" className="nav-link " target="_self"
                  data-text="Nosotros">Nosotros</a>
                </li>
                <li className="nav-item">
                  <a href="https://api.whatsapp.com/send/?phone=51923898366&text=Hola%2C+necesito+informaci%C3%B3n&app_absent=0" className="nav-link " target="_self"
                  data-text="Contáctanos">Contáctanos</a>
      
                </li>
              </ul>
              <div className="call">
                <div className="d-flex mx-3">
                    <div className="dropdown">
                      <button type="button" className="btn btn-secondary dropdown-toggle" id="lang"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                          data-offset="10,20">
                        <i className="fas fa-globe"></i> Español
                      </button>
                      <div className="dropdown-menu" aria-labelledby="lang">
                        <a className="dropdown-item" href="https://www.holbertonschool.com/"
                            target="_blank">English</a>
                      </div>
                    </div>
                  </div>
                  <i className="far fa-question-circle fa-lg mx-3" style={{color: "white"}}></i>
                  <i className="fas fa-user-circle fa-lg mx-3" onClick={() => history.push("/")} style={{color: "white", cursor: "pointer"}} />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NotFoundPageNav;
