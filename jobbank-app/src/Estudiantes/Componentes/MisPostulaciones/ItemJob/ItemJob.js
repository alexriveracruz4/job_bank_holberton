import React from 'react';
import './ItemJob.css';
import { Link } from 'react-router-dom';
import apiPath from '../../../../ApiPath';


function ItemJob(props) {
  // Information on the jobs you applied for
  props.setCopia(props.paginaActual);
  const [PartnerData, setPartnerData] = React.useState([2]);

  React.useEffect(() => {
    obtenerParnertDatos()
  }, []);

  const obtenerParnertDatos = async () => {
    const data = await fetch(`${apiPath}/partners/${props.id_empresa}`);
    const parnert = await data.json();
    setPartnerData(parnert);
  }

  return (
    <React.StrictMode>
    <Link to={{ pathname:`/estudiante/puestos-de-trabajo/partners/${props.id_empresa}/jobs/${props.id_job}`, state: { EstadoDePostulacion: true, DatosEmpresa: PartnerData } }} style={{ color: 'inherit', textDecoration: 'inherit'}}> 
      <li className='MPOneJob'>
        {
          props.deleted ? <b className="MPNoDisponible"> NO DISPONIBLE </b> : <b className="MPDisponible"> DISPONIBLE </b>
        }
        <h2>{props.title}</h2>
        <h5>{PartnerData.name} - {props.city}, {props.country}</h5>
        <p>{props.description.slice(0, 250) + "..."}</p>
        <p>Modalidad: {props.pres_or_remote}</p>
      </li>
    </Link>
    </React.StrictMode>
  );
}

export { ItemJob }
