import React, { useEffect, useState } from 'react'
import './MisPostulaciones.css';
import { EstudianteNav } from '../../Navegador/EstudianteNav'
import { ListJobs } from "../../Componentes/MisPostulaciones/ListJobs/ListJobs";
import { ItemJob } from "../../Componentes/MisPostulaciones/ItemJob/ItemJob";
import Cookies from 'universal-cookie';
import apiPath from '../../../ApiPath';
import ReactPaginate from "react-paginate";
import "./Paginacion1.css";

const cookies = new Cookies();

function MisPostulaciones() {
  // Obtains the data of the jobs to which the student has applied and saves them in AllMyApplications
  const user_id = cookies.get("id");

  /*
  const [AllMyApplications, setAllMyApplications] = React.useState([]);

  React.useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch(`${apiPath}/students/${user_id}/applications`);
    const applications = await data.json();
    applications.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.created_at) - new Date(a.created_at);
    });
    setAllMyApplications(applications);
  }
  */


  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
      if (!cookies.get('id')){
          window.location.href="/login/estudiante";
      }
  });

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
        `${apiPath}/students/${user_id}/applications?_page=0&_limit=${limit}`
      );
      const datos_completos = await res.json();
      const data = datos_completos.data;
      //console.log("dasdasdasd")|dd
      //console.log(total)
      const total = datos_completos.len_total_data;
      setDatosTotales(total)
      setpageCount(Math.ceil(total / limit));
      setItems(data);
    };
    getComments();
  }, [limit]);

  const fetchComments = async (currentPage) => {
    const res = await fetch(
      `${apiPath}/students/${user_id}/applications?_page=${currentPage}&_limit=${limit}`
    );
    const datos_completos = await res.json();
    const data = datos_completos.data;
    const total = datos_completos.len_total_data;
    setDatosTotales(total);
    setpageCount(Math.ceil(total / limit));
    setItems(data);
    return data;
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected;
    //setcurrentPage(data.selected);
    const commentsFormServer = await fetchComments(currentPage);
    setItems(commentsFormServer);
  };

  return (
    <div className='MisPostulacionesContainer'>
      <div className='HeaderContainer'>
        <EstudianteNav />
      </div>
      <div className='MPBodyContainer'>
        <div className='MPFiltersContainer'>
        </div>
        <div className='MPJobsContainer'>

            {items.length === 1?
              <h2 className="NumeroDeEmpleos">HAS POSTULADO A UN EMPLEO</h2>
            :
              <h2 className="NumeroDeEmpleos">HAS POSTULADO A {datosTotales} EMPLEOS</h2> 
            }
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination1"}
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
            
            {items.reverse().map(trabajo => (
            <ItemJob
              key={trabajo.title}
              id_job={trabajo.id}
              id_empresa={trabajo.partner_id}
              title={trabajo.title}
              description={trabajo.description}
              city={trabajo.city}
              experience={trabajo.experience}
              deleted={trabajo.deleted}
            />
            ))}
          </ListJobs>
        </div>
      </div>
    </div>
  );
}

export { MisPostulaciones };
