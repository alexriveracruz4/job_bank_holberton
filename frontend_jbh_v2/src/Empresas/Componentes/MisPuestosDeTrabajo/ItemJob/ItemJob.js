import React, { useEffect, useState } from 'react';
import './ItemJob.css';
import { Link } from 'react-router-dom';
import { helpHttp } from '../../../../helpers/helpHttp';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
function ItemJob(props) {
  const PartnerId= cookies.get("id"); //string variable
  let api = helpHttp();
  let url = `http://localhost:5000/api/v1/partners/${PartnerId}/jobs`;

  const [AllMyJobs, setAllMyJobs] = useState([]);

  console.log( "jobid",props.JobId );
  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch(url);
    const partners = await data.json();
    setAllMyJobs(partners);
  }
  console.log("datos", AllMyJobs);

  const deleteData = (id) => {
  
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el registro con el id '${id}'?`
    );
  
    if (isDelete) {
      let endpoint = `${url}/${id}`;
      let options = {
        headers: { "content-type": "application/json" },
      };
  
      api.del(endpoint, options).then((res) => {
          let newData = AllMyJobs.filter((el) => el.id !== id);
          setAllMyJobs(newData);
      });
    } else {
      return;
    }
  };

  return (
      <li className='MPDTOneJobeEmpresa'>
        {
          props.deleted ? <b className="MPDTNoDisponible"> EMPLEO ELIMINADO </b> : <b className="MPDTDisponible"> DISPONIBLE </b>
        }
        <h2>{props.title}</h2>
        <p>Fecha de creación: FECHA DE CREACION</p>
        {
          props.deleted ? <p>Fecha de eliminacion: FECHA DE ELIMINACION</p> : ""
        }
        <div class="MPDTGroupOfButtons">
          <Link to={{ pathname:`/empresa/mis-puestos-de-trabajo/${props.JobId}` }} style={{color: 'inherit', textDecoration: 'inherit'}}>
          <button className="MPDTVerButton">
              Ver    
          </button>
          </Link>
          {
            props.deleted ? 
            "" : 
            <Link to={`/empresa/mis-puestos-de-trabajo/`} style={{color: 'inherit', textDecoration: 'inherit'}}>
              <button className="MPDTEliminarButton"
                onClick = {() => deleteData(props.JobId)}
              >
                Eliminar
              </button>
            </Link>
          }
          {
            props.deleted ? 
            "" : 
            <Link to={`/empresa/mis-puestos-de-trabajo/${props.JobId}/puesto-editado`} style={{color: 'inherit', textDecoration: 'inherit'}}>
              <button className="MPDTEditarButton">
                Editar
              </button>
            </Link>
          }
          <Link to={{ pathname:`/empresa/mis-puestos-de-trabajo/${props.JobId}/postulantes`, state: { titleJob: props.title } }} style={{color: 'inherit', textDecoration: 'inherit'}}>
              <button className="MPDTPostulantesButton">
              Ver postulantes
              </button>
          </Link>
        </div>
      </li>
  );
}

export { ItemJob };
