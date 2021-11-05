import React from 'react';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router';
import { helpHttp } from '../../../../helpers/helpHttp';
import swal from 'sweetalert';
import VisibilityIcon from '@material-ui/icons/Visibility';
import apiPath from '../../../../ApiPath';

function TablaDeTodosLosTrabajos() {
  let history = useHistory();

  let api = helpHttp();
  let url = `${apiPath}/jobs`;

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

  const deleteData = (PartnerId, JobId, TitleJob) => {
    swal({
      title: "ELIMINAR TRABAJO",
      text: `¿Está seguro de eliminar los datos del trabajo "${TitleJob}"?`,
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {     
        let endpoint = `${apiPath}/partners/${PartnerId}/jobs/${JobId}`;
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

  return (
    <React.StrictMode>
      <MaterialTable
        columns={columnas}
        data={AllJobs}
        title="TODOS LOS TRABAJOS"
        actions={[
          {
            icon: () => <VisibilityIcon />,
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
            textAlign: "center",
            backgroundColor: "#F1F2F2"
          },
          paging:true,
          pageSize:9,       // make initial page size
          pageSizeOptions:[10,20,30,50],
        }}
        localization={{
          header:{
            actions: ''
          }
        }}
      />
    </React.StrictMode>
  );
}

export default TablaDeTodosLosTrabajos;