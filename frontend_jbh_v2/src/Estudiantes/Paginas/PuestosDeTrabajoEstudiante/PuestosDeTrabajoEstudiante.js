import React, { useEffect, useState } from "react";
import "./PuestosDeTrabajoEstudiante.css";
import { EstudianteNav } from '../../Navegador/EstudianteNav'
import { Filters } from "../../Componentes/PuestosDeTrabajoEstudiante/Filters/Filters";
import { ListJobs } from "../../Componentes/PuestosDeTrabajoEstudiante/ListJobs/ListJobs";
import { ItemJob } from "../../Componentes/PuestosDeTrabajoEstudiante/ItemJob/ItemJob";
import Cookies from 'universal-cookie';
import apiPath from "../../../ApiPath";
import ReactPaginate from "react-paginate";
import "./Paginacion.css";

const cookies = new Cookies();
let copia_2 = {PalabraClave:"", modalidad:"todas", tipoDeTrabajo:"todas"}
console.log("1")
function PuestosDeTrabajoEstudiante() {
  console.log("COPIAAA")
  console.log(copia_2)
  const [searchJob, setSearchJob] = useState({PalabraClave:"", modalidad:"todas", tipoDeTrabajo:"todas"}); // Status to filter by 3 options
  const [copia, setCopia] = useState({...searchJob});


  const setCopia_2 = (data) => {
    copia_2 = data
  }
  /*
  // Obtains the data of the jobs and saves them in AllJobsData
  const [AllJobsData, setAllJobsData] = useState([]);

  useEffect(async() => {
    await obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch(`${apiPath}/jobs`);
    const jobs = await data.json();
    //tO ORDER BY DATE
    jobs.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.created_at) - new Date(a.created_at);
    });

    setAllJobsData(jobs);
  }

  const [searchJob, setSearchJob] = useState({PalabraClave:"", modalidad:"", tipoDeTrabajo:""}); // Status to filter by 3 options

  const datosNotEliminados = AllJobsData.filter(trabajo => trabajo.deleted === 0); //The reverse is because we need to show on the page the lastest created jobs

  console.log(datosNotEliminados)

  const datos = datosNotEliminados;

  // Filter to search for jobs
  let ListSearchedJobs = [];
    if (( searchJob.PalabraClave.length === 0 && searchJob.modalidad.length === 0 && searchJob.tipoDeTrabajo.length === 0)) {
      ListSearchedJobs = datos;
    } else {
      ListSearchedJobs = datos.filter(trabajo => {
        const JobTituloText = trabajo.title.toLowerCase();
        const JobDescripcionText = trabajo.description.toLowerCase();
        const alltext = JobTituloText + JobDescripcionText;
        const searchJobText = searchJob.PalabraClave.toLowerCase();
        const resultadoPalabra = alltext.includes(searchJobText);

        let resultadoModalidad = false;
        if (searchJob.tipoDeTrabajo === trabajo.job_type || searchJob.tipoDeTrabajo.length === 0) {
          resultadoModalidad = true;
        }
        let resultadoTipoDeTrabajo = false
        if (searchJob.modalidad === trabajo.pres_or_remote || searchJob.modalidad.length === 0) {
          resultadoTipoDeTrabajo = true;
        }
        return resultadoPalabra && resultadoTipoDeTrabajo && resultadoModalidad;
      });
    }

  */
   
  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
      if (!cookies.get('id')){
          window.location.href="/login/estudiante";
      }
  });


  const handleClean = async () => {
    window.location.reload(false);
  };
  //para los filtros
  //const [searchJob, setSearchJob] = useState({PalabraClave:"", modalidad:"", tipoDeTrabajo:""});

  const [items, setItems] = useState([]);

  const [pageCount, setpageCount] = useState(0);

  const [datosTotales, setDatosTotales] = useState(0);

  let limit = 4;

  //const total = ListSearchedJobs.length;
  //setpageCount(Math.ceil(total / limit));
  //setItems(data);

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `${apiPath}/jobs?_page=0&_limit=${limit}&_filter_words=${copia_2.PalabraClave}&_kind_of_job=${copia_2.tipoDeTrabajo}&_modality=${copia_2.modalidad}`
      );
      const datos_completos = await res.json();
      const data = datos_completos.data;
      //console.log("dasdasdasd")|dd
      //console.log(total)
      const total = datos_completos.len_filter_data;
      setDatosTotales(total)
      setpageCount(Math.ceil(total / limit));
      setItems(data);
    };
    getComments();
  }, []);

  const fetchComments = async (currentPage) => {
    console.log("copia2")
    console.log(copia_2)
    const res = await fetch(
      `${apiPath}/jobs?_page=${currentPage}&_limit=${limit}&_filter_words=${copia_2.PalabraClave}&_kind_of_job=${copia_2.tipoDeTrabajo}&_modality=${copia_2.modalidad}`
    );

    const datos_completos = await res.json();
    const data = datos_completos.data;
    const total = datos_completos.len_filter_data;
    setDatosTotales(total);
    setpageCount(Math.ceil(total / limit));
    setItems(data);
    return data;
  };


  const handlePageClick = async (data) => {
    console.log("PAGINACION")
    console.log(data);
    console.log(data.selected);
    let currentPage = data.selected;
    //setcurrentPage(data.selected);
    const commentsFormServer = await fetchComments(currentPage);
    window.scrollTo(0, 0);
    //const commentsFormServer = ListSearchedJobs.slice(currentPage*limit, limit*(currentPage + 1));
    console.log("PRUEBA")
    console.log(commentsFormServer)
    setItems(commentsFormServer);
  };

  return (
    <div className='PDTEPuestosDeTrabajoEstudianteContainer'>
      <div className='HeaderContainer'>
        <EstudianteNav />
      </div>
      <div className='PDTEBodyContainer'>
        <div className='PDTEFiltersContainer'>
          <Filters
              searchJob={searchJob}
              setSearchJob={setSearchJob}
              fetchComments={fetchComments}
              setItems={setItems}
              setCopia={setCopia_2}
              copia={copia_2}
              handleClean={handleClean}
          />
        </div>
        <div className='PDTEJobsContainer'>

          {datosTotales=== 1?
            <h2 className="PDTENumeroDeEmpleos">1 EMPLEO DISPONIBLE</h2>
            :
            <h2 className="PDTENumeroDeEmpleos">{datosTotales} EMPLEOS DISPONIBLES</h2>
          }
          
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={pageCount}
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
          />
       
          <ListJobs>
            
            {items.map(trabajo => (
            <ItemJob
              key={trabajo.title}
              id_job={trabajo.id}
              id_empresa={trabajo.partner_id}
              title={trabajo.title}
              description={trabajo.description}
              city={trabajo.city}
              country={trabajo.country}
              experience={trabajo.experience}
            />
            ))}

            
          </ListJobs>

          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={pageCount}
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
          />
       
        </div>
      </div>
    </div>
  );
}


/*
{ListSearchedJobs.length === 1?
  <h2 className="PDTENumeroDeEmpleos">SOLO HAY UN EMPLEO DISPONIBLE</h2>
:
  <h2 className="PDTENumeroDeEmpleos">HAY {ListSearchedJobs.length} EMPLEOS DISPONIBLES</h2>
}
*/


export { PuestosDeTrabajoEstudiante };
