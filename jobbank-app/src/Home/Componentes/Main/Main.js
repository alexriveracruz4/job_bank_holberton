import "./Main.css"
import mysvg from "../images/Magnifying_glass_icon.svg"

function Main() {
  return (
    <main className="padding-main">
      <div className="text-main">
        <h1>Holberton en el Mundo</h1>
      </div>
      <div className="container padding">
        <div class="row">
          <nav class="navbar navbar-expand-lg navbar-dark">
            <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarMainHolberton">
              {/*<ul className="navbar-nav me-auto">
                  <li class="nav-item dropdown multi-level"><a href="https://holberton-peru.com/carreras" id="navbarDropdownPrimary2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="nav-link dropdown-toggle ">Carreras
                    <i class="far fa-chevron-down"></i></a>
                  </li>
                </ul>*/}
              <ul class="nav nav-filter">
                <li class="nav-item d-flex align-items-center">
                  <a href="https://apply.holbertonschool.com/auth/sign_in?country=pe" className="nav-link d-flex align-items-center mx-3 my-3" target="_blank" id="button-search">
                    <img src={mysvg} className="nav-link" href="#"/>
                  </a>
                </li>
                <li class="nav-item mx-3 my-3">
                  <a class="nav-link d-flex align-items-center" href="#">Habilidades</a>
                </li>
                <li class="nav-item mx-3 my-3">
                  <a class="nav-link d-flex align-items-center" href="#">Nivel de inglés</a>
                </li>
                <li class="nav-item mx-3 my-3">
                  <i class="far fa-heart"></i>
                  <a class="nav-link" href="#" id="fav-filter">Favoritos</a>
                </li>
              </ul>
            </div>
          </nav>
          {/*<div className="Main-content">
            <h1>Hello</h1>
          </div>*/}
        </div>
        <div className="title-buttons">
          Preguntas frecuentes sobre contratar un desarrollador
        </div>
        <div class="btn-group-vertical" role="group" aria-label="Vertical button group">
          <button type="button" class="btn btn-light">¿Cómo contratar el mejor programador?</button>
          <button type="button" class="btn btn-light">¿Dónde puedo contratar programadores?</button>
          <button type="button" class="btn btn-light">¿Cómo contactar a un programador?</button>
          <button type="button" class="btn btn-light">¿Cómo encontrar desarrolladores?</button>
          <button type="button" class="btn btn-light">¿Dónde encontrar programadores freelance?</button>
          <button type="button" class="btn btn-light">¿Qué es Holberton?</button>
        </div>
      </div>
    </main>
  );
};

export default Main;