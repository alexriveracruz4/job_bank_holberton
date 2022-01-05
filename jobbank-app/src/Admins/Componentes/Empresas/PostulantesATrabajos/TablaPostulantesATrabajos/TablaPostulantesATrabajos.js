import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { useLocation, useParams } from 'react-router';
import apiPath from '../../../../../ApiPath';

function PostulantesATrabajos() {
  const location = useLocation();
  let PartnerName = location.state.PartnerName;
  let JobTitle = location.state.JobTitle;

  // Table title
  let Title = "Postulantes al empleo " + JobTitle + " publicados por la empresa " + PartnerName;
  const { PartnerId, JobId } = useParams();

  let url = `${apiPath}/jobs/${PartnerId}/${JobId}/students`;

  // Columns name
  const columnas = [
    { title:'ID', field:'id', type:"numeri", textAlign:"center"},
    { title:'ELIMINADO', field:'deleted', type:"numeric", lookup:{"1":"Si", "0":"No"}},
    { title:'NOMBRE', field:'firstname'},
    { title:'APELLIDO', field:'lastname'},
    { title:'EMAIL', field:'email' },
    { title:'CELULAR', field:'phonenumber' }
  ]

  // Get data of students
  const [AllPartnerJobs, setAllPartnerJobs] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch(url);
    const jobs = await data.json();
    setAllPartnerJobs(jobs);
  }

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
            textAlign: "center",
            backgroundColor: "#F1F2F2"
          },
          paging:true,
          pageSize:9, // make initial page size
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

export default PostulantesATrabajos;