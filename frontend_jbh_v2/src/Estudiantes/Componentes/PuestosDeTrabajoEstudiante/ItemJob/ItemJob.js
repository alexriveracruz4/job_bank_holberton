import React from 'react';
import './ItemJob.css';
import { Link } from 'react-router-dom';

function ItemJob(props) {
  const studentId=5;
  const [PostulantesData, setPostulantesData] = React.useState([2]);

  React.useEffect(() => {
    obtenerPostulantesDatos();
  }, []);

  const obtenerPostulantesDatos = async () => {
    const data = await fetch(`http://localhost:5000/api/v1/jobs/${props.id_empresa}/${props.id_job}/students`);
    const postulantes = await data.json();
    setPostulantesData(postulantes);
  }

  let PostulantesIDs = PostulantesData.map(postulante => postulante.id);
  console.log(PostulantesIDs);
  let EstadoDePostulacion= PostulantesIDs.includes(studentId,0); /* true== postulado; false== no postulado*/
  console.log(EstadoDePostulacion); //??? undefined
  return (
    <React.StrictMode>
      {EstadoDePostulacion === true ?
        ""
      :
        <Link to={{ pathname:`/estudiante/puestos-de-trabajo/partners/${props.id_empresa}/jobs/${props.id_job}`, state: { EstadoDePostulacion: EstadoDePostulacion } }} style={{ color: 'inherit', textDecoration: 'inherit'}}> 
          <li className='PDTEOneJob'>
          <h2>{props.title}</h2>

          <h3>{props.city}</h3>
          <p>{props.description.slice(0, 250) + "..."}</p>
          <p>Experiencia: {props.experience}</p>
          </li>
        </Link>
      }
      
    </React.StrictMode>
  );
}

export { ItemJob }
