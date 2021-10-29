import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router';
import { helpHttp } from '../../../../../helpers/helpHttp';
import swal from 'sweetalert';
import AddCircleIcon from '@material-ui/icons/AddCircle';

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
    { title:'CELULAR', field:'phonenumber' }
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

  const deleteData = (id, name, lastname) => {
    swal({
      title: "ELIMINAR ESTUDIANTE",
      text: `¿Está seguro de eliminar los datos del estudiante "${name} ${lastname}"?`,
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willEdit) => {
      if (willEdit) {     
        let endpoint = `${url}/${id}`;
        let options = {
          headers: { "content-type": "application/json" },
        };
        api.del(endpoint, options).then((res) => {
            let newData = AllPartnersData.filter((el) => el.id !== id);
            setAllPartnersData(newData);
        });
        swal("EL ESTUDIANTE HA SIDO ELIMINADO", {
            timer:"1500"
          });
        setTimeout(() => {
          history.go(0);
        }, 1000);
      } 
    });
  }

  /*
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
  */

  return (
    <React.StrictMode>
      <MaterialTable
        columns={columnas}
        data={AllPartnersData}
        title="ESTUDIANTES"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar estudiante',
            onClick: (event, rowData) => {history.push(
              {
                pathname:`/admin/estudiantes/estudiante-editado/${rowData.id}`,
                state: AllPartnersData.filter((trabajo)=> trabajo.id === rowData.id)
              })}
          },
          {
            icon: 'delete',
            tooltip: 'Eliminar estudiante',
            onClick: (event, rowData) => {deleteData(rowData.id, rowData.firstname, rowData.lastname)}
          },
          {
            icon:() => <AddCircleIcon fontSize="large"/>,
            tooltip: "Crear estudiante",
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

export default TablaEstudiante;