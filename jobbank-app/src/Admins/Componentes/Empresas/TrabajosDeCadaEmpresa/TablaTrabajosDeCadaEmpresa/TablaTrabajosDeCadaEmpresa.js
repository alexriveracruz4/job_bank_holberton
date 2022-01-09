import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { useHistory, useLocation, useParams } from 'react-router';
import ChevronRight from '@material-ui/icons/ChevronRight';
import apiPath from '../../../../../ApiPath';
import Message from '../../../../../helpers/Message';
import { helpHttp } from '../../../../../helpers/helpHttp';


function TablaTrabajosDeCadaEmpresa() {
  const location = useLocation();
  let PartnerName = location.state.PartnerName;

  let Title = "Puestos publicados por la empresa: " + PartnerName;
  let history = useHistory();
  const { PartnerId } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  let api = helpHttp();
  // api path to jobs of partner
  let url = `${apiPath}/partners/${PartnerId}/jobs`;

  // Columns name
  const columnas = [
    { title:'ID', field:'id', type:"numeri", textAlign:"center"},
    { title:'ELIMINADO', field:'deleted', type:"numeric", lookup:{"1":"Si", "0":"No"}},
    { title:'TITULO', field:'title' },
    { title:'FECHA DE CREACION', field:'created_at'}
  ]

  // Get all partner jobs and save to AllPartnerJobs
  const [AllPartnerJobs, setAllPartnerJobs] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      //setLoading(true);
      api.get(url).then((res) => {
        if (!res.err) {
          const datos = res.data;
          setAllPartnerJobs(datos);
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

  return (
    <React.StrictMode>
      {error && <Message/>}
      <MaterialTable
        columns={columnas}
        data={AllPartnerJobs}
        title={Title}
        actions={[
          {
            icon: () => <ChevronRight/>,
            tooltip: 'Postulantes',
            onClick: (event, rowData) => {history.push(
              {
                pathname:`/admin/empresas/trabajos/${rowData.partner_id}/${rowData.id}/estudiantes`,
                state: {PartnerName:PartnerName, JobTitle: rowData.title}
              }
            )}
          },
        ]}
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

export default TablaTrabajosDeCadaEmpresa;