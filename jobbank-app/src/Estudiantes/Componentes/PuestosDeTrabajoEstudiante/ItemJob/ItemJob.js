import React from 'react';
import './ItemJob.css';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import apiPath from '../../../../ApiPath';

const cookies = new Cookies();

function ItemJob(props) {
  const studentId= cookies.get("id"); //string variable

  // Obtains the data of the applicants for a job and saves them in PostulantesData
  const [PostulantesData, setPostulantesData] = React.useState([2]);
  const [PartnerData, setPartnerData] = React.useState([2]);


  React.useEffect(() => {
    obtenerPostulantesDatos();
    obtenerParnertDatos()
  }, []);

  const obtenerPostulantesDatos = async () => {
    const data = await fetch(`${apiPath}/jobs/${props.id_empresa}/${props.id_job}/students`);
    const postulantes = await data.json();
    setPostulantesData(postulantes);
  }

  const obtenerParnertDatos = async () => {
    const data = await fetch(`${apiPath}/partners/${props.id_empresa}`);
    const parnert = await data.json();
    setPartnerData(parnert);
  }


  // Jobs to be displayed upon login
  let PostulantesIDs = PostulantesData.map(postulante => postulante.id);
  let EstadoDePostulacion= PostulantesIDs.includes(parseInt(studentId),0); /*true== postulado; false== no postulado*/

  return (
    <React.StrictMode>     
        <Link to={{ pathname:`/estudiante/puestos-de-trabajo/partners/${props.id_empresa}/jobs/${props.id_job}`, state: { EstadoDePostulacion: EstadoDePostulacion, DatosEmpresa: PartnerData } }} style={{ color: 'inherit', textDecoration: 'inherit'}}> 
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
