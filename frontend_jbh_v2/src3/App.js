import React from 'react';
import './App.css';
import { Header } from './Header';
import { Filters } from './Filters';
import { ListJobs } from './ListJobs';
import { ItemJob } from './ItemJob';

const datos = [
  {
    id: 1,
    titulo:"Programador/Desarrolador Full Stack con experiencia en Frontend",
    descripcion:"Gestionar llamadas entrantes para brindar alternativas de solución a las dudas, consultas, reclamos y emergencias médicas y/o consultas que presenten los asegurados; realizando el acompañamiento oportuno desde el principio al término de la llamada. Manteniendo altos niveles de satisfacción y fidelización en los usuarios finales.",
    ciudad:"Lima",
    añosDeExperiencia: 2
  },
  {
    id: 2,
    titulo:"Programador/Desarrolador Full Stack con experiencia en Backend",
    descripcion:"Gestionar llamadas entrantes para brindar alternativas de solución a las dudas, consultas, reclamos y emergencias médicas y/o consultas que presenten los asegurados; realizando el acompañamiento oportuno desde el principio al término de la llamada. Manteniendo altos niveles de satisfacción y fidelización en los usuarios finales.",
    ciudad:"Lima",
    añosDeExperiencia: 2
  },
  {
    id: 3,
    titulo:"Programador/Desarrolador Frontend y Backend",
    descripcion:"Gestionar llamadas entrantes para brindar alternativas de solución a las dudas, consultas, reclamos y emergencias médicas y/o consultas que presenten los asegurados; realizando el acompañamiento oportuno desde el principio al término de la llamada. Manteniendo altos niveles de satisfacción y fidelización en los usuarios finales.",
    ciudad:"Lima",
    añosDeExperiencia: 2
  },
  {
    id: 4,
    titulo:"Programador/Desarrolador Reactjs",
    descripcion:"Gestionar llamadas entrantes para brindar alternativas de solución a las dudas, consultas, reclamos y emergencias médicas y/o consultas que presenten los asegurados; realizando el acompañamiento oportuno desde el principio al término de la llamada. Manteniendo altos niveles de satisfacción y fidelización en los usuarios finales.",
    ciudad:"Lima",
    añosDeExperiencia: 2
  },
  {
    id: 5,
    titulo:"Programador/Desarrolador Reactjsasdasdasda",
    descripcion:"Gestionar llamadas entrantes para brindar alternativas de solución a las dudas, consultas, reclamos y emergencias médicas y/o consultas que presenten los asegurados; realizando el acompañamiento oportuno desde el principio al término de la llamada. Manteniendo altos niveles de satisfacción y fidelización en los usuarios finales.",
    ciudad:"Lima",
    añosDeExperiencia: 2
  }
]


function App() {

  const [searchJob, setSearchJob] = React.useState("");

  let ListSearchedJobs = [];

  if (!(searchJob.length >= 1)) {
    ListSearchedJobs = datos;
  } else {
      ListSearchedJobs = datos.filter(trabajo => {
      const JobTituloText = trabajo.titulo.toLowerCase();
      const searchJobText = searchJob.toLowerCase();
      return JobTituloText.includes(searchJobText);
    });
  }


  return (
    <div className='AppContainer'>
      <div className='HeaderContainer'>
        <Header />
      </div>
      <div className='BodyContainer'>
        <div className='FiltersContainer'> 
          <Filters 
              searchJob={searchJob}
              setSearchJob={setSearchJob}
          />
        </div>
        <div className='JobsContainer'> 
          <ListJobs>
            {ListSearchedJobs.map(trabajo => (
            <ItemJob 
              key={trabajo.id}
              titulo={trabajo.titulo}
              descripcion={trabajo.descripcion} 
              ciudad={trabajo.ciudad}
              añosDeExperiencia={trabajo.añosDeExperiencia}
            />
            ))}
          </ListJobs>
        </div>
      </div>
    </div>
  );
}

export default App;
