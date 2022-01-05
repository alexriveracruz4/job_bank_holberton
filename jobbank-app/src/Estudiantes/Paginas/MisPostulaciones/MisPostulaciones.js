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

let copia = 0;
function MisPostulaciones() {
  // Obtains the data of the jobs to which the student has applied and saves them in AllMyApplications
  const user_id = cookies.get("id");

  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
      if (!cookies.get('id')){
          window.location.href="/login/estudiante";
      }
  });

  

  const [items, setItems] = useState([]);

  const [pageCount, setpageCount] = useState(0);

  const [datosTotales, setDatosTotales] = useState(0);

  const [paginaActual, setPaginaActual] = useState(copia);

  const setCopia = (data) => {
    copia = data
  }

  console.log("Pagina Actual")
  console.log(paginaActual);
  console.log("Pagina Actual")
  console.log(paginaActual);
  let limit = 4;


  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `${apiPath}/students/${user_id}/applications?_page=${paginaActual}&_limit=${limit}`
      );
      const datos_completos = await res.json();
      const data = datos_completos.data;
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
    setPaginaActual(currentPage);
    window.scrollTo(0, 0);
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
            forcePage={paginaActual}
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

          <ListJobs>
            
            {items.map(trabajo => (
            <ItemJob
              key={trabajo.title}
              id_job={trabajo.id}
              id_empresa={trabajo.partner_id}
              title={trabajo.title}
              description={trabajo.description}
              city={trabajo.city}
              experience={trabajo.experience}
              deleted={trabajo.deleted}
              setCopia={setCopia}
              paginaActual={paginaActual}
            />
            ))}
          </ListJobs>

          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={pageCount}
            forcePage={paginaActual}
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
      </div>
    </div>
  );
}

export { MisPostulaciones };
