import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { useHistory, useLocation, useParams } from 'react-router';
import { helpHttp } from '../../../../../helpers/helpHttp';


function TablaTrabajosDeCadaEmpresa() {
  const location = useLocation();
  let PartnerName = location.state.PartnerName;

  let Title = "Puestos publicados por la empresa: " + PartnerName;
  let history = useHistory();
  const { PartnerId } = useParams();

  let api = helpHttp();
  let url = `http://localhost:5000/api/v1/partners/${PartnerId}/jobs`;

  const columnas = [
    { title:'ID', field:'id', type:"numeri", textAlign:"center"},
    { title:'ELIMINADO', field:'deleted', type:"numeric", lookup:{"1":"Si", "0":"No"}},
    { title:'TITULO', field:'title' },
    { title:'FECHA DE CREACION', field:'created_at'}
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
  const deleteData = ( PartnerId, JobId ) => {
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el registro con el id '${JobId}'?`
    );
  
    if (isDelete) {
      let endpoint = `http://localhost:5000/api/v1/partners/${PartnerId}/jobs/${JobId}`;
      let options = {
        headers: { "content-type": "application/json" },
      };
  
      api.del(endpoint, options).then((res) => {
          let newData = AllPartnerJobs.filter((el) => el.id !== JobId);
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
        actions={[
          {
            icon: () => <button>Postulantes</button>,
            tooltip: 'Postulantes',
            onClick: (event, rowData) => {history.push(
              {
                pathname:`/admin/empresas/trabajos/${rowData.partner_id}/${rowData.id}/estudiantes`,
                state: {PartnerName:PartnerName, JobTitle: rowData.title}
              }
            )}
          },
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

export default TablaTrabajosDeCadaEmpresa;

          /*
          {
            icon: 'edit',
            tooltip: 'editar trabajo',
            onClick: () => alert("TRABAJO EDITADO")
            
          },
          {
            icon: 'delete',
            tooltip: 'Eliminar trabajo',
            onClick: (event, rowData) => {deleteData(rowData.id)}
          },
          {
            icon:() => <button>NUEVO EMPLEO</button>,
            tooltip: "Crear una nuevo empleo",
            onClick: () => alert("NUEVO EMPLEO CREADO"),
            isFreeAction:true
          }
          */