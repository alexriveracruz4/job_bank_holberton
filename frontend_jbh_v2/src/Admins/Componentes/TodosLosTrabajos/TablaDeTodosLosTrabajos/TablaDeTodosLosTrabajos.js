import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router';
import { helpHttp } from '../../../../helpers/helpHttp';
import swal from 'sweetalert';


function TablaDeTodosLosTrabajos() {
  let history = useHistory();

  let api = helpHttp();
  let url = "http://localhost:5000/api/v1/jobs";

  const columnas = [
    { title:'ID_TRABAJO', field:'id', type:"numeri", textAlign:"center"},
    { title:'ID_EMPRESA', field:'partner_id', type:"numeri", textAlign:"center"},
    { title:'ELIMINADO', field:'deleted', type:"numeric", lookup:{"1":"Si", "0":"No"}},
    { title:'TITULO', field:'title'}
  ]

  const [AllJobs, setAllJobs] = React.useState([]);

  React.useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch(url);
    const jobs = await data.json();
    setAllJobs(jobs);
  }

  /*
  const deleteData = (PartnerId, JobId) => {
  
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el registro con el id ${JobId}`
    );
  
    if (isDelete) {
      let endpoint = `http://localhost:5000/api/v1/partners/${PartnerId}/jobs/${JobId}`;
      let options = {
        headers: { "content-type": "application/json" },
      };
  
      api.del(endpoint, options).then((res) => {
          let newData = AllJobs.filter((el) => el.id !== JobId);
          setAllJobs(newData);
      });
    } else {
      return;
    }
  };
*/

  const deleteData = (PartnerId, JobId, TitleJob) => {
    swal({
      title: "ELIMINAR TRABAJO",
      text: `¿Está seguro de eliminar los datos del trabajo "${TitleJob}"?`,
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {     
        let endpoint = `http://localhost:5000/api/v1/partners/${PartnerId}/jobs/${JobId}`;
        let options = {
          headers: { "content-type": "application/json" },
        };
      
        api.del(endpoint, options).then((res) => {
            let newData = AllJobs.filter((el) => el.id !== JobId);
            setAllJobs(newData);
        });
        swal("EL PUESTO DE TRABAJO HA SIDO ELIMINADO", {
            timer:"1500"
          });
        setTimeout(() => {
          history.go(0);
        }, 1000);
      } 
    });
  }

//state: AllPartnersData.filter((trabajo)=> trabajo.id === rowData.id)
  return (
    <React.StrictMode>
      <MaterialTable
        columns={columnas}
        data={AllJobs}
        title="TODOS LOS TRABAJOS"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Ver trabajo',
            onClick: (event, rowData) => {history.push(
              {
                pathname:`/admin/todos-los-trabajos/ver-trabajo/${rowData.partner_id}/${rowData.id}`,
                state: {partner_id:rowData.partner_id}
              })}
          },
          {
            icon: 'delete',
            tooltip: 'Eliminar trabajo',
            onClick: (event, rowData) => {deleteData(rowData.partner_id, rowData.id, rowData.title)}
          }
        ]}
        
        options={{
          actionsColumnIndex: -1,
          cellStyle: {
            textAlign: "center"
          },
          headerStyle: {
            textAlign: "center"
        }
        }}
        localization={{
          header:{
            actions: 'ACCIONES'
          }
        }}
      />
    </React.StrictMode>
  );
}

export default TablaDeTodosLosTrabajos;