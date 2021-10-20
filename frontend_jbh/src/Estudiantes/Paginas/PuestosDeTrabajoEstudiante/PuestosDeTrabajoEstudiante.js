import React from "react";
import "./PuestosDeTrabajoEstudiante.css";
import { Filters } from "../../Componentes/PuestosDeTrabajoEstudiante/Filters/Filters";
import { ListJobs } from "../../Componentes/PuestosDeTrabajoEstudiante/ListJobs/ListJobs";
import { ItemJob } from "../../Componentes/PuestosDeTrabajoEstudiante/ItemJob/ItemJob";
import NavPuesto from "../../Componentes/PuestoStdView/Navegador/NavPuesto";
import Data from "../../data/puestodata.json";



const datos1 = Data;
console.log(datos1);
function PuestosDeTrabajoEstudiante() {
  
  const [AllJobsData, setAllJobsData] = React.useState([]);

  React.useEffect(() => {
    obtenerDatos()
  }, []);
  const obtenerDatos = async () => {
    const data = await fetch('http://172.29.38.35:5000/api/v1/jobs');
    const jobs = await data.json();
    setAllJobsData(jobs);
  }
  console.log(AllJobsData)
  
  //console.log(datos1);

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
    <div className='PuestosDeTrabajoEstudianteContainer'>
      <div className='HeaderContainer'>
        <NavPuesto />
      </div>
      <div className='BodyContainer'>
        <div className='FiltersContainer'> 
          <Filters 
              searchJob={searchJob}
              setSearchJob={setSearchJob}
              checkTypeJob={checkTypeJob}
              setcheckTypeJob={setcheckTypeJob}
          />
        </div>
        <div className='JobsContainer'> 
          <ListJobs>
            {ListSearchedJobs.map(trabajo => (
            <ItemJob 
              key={trabajo.id}
              id={trabajo.id}
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