import React, { useEffect, useState } from 'react';
import './ItemJob.css';
import { Link } from 'react-router-dom';
import { helpHttp } from '../../../../helpers/helpHttp';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router';
import swal from 'sweetalert';
import apiPath from '../../../../ApiPath';
import Loader from '../../../../helpers/Loader';
import Message from '../../../../helpers/Message';


const cookies = new Cookies();
function ItemJob(props) {
  props.setCopia(props.paginaActual);
  // Gets the Jobs data and saves it in AllmyJobs
  const PartnerId= cookies.get("partner_id"); //string variable
  const history = useHistory();
  let api = helpHttp();
  let url = `${apiPath}/partners/${PartnerId}/jobs`;

  const [loadingEliminate, setLoadingEliminate] = useState(false);

  // Sweetalert to confirm when the user clicks in Eliminar
  const deleteData = (id, title) => {
    swal({
      title: "ELIMINAR TRABAJO",
      text: `¿Está seguro de eliminar el trabajo "${title}"?`,
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willEdit) => {
      if (willEdit) {    
        setLoadingEliminate(true) 
        let endpoint = `${url}/${id}`;
        let options = {
          headers: { "content-type": "application/json" },
        };
        api.del(endpoint, options).then((res) => {
          if (!res.err) {
            setLoadingEliminate(false);
            swal(`El trabajo ${title} ha sido eliminado`, {
              timer:"1500"
            });
            setTimeout(() => {
              history.go(0);
            }, 1000);
          } else {
            setLoadingEliminate(false);
            swal({
              title: "ERROR",
              text: `No se pudo elimiar el trabajo'`,
              icon: "error",
            });
          }
        });
        
      } 
    });
  }

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
    } else if ((secondDate-firstDate)/(1000*60*60) < 60) {
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
      <li className='MPDTOneJobeEmpresa'>
        {
          props.deleted ? <b className="MPDTNoDisponible"> EMPLEO ELIMINADO </b> : <b className="MPDTDisponible"> DISPONIBLE </b>     
        }
        {loadingEliminate && <Loader/>}
        <h2>{props.title}</h2>
        <p>Fecha de creación: {tiempoTranscurrido(props.created_at)}</p>
        {
          props.created_at !== props.updated_at ? <p>Última fecha de edición: {tiempoTranscurrido(props.updated_at)}</p> : ""
        }
        {
          props.deleted ? <p>Fecha de eliminacion: {tiempoTranscurrido(props.deleted_at)}</p> : ""
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
                onClick = {() => deleteData(props.JobId, props.title)}
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
