import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router';
import { helpHttp } from '../../../../../helpers/helpHttp';



function TablaEstudiante() {
  let history = useHistory();

  let api = helpHttp();
  let url = "http://localhost:5000/api/v1/students";

  const columnas = [
    { title:'ID', field:'id', type:"numeri", textAlign:"center"},
    { title:'ELIMINADO', field:'deleted', type:"numeric", lookup:{"1":"Si", "0":"No"}},
    { title:'NOMBRE', field:'firstname'},
    { title:'APELLIDO', field:'lastname'},
    { title:'EMAIL', field:'email' },
    { title:'TOKEN', field:'token' }
  ]

  const [AllPartnersData, setAllPartnersData] = React.useState([]);

  React.useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch(url);
    const partners = await data.json();
    setAllPartnersData(partners);
  }

  const deleteData = (id) => {
  
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el registro con el id '${id}'?`
    );
  
    if (isDelete) {
      let endpoint = `${url}/${id}`;
      let options = {
        headers: { "content-type": "application/json" },
      };
  
      api.del(endpoint, options).then((res) => {
          let newData = AllPartnersData.filter((el) => el.id !== id);
          setAllPartnersData(newData);
      });
    } else {
      return;
    }
  };

  return (
    <React.StrictMode>
      <MaterialTable
        columns={columnas}
        data={AllPartnersData}
        title="EMPRESAS"

        actions={[
          {
            icon: 'edit',
            tooltip: 'editar empresa',
            onClick: (event, rowData) => {history.push(
              {
                pathname:`/admin/estudiantes/estudiante-editado/${rowData.id}`,
                state: AllPartnersData.filter((trabajo)=> trabajo.id === rowData.id)
              })}
          },
          {
            icon: 'delete',
            tooltip: 'Eliminar empresa',
            onClick: (event, rowData) => {deleteData(rowData.id)}
          },
          {
            icon:() => <button>NUEVO</button>,
            tooltip: "Crear una nueva empresa",
            onClick: (e) => {history.push(`/admin/estudiantes/crear-estudiante`)},
            isFreeAction:true
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
      />
    </React.StrictMode>
  );
}

export default TablaEstudiante;