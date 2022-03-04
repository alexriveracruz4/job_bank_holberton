import "../Main/Main.css"
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
    <main className="padding-main">
      <div classname="div-title-background" id="div-title-background">
        <p className="title-background">Holberton en el 
          <span className="mundo"> Mundo</span>
        </p>
      </div>
      <div className="container padding mt-3">
        <div class="row">
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

export default MainFavoritos;