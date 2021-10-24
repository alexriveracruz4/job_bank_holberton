import React from "react";
import "./PuestosDeTrabajoEstudiante.css";
import { Filters } from "../../Componentes/PuestosDeTrabajoEstudiante/Filters/Filters";
import { ListJobs } from "../../Componentes/PuestosDeTrabajoEstudiante/ListJobs/ListJobs";
import { ItemJob } from "../../Componentes/PuestosDeTrabajoEstudiante/ItemJob/ItemJob";
import NavPuesto from "../../Componentes/PuestosDeTrabajoEstudiante/Navegador/EstudianteNav";
import Data from "../../data/puestodata.json";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const datos1 = Data;
function PuestosDeTrabajoEstudiante() {
    console.log('id: ' + cookies.get('id'));
    console.log('nombre: '+cookies.get('firstname'));
    console.log('apellido: '+cookies.get('lastname'));
    console.log('email: '+cookies.get('email'));

    const [AllJobsData, setAllJobsData] = React.useState([]);

  React.useEffect(async() => {
    await obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch('http://localhost:5000/api/v1/jobs');
    const jobs = await data.json();
    setAllJobsData(jobs);
  }

  const [searchJob, setSearchJob] = React.useState("");

  const [checkTypeJob, setcheckTypeJob] = React.useState(false);

  const datosNotEliminados = AllJobsData.filter(trabajo => trabajo.deleted === 0);

  const datos = datosNotEliminados;

  /*
  let NewListSearchedJobs = [];
  if (checkTypeJob === false) {
    NewListSearchedJobs = datos;
    console.log("sadasdas");
  } else {
    NewListSearchedJobs = datos.filter(trabajo => {
      if 
      return trabajo.pres_or_remote  === true 
    });
  }
  */

  let ListSearchedJobs = [];

  if (!(searchJob.length >= 1)) {
    ListSearchedJobs = datos;
  } else {
      ListSearchedJobs = datos.filter(trabajo => {
      const JobTituloText = trabajo.title.toLowerCase();
      const JobDescripcionText = trabajo.description.toLowerCase();
      const alltext = JobTituloText + JobDescripcionText;
      const searchJobText = searchJob.toLowerCase();
      return alltext.includes(searchJobText);
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
              checkTypeJob={checkTypeJob}
              setcheckTypeJob={setcheckTypeJob}
          />
        </div>
        <div className='PDTEJobsContainer'> 
          <ListJobs>
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
