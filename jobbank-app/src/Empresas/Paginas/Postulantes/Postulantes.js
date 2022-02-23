import React, { useEffect, useState } from 'react'
import './Postulantes.css';
import { EmpresaNav } from '../../Navegador/EmpresaNav';

import { ListJobs } from "../../Componentes/Postulantes/ListJobs/ListJobs";
import { ItemJob } from "../../Componentes/Postulantes/ItemJob/ItemJob";

import { useLocation, useParams } from 'react-router';
import Cookies from 'universal-cookie';
import ReactPaginate from "react-paginate";

import apiPath from '../../../ApiPath';
import { helpHttp } from '../../../helpers/helpHttp';
import Loader from '../../../helpers/Loader';
import Message from '../../../helpers/Message';


// Get the data of all applicants for a job
const cookies = new Cookies();
let copia = 0;
function Postulantes(props) {

    // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
    if (!cookies.get('partner_id')){
      window.location.href="/login/empresa";
    }
  });

  const { JobId } = useParams();
  const partner_id= cookies.get("partner_id"); //string variable
  const partnerName= cookies.get("name");
  const location = useLocation();
  let JobTitle = "";
  if (location.state !== undefined) {
    JobTitle = location.state.titleJob;
  }


  const [AllStudentsApplicated, setAllStudentsApplicated] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [pageCount, setpageCount] = useState(0);

  const [datosTotales, setDatosTotales] = useState(0);

  const [paginaActual, setPaginaActual] = useState(copia);

  const [errorPage, setErrorPage] = useState(null);

  const [loadingPage, setLoadingPage] = useState(false);

  const setCopia = (data) => {
    copia = data
  }

  let limit = 4;

  let api = helpHttp();

  useEffect(() => { 
    const getComments = async () => {
      const url = `${apiPath}/jobs/${partner_id}/${JobId}/students?_page=${paginaActual}&_limit=${limit}`
      setLoading(true);
      api.get(url).then((res) => {
        if (!res.err) {
          const jobs_data = res.data;
          const totalPages = res.len_total_data;
          setDatosTotales(totalPages)
          setpageCount(Math.ceil(totalPages / limit));
          setAllStudentsApplicated(jobs_data);
          setError(null)
        } else {
          setAllStudentsApplicated(null);
          setError(res);
        }
        setLoading(false);
      })
    };
    getComments();
  }, [limit]);

  const fetchComments = async (currentPage) => {
    const url = `${apiPath}/jobs/${partner_id}/${JobId}/students?_page=${paginaActual}&_limit=${limit}`
      setLoadingPage(true);
      api.get(url).then((res) => {
        if (!res.err) {
          const jobs_data = res.data;
          const totalPages = res.len_total_data;
          setDatosTotales(totalPages)
          setpageCount(Math.ceil(totalPages / limit));
          setAllStudentsApplicated(jobs_data);
          setErrorPage(null)
        } else {
          setAllStudentsApplicated(null);
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
    <div className='PostulantesContainer'>
      <div className='HeadersContainer'>
        <EmpresaNav />
      </div>
      <div className='PTitleContainer'>
        <h2>{JobTitle}</h2>
        <h3>Postulantes:</h3>
      </div>
        {datosTotales === 1?
            <h2 className="NumeroDeEmpleos">Se encontró 1 postulante</h2>
          :
            <h2 className="NumeroDeEmpleos">Se encontraron {datosTotales} postulantes</h2> 
          }
          {loading 
          ?
            <div>
              <Loader/>
            </div>  
          :
          <>
            {(AllStudentsApplicated) &&
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
            {(error|| errorPage) && <Message/>}
            {(AllStudentsApplicated) &&
            
              <ListJobs>
                {loadingPage 
                ?
                  <div>
                    <Loader/>
                  </div>  
                :
                <>
                  {AllStudentsApplicated.map(estudiante => (
                    <ItemJob
                      key={estudiante.student_id}
                      student={estudiante}
                      setCopia={setCopia}
                      paginaActual={paginaActual}
                      titleJob={JobTitle}
                      partnerName={partnerName}
                    />
                  ))}
                </>
                }
              </ListJobs>
            }
            {(AllStudentsApplicated && !loadingPage) &&
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
          </>
          }
    </div>
  );
}

export { Postulantes };
