import React, { useEffect, useState } from 'react'
import './MisPostulaciones.css';
import { EstudianteNav } from '../../Navegador/EstudianteNav'
import { ListJobs } from "../../Componentes/MisPostulaciones/ListJobs/ListJobs";
import { ItemJob } from "../../Componentes/MisPostulaciones/ItemJob/ItemJob";
import Cookies from 'universal-cookie';
import apiPath from '../../../ApiPath';
import ReactPaginate from "react-paginate";
import "./Paginacion1.css";
import { helpHttp } from '../../../helpers/helpHttp';
import Loader from '../../../helpers/Loader';
import Message from '../../../helpers/Message';


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

  const [items, setItems] = useState(null);

  const [pageCount, setpageCount] = useState(0);

  const [datosTotales, setDatosTotales] = useState(0);

  const [paginaActual, setPaginaActual] = useState(copia);

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const [errorPage, setErrorPage] = useState(null);

  const [loadingPage, setLoadingPage] = useState(false);

  const setCopia = (data) => {
    copia = data
  }

  let limit = 4;

  let api = helpHttp();

  useEffect(() => { 
    const getComments = async () => {
      const url = `${apiPath}/students/${user_id}/applications?_page=${paginaActual}&_limit=${limit}`
      setLoading(true);
      api.get(url).then((res) => {
        if (!res.err) {
          const jobs_data = res.data;
          const totalPages = res.len_total_data;
          setDatosTotales(totalPages)
          setpageCount(Math.ceil(totalPages / limit));
          setItems(jobs_data);
          setError(null)
        } else {
          setItems(null);
          setError(res);
        }
        setLoading(false);
      })
    };
    getComments();
  }, [limit]);

  const fetchComments = async (currentPage) => {
    const url = `${apiPath}/students/${user_id}/applications?_page=${currentPage}&_limit=${limit}`
      setLoadingPage(true);
      api.get(url).then((res) => {
        if (!res.err) {
          const jobs_data = res.data;
          const totalPages = res.len_total_data;
          setDatosTotales(totalPages)
          setpageCount(Math.ceil(totalPages / limit));
          setItems(jobs_data);
          setErrorPage(null)
        } else {
          setItems(null);
          setErrorPage(res);
        }
        setLoadingPage(false);
      })
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected;
    setPaginaActual(currentPage);
    window.scrollTo(0, 0);
    fetchComments(currentPage);
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
          {datosTotales.length === 1?
            <h2 className="NumeroDeEmpleos">HAS POSTULADO A UN EMPLEO</h2>
          :
            <h2 className="NumeroDeEmpleos">HAS POSTULADO A {datosTotales} EMPLEOS</h2> 
          }
          {(items) &&
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
          }
          {loading && <Loader/>}
          {(error|| errorPage) && <Message/>}
          {(items) &&
            
            <ListJobs>
              {loadingPage && <Loader/>}
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
          }
          {items &&
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
          }
        </div>
      </div>
    </div>
  );
}

export { MisPostulaciones };
