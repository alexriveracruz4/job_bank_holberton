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
let copia = {PalabraClave:"", modalidad:"todas", tipoDeTrabajo:"todas", page:0}
function PuestosDeTrabajoEstudiante() {
  const [searchJob, setSearchJob] = useState(copia); // Status to filter by 3 options
  
  const setCopia = (data) => {
    copia = data
  }
   
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

  const [items, setItems] = useState([]);

  const [pageCount, setpageCount] = useState(3);

  const [datosTotales, setDatosTotales] = useState(3);

  let limit = 4;

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `${apiPath}/jobs?_page=${copia.page}&_limit=${limit}&_filter_words=${copia.PalabraClave}&_kind_of_job=${copia.tipoDeTrabajo}&_modality=${copia.modalidad}`
      );
      const datos_completos = await res.json();
      const data = datos_completos.data;
      const total = datos_completos.len_filter_data;
      setDatosTotales(total)
      setpageCount(Math.ceil(total / limit));
      setItems(data);
    };
    getComments();
  }, []);

  const fetchComments = async (currentPage) => {
    const res = await fetch(
      `${apiPath}/jobs?_page=${currentPage}&_limit=${limit}&_filter_words=${copia.PalabraClave}&_kind_of_job=${copia.tipoDeTrabajo}&_modality=${copia.modalidad}`
    );

    const datos_completos = await res.json();
    const data = datos_completos.data;
    const total = datos_completos.len_filter_data;
    setDatosTotales(total);
    setpageCount(Math.ceil(total / limit));
    setItems(data);
    return data;
  };

  const handlePageClick = async ({selected: selectedPage}) => {
    let currentPage = selectedPage;
    copia.page = currentPage;
    window.scrollTo(0, 0);
    const commentsFormServer = await fetchComments(currentPage);
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
              setCopia={setCopia}
              copia={copia}
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
        </div>
      </div>
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
