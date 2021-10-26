import React from 'react';
import './ItemJob.css';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function ItemJob(props) {
  const studentId= cookies.get("id"); //string variable
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
  let EstadoDePostulacion= PostulantesIDs.includes(parseInt(studentId),0); /* true== postulado; false== no postulado*/

  return (
    <React.StrictMode>
      
        <Link to={{ pathname:`/estudiante/puestos-de-trabajo/partners/${props.id_empresa}/jobs/${props.id_job}`, state: { EstadoDePostulacion: EstadoDePostulacion } }} style={{ color: 'inherit', textDecoration: 'inherit'}}> 
          <li className='PDTEOneJob'>
          <h2>{props.title}</h2>
          {EstadoDePostulacion === true 
          ?
            <h3 className="EstadoDePostulación" > Trabajo postulado </h3>
          :
            ""
          }
          <h5>{props.city}, {props.country}</h5>
          <p>{props.description.slice(0, 250) + "..."}</p>
          <p>Experiencia: {props.experience}</p>
          </li>
        </Link>
      
      
    </React.StrictMode>
  );
}

export { ItemJob }
