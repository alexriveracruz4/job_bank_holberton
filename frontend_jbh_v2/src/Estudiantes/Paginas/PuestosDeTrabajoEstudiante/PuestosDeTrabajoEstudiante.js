import React, { useEffect, useState } from "react";
import "./PuestosDeTrabajoEstudiante.css";
import { EstudianteNav } from '../../Navegador/EstudianteNav'
import { Filters } from "../../Componentes/PuestosDeTrabajoEstudiante/Filters/Filters";
import { ListJobs } from "../../Componentes/PuestosDeTrabajoEstudiante/ListJobs/ListJobs";
import { ItemJob } from "../../Componentes/PuestosDeTrabajoEstudiante/ItemJob/ItemJob";

import Cookies from 'universal-cookie';

const cookies = new Cookies();
function PuestosDeTrabajoEstudiante() {
  const studentId = cookies.get("id");
  const [AllJobsData, setAllJobsData] = useState([]);

  useEffect(async() => {
    await obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch('http://localhost:5000/api/v1/jobs');
    const jobs = await data.json();
    setAllJobsData(jobs);
  }

  const [searchJob, setSearchJob] = useState({PalabraClave:"", modalidad:"", tipoDeTrabajo:""});

  const datosNotEliminados = AllJobsData.filter(trabajo => trabajo.deleted === 0);

  const datos = datosNotEliminados;

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

  useEffect(() => {
      if (!cookies.get('id')){
          window.location.href="/login/estudiante";
      }
  });

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
          />
        </div>
        <div className='PDTEJobsContainer'>

          <ListJobs>
            {ListSearchedJobs.length === 1?
              <h2 className="PDTENumeroDeEmpleos">SOLO HAY UN EMPLEO DISPONIBLE</h2>
            :
              <h2 className="PDTENumeroDeEmpleos">HAY {ListSearchedJobs.length} EMPLEOS DISPONIBLES</h2>
            }
            {ListSearchedJobs.map(trabajo => (
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
        </div>
      </div>
    </div>
  );
}

export { PuestosDeTrabajoEstudiante };
