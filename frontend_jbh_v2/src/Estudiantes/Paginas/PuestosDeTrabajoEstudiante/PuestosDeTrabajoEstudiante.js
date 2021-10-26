import React, { useState } from "react";
import "./PuestosDeTrabajoEstudiante.css";
import { Filters } from "../../Componentes/PuestosDeTrabajoEstudiante/Filters/Filters";
import { ListJobs } from "../../Componentes/PuestosDeTrabajoEstudiante/ListJobs/ListJobs";
import { ItemJob } from "../../Componentes/PuestosDeTrabajoEstudiante/ItemJob/ItemJob";
import NavPuesto from "../../Componentes/PuestosDeTrabajoEstudiante/Navegador/EstudianteNav";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
function PuestosDeTrabajoEstudiante() {
  const studentId = cookies.get("id");
  console.log("ID",studentId);
  const [AllJobsData, setAllJobsData] = React.useState([]);

  React.useEffect(async() => {
    await obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch('http://localhost:5000/api/v1/jobs');
    const jobs = await data.json();
    setAllJobsData(jobs);
  }

  const [form, setForm] = useState({});
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:e.targe.value,
    })
  }

  const [searchJob, setSearchJob] = React.useState({PalabraClave:"", modalidad:"", tipoDeTrabajo:""});


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
      return alltext.includes(searchJobText) && searchJob.modalidad === trabajo.pres_or_remote && searchJob.modalidad === trabajo.modalidad;
      
    });
  }

  return (
    <div className='PDTEPuestosDeTrabajoEstudianteContainer'>
      <div className='HeaderContainer'>
        <NavPuesto />
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
            <h2>HAY {ListSearchedJobs.length} EMPLEOS DISPONIBLES</h2>
            {ListSearchedJobs.map(trabajo => (
            <ItemJob 
              key={trabajo.title}
              id_job={trabajo.id}
              id_empresa={trabajo.partner_id}
              title={trabajo.title}
              description={trabajo.description} 
              city={trabajo.city}
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