import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router';
import { helpHttp } from '../../../../helpers/helpHttp';
import swal from 'sweetalert';
import VisibilityIcon from '@material-ui/icons/Visibility';
import apiPath from '../../../../ApiPath';
import Message from '../../../../helpers/Message';
import Loader from '../../../../helpers/Loader';


function TablaDeTodosLosTrabajos() {
  let history = useHistory();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingEliminate, setLoadingEliminate] = useState(false);
  let api = helpHttp();
  let url = `${apiPath}/jobs`;

  // Column name
  const columnas = [
    { title:'ID_TRABAJO', field:'id', type:"numeri", textAlign:"center", filtering:false},
    { title:'ID_EMPRESA', field:'partner_id', type:"numeri", textAlign:"center", filtering:false},
    { title:'ELIMINADO', field:'deleted', type:"numeric", lookup:{"1":"Si", "0":"No"}, filtering:true},
    { title:'TITULO', field:'title', filtering:false}
  ]

  // Get all the jobs data and save to AllJobs
  const [AllJobs, setAllJobs] = useState([]);


  useEffect(() => {
    const obtenerDatos = async () => {
      //setLoading(true);
      api.get(url).then((res) => {
        console.log(res);
        if (!res.err) {
          const datos = res.data;
          setAllJobs(datos);
          setError(null)
        } else {
          setAllJobs(null);
          setError(res);
        }
        setLoading(false);
      })
    };
    obtenerDatos();
  }, []);

  // Sweetalert to confirm removal of job
  const deleteData = (PartnerId, JobId, TitleJob, isDeleted) => {
    swal({
      title: "ELIMINAR TRABAJO",
      text: `¿Está seguro de eliminar los datos del trabajo "${TitleJob}"?`,
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        if (isDeleted === 1) {
          swal({
            title: "Error",
            text: `El trabajo ${TitleJob} ya está eliminado`,
            icon: "warning",
          });
          return 0;
        }
        setLoadingEliminate(true)
        let endpoint = `${apiPath}/partners/${PartnerId}/jobs/${JobId}`;
        let options = {
          headers: { "content-type": "application/json" },
        };
        api.del(endpoint, options).then((res) => {
          if (!res.err) {
            let newData = AllJobs.filter((el) => el.id !== JobId);
            setAllJobs(newData);
            setLoadingEliminate(false);
            swal(`El trabajo ${TitleJob} ha sido eliminado`, {
              timer:"1500"
            });
            setTimeout(() => {
              history.go(0);
            }, 1000);
          } else {
            setLoadingEliminate(false);
            swal({
              title: "ERROR",
              text: `No se pudo eliminar el trabajo'`,
              icon: "error",
            });
          }
        });
        
      } 
    });
  }

  const restoreData = (data) => {
    swal({
      title: "RESTAURAR TRABAJO",
      text: `¿Está seguro de restaurar los datos del trabajo "${data.title}""?`,
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {   
        if (data.deleted === 0) {
          swal({
            title: "Error",
            text: `El trabajo ${data.title} está funcionando`,
            icon: "warning",
          });
          return 0;
        }
        data.deleted = 0;
        setLoadingEliminate(true);
        let endpoint = `${apiPath}/partners/${data.partner_id}/jobs/${data.id}`;
        let options = {
          body: data,
          headers: { "content-type": "application/json" },
        };
        api.put(endpoint, options).then((res) => {
          if (!res.err) {
            //let newData = AllPartnersData.map((el) => el.id === data.id ? data:el);
            //setAllPartnersData(newData);
            setLoadingEliminate(false);
            swal(`El trabajo ${data.title} ha sido restaurado.`, {
              timer:"1500"
            });
            setTimeout(() => {
              history.go(0);
            }, 1000);
          } else {
            setLoadingEliminate(false);
            swal({
              title: "ERROR",
              text: `No se pudo restaurar el trabajo ${data.title}`,
              icon: "error",
            });
          }
        });
      }
    });
  }


  return (
    <React.StrictMode>
      {error && <Message/>}
      {loadingEliminate && <Loader/>}
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
          rowData => ({
            icon: rowData.deleted ? 'restore' : 'delete',
            tooltip: rowData.deleted ? 'Restaurar empleo' : 'Eliminar empleo',
            onClick: (event, rowData) => {
              rowData.deleted ?
                restoreData(rowData)
              :
                deleteData(rowData.partner_id, rowData.id, rowData.title, rowData.deleted)
            }
          })
        ]}
        isLoading={loading}
        options={{
          loadingType: "overlay",
          filtering:true,
          actionsColumnIndex: -1,
          cellStyle: {
            textAlign: "center"
          },
          headerStyle: {
            textAlign: "center",
            backgroundColor: "#F1F2F2"
          },
          paging:true,
          pageSize:10,// make initial page size
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