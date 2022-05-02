import "./MainFavoritos.css"
import Accordion from 'react-bootstrap/Accordion'
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Box from "@material-ui/core/Box";
import Card from "@mui/material/Card";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import SvgIcon from '@mui/material/SvgIcon';
import LinesEllipsis from "react-lines-ellipsis";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import apiPath from "../../../ApiPath";
import { ListStudents } from "./ListStudents";
import { ItemStudent } from "./ItemStudent";
import FiltersStudent from "./FiltersStudent";


function MainFavoritos() {
  let { search } = useLocation();
  let query = new URLSearchParams(search);
  const location = useLocation();

  let page = query.get("page")
  let skills = query.get("skills")
  let english = query.get("english")
  let PalabraClave = query.get("PalabraClave")

  //

  const [parameters, setParameters] = useState({PalabraClave:PalabraClave, skills:skills, english:english, page:page});

  const [favorites, setFavorites] = useState(location.state);

  useEffect(() => {
    setFavorites(JSON.parse(window.sessionStorage.getItem("favorites")));
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);


  useEffect(() => {
    obtenerEstudiantes();
  }, [favorites]);


  let favoriteIds = '';
  if (favorites !== null) {
    favoriteIds = '&fav_students=' + favorites.toString()
  }

  const [students, setStudents] = useState([]);
  const obtenerEstudiantes = async () => {
    const data = await fetch(`${apiPath}/students/favorites?` + favoriteIds);
    const estudiantes = await data.json();
    setStudents(estudiantes.data);
  }

  return (
    <main className="padding-main-fav">
      <div classname="div-title-background-fav" id="div-title-background-fav">
        <p className="title-background">Holberton en el 
          <span className="mundo"> Mundo</span>
        </p>
      </div>
      <div className="container padding mt-3">
        <div className="container-content-main">
          <div class="row mb-4 px-1">
            <FiltersStudent
              parameters={parameters}
              setParameters={setParameters}
              setFavorites={setFavorites}
              favorites={favorites}
            />
          </div>
          <div className="StudentsContainer">
            <ListStudents>
                {students.map(student => (
                  <ItemStudent
                    key={student.student_id}
                    student={student}
                    favorites={favorites}
                    setFavorites={setFavorites}
                  />
                ))
                }
            </ListStudents> 
          </div>

          <div className="title-buttons">
            Preguntas frecuentes sobre contratar un desarrollador
          </div>
          <div className="Accordion-FAQ">
          <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>¿Qué es hire holbies?</Accordion.Header>
                <Accordion.Body>
                  Holberton tiene desarrolladores entrenados en las últimas tecnologías listos para unirse a tu equipo. 
                  Somos el mejor partner para encontrar el talento que las empresas necesitan para los equipos de tecnología. 
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>¿Cómo encontrar al talento de Holberton?</Accordion.Header>
                <Accordion.Body>
                  Acceda a talento de calidad, ahorra tiempo y dinero permitiendo que nuestro equipo busque candidatos para ti. 
                  En el perfil de cada talento podrás obtener información sobre las tecnologías que domina, su background, intereses y proyectos. 
                  Puedes encontrar al candidato ideal según su ubicación, habilidades o nivel de inglés.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>¿Por qué contratar al talento de Holberton?</Accordion.Header>
                <Accordion.Body>
                    Trabajamos arduamente para identificar el mejor talento, así tu empresa ahorra tiempo, esfuerzos y recursos para encontrarlo.
                    <li>
                      <span>Entendemos tus necesidades:</span> Te compartimos perfiles que hacen match con tu vacante.
                    </li>
                    <li>
                      <span>Acompañamos tu reclutamiento:</span> Te apoyamos en todas las etapas de búsqueda del mejor talento tech.
                    </li>
                    <li>
                      <span>Perfiles listos para trabajar:</span> Nuestro bootcamp simula un entorno laboral con cultura de trabajo ágil.
                    </li>
                    <li>
                      <span>Cero costo:</span> en todo este proceso nosotros no cobramos nada.
                    </li>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>¿Cómo contactar a un talento de Holberton?</Accordion.Header>
                <Accordion.Body>
                  Nuestra plataforma es muy amigable, 
                  para contactar a un programador solo tienes que seleccionar el botón “Contactar” 
                  en el perfil del candidato que te haya interesado. 
                  Podrás enviarle un correo electrónico y realizarle una propuesta directamente.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainFavoritos;