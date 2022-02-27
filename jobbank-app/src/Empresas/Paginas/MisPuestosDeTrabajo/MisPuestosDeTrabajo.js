import React, { useEffect, useState } from 'react'
import './MisPuestosDeTrabajo.css';
import { EmpresaNav } from '../../Navegador/EmpresaNav';
import { ListJobs } from "../../Componentes/MisPuestosDeTrabajo/ListJobs/ListJobs";
import { ItemJob } from "../../Componentes/MisPuestosDeTrabajo/ItemJob/ItemJob";
import Cookies from 'universal-cookie';
import apiPath from '../../../ApiPath';
import ReactPaginate from "react-paginate";
import { helpHttp } from '../../../helpers/helpHttp';
import Loader from '../../../helpers/Loader';
import Message from '../../../helpers/Message';
import { useAuth0 } from "@auth0/auth0-react";
import { closeSession } from "../../../helpers/CloseSession";


const cookies = new Cookies();
let copia = 0;
function MisPuestosDeTrabajo() {

  const { logout } = useAuth0();

  const PartnerId= cookies.get("partner_id"); //string variable

  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
    if (!cookies.get('partner_id')){
      closeSession();
      logout();  
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
      const url = `${apiPath}/partners/${PartnerId}/jobs?_page=${paginaActual}&_limit=${limit}`
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
    const url = `${apiPath}/partners/${PartnerId}/jobs?_page=${currentPage}&_limit=${limit}`
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
    <div className='MisPuestosDeTrabajoContainer'>
      <div className='HeaderContainer'>
        <EmpresaNav />
      </div>
      <div className='MPDTBodyContainer'>
        
        <div className='MPDTJobsContainer'>
          {datosTotales === 1?
            <h2 className="NumeroDeEmpleos">Se ha publicado 1 empleo</h2>
          :
            <h2 className="NumeroDeEmpleos">Se han publicado {datosTotales} empleos</h2> 
          }
          {loading 
          ?
            <div>
              <Loader/>
            </div>  
          :
          <>
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
          
          {(error|| errorPage) && <Message/>}
          {(items) &&

          <ListJobs>
            {loadingPage 
            ?
              <div>
                <Loader/>
              </div>  
            :
            <>
              {items.map(trabajo => (   
                <ItemJob 
                  key={trabajo.token}
                  JobId={trabajo.id}
                  title={trabajo.title}
                  deleted={trabajo.deleted}
                  created_at={trabajo.created_at}
                  deleted_at={trabajo.deleted_at}
                  updated_at={trabajo.updated_at}
                  setCopia={setCopia}
                  paginaActual={paginaActual}
                />
                ))
              }
            </>
            }
          </ListJobs>
          }
          
          {(items && !loadingPage) &&
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
      </div>
    </div>
  );
}

export { MisPuestosDeTrabajo };
