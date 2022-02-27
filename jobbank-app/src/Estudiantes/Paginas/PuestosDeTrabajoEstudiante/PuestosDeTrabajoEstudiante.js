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
import { helpHttp } from "../../../helpers/helpHttp";
import Loader from "../../../helpers/Loader";
import Message from "../../../helpers/Message";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAuth0 } from "@auth0/auth0-react";
import { closeSession } from "../../../helpers/CloseSession";


const cookies = new Cookies();
let copia = {PalabraClave:"", modalidad:"", tipoDeTrabajo:"", page:0, fecha:""}
function PuestosDeTrabajoEstudiante() {

  const { logout } = useAuth0();

  const [searchJob, setSearchJob] = useState(copia); // Status to filter by 3 options
  
  const setCopia = (data) => {
    copia = data
  }
  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
      if (!cookies.get('student_id')){
        closeSession();
        logout();
      }
  });


  const handleClean = async () => {
    window.location.reload(false);
  };
  //para los filtros

  const [items, setItems] = useState(null);

  const [pageCount, setpageCount] = useState(0);

  const [datosTotales, setDatosTotales] = useState(0);

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const [errorPage, setErrorPage] = useState(null);

  const [loadingPage, setLoadingPage] = useState(false);

  let limit = 4;

  let api = helpHttp();

  useEffect(() => { 
    const getComments = async () => {
      const url = `${apiPath}/jobs?_page=${copia.page}&_limit=${limit}&_filter_words=${copia.PalabraClave}&_kind_of_job=${copia.tipoDeTrabajo}&_modality=${copia.modalidad}&_fecha=${copia.fecha}`
      setLoading(true);
      api.get(url).then((res) => {
        if (!res.err) {
          const jobs_data = res.data;
          const totalPages = res.len_filter_data;
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
  }, [copia]);
  const fetchComments = async (currentPage) => {
    const url = `${apiPath}/jobs?_page=${currentPage}&_limit=${limit}&_filter_words=${copia.PalabraClave}&_kind_of_job=${copia.tipoDeTrabajo}&_modality=${copia.modalidad}&_fecha=${copia.fecha}`
      setLoadingPage(true);
      api.get(url).then((res) => {
        if (!res.err) {
          const jobs_data = res.data;
          const totalPages = res.len_filter_data;
          setDatosTotales(totalPages)
          setpageCount(Math.ceil(totalPages / limit));
          setItems(jobs_data);
          setErrorPage(null);
        } else {
          setItems(null);
          setErrorPage(res);
        }
        setLoadingPage(false);
      })
  };

  const handlePageClick = async ({selected: selectedPage}) => {
    let currentPage = selectedPage;
    copia.page = currentPage;
    window.scrollTo(0, 0);
    fetchComments(currentPage);
  };

  return (
    <div className='PDTEPuestosDeTrabajoEstudianteContainer'>
      <div className='HeaderContainer'>
        <EstudianteNav />
      </div>
      <Stack 
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
        
        sx={{
          width: "100%",
          m:"10px",
        }}
      >
        <Stack 
          sx={{
          width: "95%",
          pl: "400px"
          }}
        >
          <Typography variant="h7" component="h2">
            {datosTotales=== 1?
              <h2 className="PDTENumeroDeEmpleos">1 EMPLEO DISPONIBLE</h2>
              :
              <h2 className="PDTENumeroDeEmpleos">{datosTotales} EMPLEOS DISPONIBLES</h2>
            }
          </Typography>
        </Stack>
        <Stack sx={{width: "95%"}} direction="row" justifyContent="center">
          <Box sx={{width: "25%", display: "flex", justifyContent: "center", minHeight: "700px"}}>
            <Filters
              searchJob={searchJob}
              setSearchJob={setSearchJob}
              fetchComments={fetchComments}
              setItems={setItems}
              setCopia={setCopia}
              copia={copia}
              handleClean={handleClean}
            />
          </Box>
          <Box sx={{width: "75%", display: "flex", flexDirection: "column", alignContent: "center"}}>
          {loading 
          ?
            <div>
              <Loader/>
            </div>  
          :
          <>
            {items &&
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                pageCount={pageCount}
                forcePage={copia.page}
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
              {(error || errorPage) && <Message/>}
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
                        key={trabajo.code}
                        id_job={trabajo.id}
                        id_empresa={trabajo.partner_id}
                        title={trabajo.title}
                        description={trabajo.description}
                        city={trabajo.city}
                        country={trabajo.country}
                        updated_at={trabajo.updated_at}
                        created_at={trabajo.created_at}
                        pres_or_remote={trabajo.pres_or_remote}
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
                forcePage={copia.page}
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
          </Box>
        </Stack>
      </Stack>
    </div>
  );
}


/*
  const handlePageClick2 = async (pageInfo) => {
    //setCurrentPage(selectedPage)
    //selectedPage = 1;
    let currentPage1 = pageInfo - 1;
    copia.page = currentPage1;
    const commentsFormServer = await fetchComments(currentPage1);
    window.scrollTo(0, 0);
    setItems(commentsFormServer);
  };
  let paginationConfig = {
    totalPages:pageCount,
    currentPage: copia.page + 1,
    size: "mg",
    showMax: 3,
    threeDots: true,
    prevNext: true,
    onClick: handlePageClick2,
    center:true,
    shadow:true,
  };
  {pageCount=== 0?
            <h2></h2>
            :
            <div className='pagination'>
            <Pagination {...paginationConfig} >
            
            </Pagination>
          </div>
          }
*/

export { PuestosDeTrabajoEstudiante };
