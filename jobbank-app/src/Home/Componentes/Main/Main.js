import "./Main.css"
import Accordion from 'react-bootstrap/Accordion'
import mysvg from "../images/Magnifying_glass_icon.svg"

function Main() {
  return (
    <main className="padding-main">
      <div className="container padding">
        <div class="row">
          <nav class="navbar navbar-expand-lg navbar-dark">
            <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarMainHolberton">
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
        </div>
        <div className="title-buttons">
          Preguntas frecuentes sobre contratar un desarrollador
        </div>
        <div className="Accordion-FAQ">
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>¿Cómo contratar el mejor programador?</Accordion.Header>
              <Accordion.Body>
                Con Holberton podrás obtener acceso a nuestra base de graduados e incorporar
                a la persona adecuada a tu proyecto, de manera inmediata y con cero costo.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>¿Dónde puedo contratar programadores?</Accordion.Header>
              <Accordion.Body>
              En Holberton ofrecemos los mejores programadores de LATAM, listos para sumarse a tu equipo. 
              Nuestros graduados fueron entrenados en diversas habilidades técnicas y blandas y están 
              preparados para desempeñarse en distintos roles y áreas.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>¿Cómo contactar a un programador?</Accordion.Header>
              <Accordion.Body>
              Es muy sencillo. Para contactar a un programador desde nuestra plataforma, 
              solo tienes que clickear el botón “Contactar” en el perfil del candidato que 
              te haya interesado. Podrás enviarle un correo electrónico y realizarle una 
              propuesta directamente.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>¿Cómo encontrar desarrolladores?</Accordion.Header>
              <Accordion.Body>
              Nuestra plataforma te permite acceder al mejor talento y realizarles una oferta directa. 
              En su perfil podrás obtener información sobre las tecnologías que domina, su background, 
              intereses y proyectos. Puedes encontrar al candidato ideal según su ubicación, 
              habilidades o nivel de inglés.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>¿Dónde encontrar programadores freelance?</Accordion.Header>
              <Accordion.Body>
              En Holberton se encuentra disponible todo nuestro talento, listo para sumarse a tu equipo. 
              Contacta al candidato ideal para contarle tu proyecto y contrata de inmediato, 
              sin intermediarios.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>¿Qué es Holberton?</Accordion.Header>
              <Accordion.Body>
              Holberton es una escuela de programación creada en el 2016 en Silicon Valley, 
              con el propósito de insertar rápidamente a los estudiantes al mercado laboral como 
              desarrolladores full stack. Holberton, elimina las barreras económicas de acceso a 
              educación de calidad y además prepara en 9 meses (a diferencia de institutos o 
              universidades que demoran 3 a 5 años) a los alumnos para que puedan trabajar.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </main>
  );
};

export default Main;