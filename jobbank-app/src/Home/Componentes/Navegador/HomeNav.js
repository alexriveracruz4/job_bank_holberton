import React, { useEffect } from 'react'
import "./HomeNav.css"

/*$(document).scroll(function() {
  var $nav = $(".fixed-top");
  $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
});

$(document).scroll(function() {
  let nav = document.querySelector("fixed-top");
  nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
});*/






/*window.onscroll = function() {
  if(window.pageYOffset !== 0) {
    headertop.className = 'header-wrap fixed-top scrolled';
    
  } else {
    headertop.classList.remove('scrolled');
  }
};*/

function HomeNav() {
  useEffect(() => {
    window.onscroll = function() {
      const headertop = document.getElementById('header-top');
      
      if(window.pageYOffset !== 0) {
        headertop.className = 'header-wrap fixed-top scrolled';
        
      } else {
        headertop.classList.remove('scrolled');
      }
    };
  })
  return (
    <header className="header-wrap fixed-top scrolled" id="header-top">
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-expand-lg navbar-dark">
            <a className="navbar-brand" href="https://holberton-peru.com">
              <img src="https://holberton-peru.com/storage/media/3rXHgQvQ8LqvY4ClnG2ncJgBrnufN3NRDDRvuCFB.png" alt="logo" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHolberton"
                aria-controls="navbarHolberton" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarHolberton">
              <ul className="navbar-nav me-auto">
                <li className="nav-item dropdown multi-level">
                  <a className="nav-link dropdown-toggle " href="https://holberton-peru.com/carreras" id="navbarDropdownPrimary2"
                  role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Carrera
                    <i className="fas fa-chevron-down"></i>
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
                  <a href="https://holberton-peru.com/becas" className="nav-link " target="_self"
                  data-text="Becas">Becas</a>
                </li>
                <li className="nav-item">
                  <a href="https://holberton-peru.com/nosotros" className="nav-link " target="_self"
                  data-text="Nosotros">Nosotros</a>
                </li>
                <li className="nav-item">
                  <a href="https://holberton-peru.com/events" className="nav-link " target="_self"
                  data-text="Eventos">Eventos</a>
                </li>
                <li className="nav-item">
                  <a href="https://holberton-peru.com/contrata-holbies" className="nav-link " target="_self"
                  data-text="Contrata Holbies">Contrata Holbies</a>
      
                </li>
              </ul>
              <div className="call">
                <button data-toggle="modal" data-target="#modalAplica" className="btn btn-danger">Aplica aquí</button>
                  <a href="https://apply.holbertonschool.com/auth/sign_in?country=pe" className="btn btn-light"
                      target="_blank">Iniciar sesión</a>
<div class="btn-group">
  <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Action
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">Separated link</a>
  </div>
</div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HomeNav;
