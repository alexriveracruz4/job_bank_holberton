import "./Main.css"
import Accordion from 'react-bootstrap/Accordion'
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import apiPath from "../../../ApiPath";
import { ListStudents } from "./ListStudents";
import { ItemStudent } from "./ItemStudent";
import FiltersStudent from "./FiltersStudent";
import ReactPaginate from "react-paginate";
import { helpHttp } from "../../../helpers/helpHttp";
import Loader from "../../../helpers/Loader";
import Message from "../../../helpers/Message";


function Main() {

  let api = helpHttp();
  let limit = 6;

  let history = useHistory()

  let { search } = useLocation();
  let query = new URLSearchParams(search);

  let page = query.get("page");

  if (page === null){
    page = 1;
  }

  let skills = query.get("skills")
  let english = query.get("english")

  let PalabraClave = query.get("PalabraClave")

  const [parameters, setParameters] = useState({PalabraClave:PalabraClave, skills:skills, english:english, page: parseInt(page)});

  const creadorURLs = (parametros) =>{
    let url = ``
    let array_string = [`skills=${parametros.skills}`, `english=${parametros.english}`, `page=${parametros.page}`, `PalabraClave=${parametros.PalabraClave}`]
    let array = [parametros.skills, parametros.english, parametros.page, parametros.PalabraClave]
    let counter = 0;
    for (let element of array) {
      if (element !== null && element !== "") {
        url += array_string[counter] + "&";
      }
      counter = counter + 1;
    }
    console.log(url)
    return url.slice(0, -1);
  }

  const [students, setStudents] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [datosTotales, setDatosTotales] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

/*
  const obtenerEstudiantes = async () => {
    const data = await fetch(`${apiPath}/students?` + creadorURLs(parameters));
    const estudiantes = await data.json();
    setStudents(estudiantes.data);
  }
*/
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(JSON.parse(window.sessionStorage.getItem("favorites")));
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  /*
  useEffect(() => {
    obtenerEstudiantes();
  }, []);
  */
  const obtenerEstudiantes = async () => {
    const url = `${apiPath}/students?` + creadorURLs(parameters)
    console.log(url)
    setLoading(true);
    api.get(url).then((res) => {
      if (!res.err) {
        const students_data = res.data;
        const totalPages = res.len_filter_data;
        setDatosTotales(totalPages)
        setpageCount(Math.ceil(totalPages / limit));
        setStudents(students_data);
        setError(null)
      } 
      else {
        setStudents(null);
        setError(res);
      }
      setLoading(false);
    })
  };

  const handlePageClick = async ({selected: selectedPage}) => {
    let currentPage = selectedPage;
    parameters.page = currentPage + 1;
    let url = `/home?` + creadorURLs(parameters);
    console.log(url);
    history.push(url);
    obtenerEstudiantes();
  };

  useEffect(() => {    
    obtenerEstudiantes();
  }, []);


  

  return (
    <main className="padding-main">
      <div classname="div-title-background" id="div-title-background">
        <p className="title-background">Holberton en el 
          <span className="mundo"> Mundo</span>
        </p>
      </div>
      <div className="container padding mt-3" id="main-container">
        <div className="container-content-main">
          <div class="row">
            <FiltersStudent
              parameters={parameters}
              setParameters={setParameters}
              creadorURLs={creadorURLs}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          </div>
          
          {students &&
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              pageCount={pageCount}
              forcePage={parameters.page -1}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item "}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
              renderOnZeroPageCount={null}
            />
          }

            {datosTotales=== 1?
              <h2 className="PDTENumeroDeEstudiantes">Un resultado disponible</h2>
              :
              <h2 className="PDTENumeroDeEstudiantes">{datosTotales} resultados disponibles</h2>
            }
          {(error) && <Message/>}
          <div className="StudentsContainer">
            {loading && <Loader/>}
            
            {students &&
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
            }
          </div>
          
          {students &&
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              pageCount={pageCount}
              forcePage={parameters.page-1}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item "}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
              renderOnZeroPageCount={null}
            />
          }



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
      </div>
    </main>
  );
};

export default Main;