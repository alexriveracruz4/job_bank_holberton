import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { useHistory, useLocation, useParams } from 'react-router';
import { helpHttp } from '../../../../../helpers/helpHttp';


function PostulantesATrabajos() {
  const location = useLocation();
  let PartnerName = location.state.PartnerName;
  let JobTitle = location.state.JobTitle;


  let Title = "Postulantes al empleo " + JobTitle + " publicados por la empresa " + PartnerName;
  let history = useHistory();
  const { PartnerId, JobId } = useParams();


  let api = helpHttp();
  let url = `http://localhost:5000/api/v1/jobs/${PartnerId}/${JobId}/students`;

  const columnas = [
    { title:'ID', field:'id', type:"numeri", textAlign:"center"},
    { title:'ELIMINADO', field:'deleted', type:"numeric", lookup:{"1":"Si", "0":"No"}},
    { title:'NOMBRE', field:'firstname'},
    { title:'APELLIDO', field:'lastname'},
    { title:'EMAIL', field:'email' },
    { title:'CELULAR', field:'phonenumber' }
  ]

  const [AllPartnerJobs, setAllPartnerJobs] = useState([]);

  useEffect(() => {
    obtenerDatos();
    console.log("object");
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch(url);
    const jobs = await data.json();
    setAllPartnerJobs(jobs);
  }

  /*
  const deleteData = (id) => {
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el registro con el id = '${id}'?`
    );
  
    if (isDelete) {
      let endpoint = `http://localhost:5000/api/v1/students/${id}`;
      let options = {
        headers: { "content-type": "application/json" },
      };
  
      api.del(endpoint, options).then((res) => {
          let newData = AllPartnerJobs.filter((el) => el.id !== id);
          setAllPartnerJobs(newData);
      });
    } else {
      return;
    }
  };

  */
  return (
    <React.StrictMode>
      <MaterialTable
        columns={columnas}
        data={AllPartnerJobs}
        title={Title}
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


/*
          actions={[
          {
            icon: 'edit',
            tooltip: 'Editar estudiante',
            onClick: () => alert("TRABAJO EDITADO")
            
          },
          {
            icon: 'delete',
            tooltip: 'Eliminar estudiante',
            onClick: (event, rowData) => {deleteData(rowData.id)}
          },
          ]}
*/
export default PostulantesATrabajos;