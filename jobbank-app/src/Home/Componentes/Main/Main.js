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
            <div className="collapse navbar-collapse" id="navbarMainHolberton">
                <ul className="navbar-nav me-auto">
                  <li class="nav-item dropdown multi-level"><a href="https://holberton-peru.com/carreras" id="navbarDropdownPrimary2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="nav-link dropdown-toggle ">Carreras
                    <i class="far fa-chevron-down"></i></a>
                  </li>
                </ul>
            </div>
          </nav>
          {/*<div className="Main-content">
            <h1>Hello</h1>
          </div>*/}
        </div>
      </div>
    </main>
  );
};

export default Main;