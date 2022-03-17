import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { useLocation, useParams } from 'react-router';
import apiPath from '../../../../../ApiPath';
import { helpHttp } from '../../../../../helpers/helpHttp';
import Message from '../../../../../helpers/Message';


function PostulantesATrabajos() {
  const location = useLocation();
  let PartnerName = location.state.PartnerName;
  let JobTitle = location.state.JobTitle;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // Table title
  let Title = PartnerName + " - " + "Postulantes al empleo: " + JobTitle;
  const { PartnerId, JobId } = useParams();

  let api = helpHttp();
  let url = `${apiPath}/jobs/${PartnerId}/${JobId}/students`;

  // Columns name
  const columnas = [
    { title:'ID', field:'student_id', type:"numeri", textAlign:"center"},
    { title:'ELIMINADO', field:'deleted', type:"numeric", lookup:{"1":"Si", "0":"No"}},
    { title:'NOMBRE', field:'firstname'},
    { title:'APELLIDO', field:'lastname'},
    { title:'EMAIL', field:'email' },
    { title:'CELULAR', field:'phonenumber' }
  ]

  // Get data of students
  const [AllPartnerJobs, setAllPartnerJobs] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      //setLoading(true);
      api.get(url).then((res) => {
        if (!res.err) {
          setAllPartnerJobs(res.data);
          setError(null)
        } else {
          setAllPartnerJobs(null);
          setError(res);
        }
        setLoading(false);
      })
    };
    obtenerDatos();
  }, []);

  console.log(AllPartnerJobs);
  return (
    <React.StrictMode>
      {error && <Message/>}
      <MaterialTable
        columns={columnas}
        data={AllPartnerJobs}
        title={Title}
        isLoading={loading}
        options={{
          loadingType: "overlay",
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