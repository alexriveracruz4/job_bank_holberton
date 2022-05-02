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
  let limit = 10; //Change in the back-end part also "job_bank_holberton/jobbank-api/v1/views/students.py" in the get_students() function 

  let history = useHistory()

  let { search } = useLocation();
  
  let query = new URLSearchParams(search);

  let page = query.get("page");

  if (page === null){
    page = 1;
  }

  console.log('search');
  console.log(search);
  let skills = query.get("skills")
  console.log('SKILLS');
  console.log(skills);
  let english = query.get("english")

  let PalabraClave = query.get("PalabraClave")

  const [parameters, setParameters] = useState({PalabraClave:PalabraClave, skills:skills, english:english, page: parseInt(page)});

  const creadorURLs = (parametros) =>{
    let url = ``
    let array_string = [`skills=${encodeURIComponent(parametros.skills)}`, `english=${parametros.english}`, `page=${parametros.page}`, `PalabraClave=${parametros.PalabraClave}`]
    // Importante agregar el encodeURIComponent() para el reconocimiento de caracteres especiales como + y #, para los casos de C++ Y c#
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
    history.push(url);
    window.scrollTo(0, 0);
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
          <div class="row px-1">
            <FiltersStudent
              parameters={parameters}
              setParameters={setParameters}
              creadorURLs={creadorURLs}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          </div>
          
          {students &&
            <div className="div-paginate-student-numbers">
            {!loading &&
            <>
            {datosTotales=== 1?
              <span className="PDTENumeroDeEstudiantes">Un resultado disponible</span>
              :
              <span className="PDTENumeroDeEstudiantes"><span style={{fontWeight: "bold"}}>{datosTotales}</span> resultados disponibles</span>
            }
            </>
            }
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
            </div>
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

export default Main;