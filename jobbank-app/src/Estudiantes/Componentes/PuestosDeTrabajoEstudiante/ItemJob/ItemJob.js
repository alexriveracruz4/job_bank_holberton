import React from 'react';
import './ItemJob.css';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import apiPath from '../../../../ApiPath';

const cookies = new Cookies();

function ItemJob(props) {
  const studentId= cookies.get("student_id"); //string variable

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
  let PostulantesIDs = PostulantesData.map(postulante => postulante.student_id);
  let EstadoDePostulacion= PostulantesIDs.includes(parseInt(studentId),0); /*true== postulado; false== no postulado*/


  let tiempoTranscurrido = (stringDate) =>{
    let options = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    let firstDate = new Date(stringDate)
    let secondDate = new Date();
    if ((secondDate-firstDate)/(1000) < 60 ) {
      return "Hace unos segundos";
    } else if ((secondDate-firstDate)/(1000*60) < 60) {
        if (Math.round((secondDate-firstDate)/(1000*60)) === 1) {
          return `Hace ${Math.round((secondDate-firstDate)/(1000*60))} minuto`;
        } if (Math.round((secondDate-firstDate)/(1000*60)) === 60) {
            return `Hace 1 hora`;
        }
        return `Hace ${Math.round((secondDate-firstDate)/(1000*60))} minutos`;
    } else if ((secondDate-firstDate)/(1000*60*60) < 24) {
        if (Math.round((secondDate-firstDate)/(1000*60*60)) === 1) {
          return `Hace ${Math.round((secondDate-firstDate)/(1000*60*60))} hora`;
        } if (Math.round((secondDate-firstDate)/(1000*60*60)) === 24) {
            return `Ayer`;
        }
        return `Hace ${Math.round((secondDate-firstDate)/(1000*60*60))} horas`;
    } else if ((secondDate-firstDate)/(1000*60*60*24) < 8) {
        if (Math.round((secondDate-firstDate)/(1000*60*60*24)) === 1) {
          return `Ayer`
        } 
        return `Hace ${Math.round((secondDate-firstDate)/(1000*60*60*24))} días`;
    } else {
      return firstDate.toLocaleDateString("es-ES", options);
    }
  } 

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
          <h5>{PartnerData.name} - {props.city}, {props.country} </h5>
          <p>Modalidad: {props.pres_or_remote}</p>
          <p>{props.description.slice(0, 250) + "..."}</p>

          {props.created_at !== props.updated_at 
          ?
            <h3> Actualizado: {tiempoTranscurrido(props.updated_at)} </h3>
          :
            <h3> Publicado: {tiempoTranscurrido(props.created_at)} </h3>
          }
          </li>
        </Link>
    </React.StrictMode>
  );
}

export { ItemJob }
