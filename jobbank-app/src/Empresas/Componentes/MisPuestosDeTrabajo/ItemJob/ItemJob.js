import React, { useEffect, useState } from 'react';
import './ItemJob.css';
import { Link } from 'react-router-dom';
import { helpHttp } from '../../../../helpers/helpHttp';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router';
import swal from 'sweetalert';
import apiPath from '../../../../ApiPath';


const cookies = new Cookies();
function ItemJob(props) {

  // Gets the Jobs data and saves it in AllmyJobs
  const PartnerId= cookies.get("id"); //string variable
  const history = useHistory();
  let api = helpHttp();
  let url = `${apiPath}/partners/${PartnerId}/jobs`;

  const [AllMyJobs, setAllMyJobs] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch(url);
    const partners = await data.json();
    setAllMyJobs(partners);
  }

  // Sweetalert to confirm when the user clicks in Eliminar
  const deleteData = (id) => {
    swal({
      title: "ELIMINAR TRABAJO",
      text: `¿Está seguro de eliminar el trabajo "${props.title}"?`,
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willEdit) => {
      if (willEdit) {     
        let endpoint = `${url}/${id}`;
        let options = {
          headers: { "content-type": "application/json" },
        };
        api.del(endpoint, options).then((res) => {
            let newData = AllMyJobs.filter((el) => el.id !== id);
            setAllMyJobs(newData);
        });
        swal("HAS ELIMINADO ESTE TRABAJO", {
            timer:"1500"
          });
        setTimeout(() => {
          history.go(0);
        }, 1000);
      } 
    });
  }

  return (
      <li className='MPDTOneJobeEmpresa'>
        {
          props.deleted ? <b className="MPDTNoDisponible"> EMPLEO ELIMINADO </b> : <b className="MPDTDisponible"> DISPONIBLE </b>
        }
        <h2>{props.title}</h2>
        <p>Fecha de creación: {props.created_at}</p>
        {
          props.deleted ? <p>Fecha de eliminacion: {props.deleted_at}</p> : ""
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
