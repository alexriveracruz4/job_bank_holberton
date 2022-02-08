import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router';
import { helpHttp } from '../../../../../helpers/helpHttp';
import swal from 'sweetalert';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import apiPath from '../../../../../ApiPath';
import Message from '../../../../../helpers/Message';
import Loader from '../../../../../helpers/Loader';


function TablaEstudiante() {
  let history = useHistory();

  let api = helpHttp();
  let url = `${apiPath}/students`;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingEliminate, setLoadingEliminate] = useState(false);

  // Column name
  const columnas = [
    { title:'ID', field:'student_id', type:"numeric", textAlign:"center", filtering:false},
    { title:'ELIMINADO', field:'deleted', filtering:true,lookup:{"1":"Si", "0":"No"}},
    { title:'NOMBRE', field:'firstname', filtering:false},
    { title:'APELLIDO', field:'lastname', filtering:false},
    { title:'EMAIL', field:'email', filtering:false },
    { title:'CELULAR', field:'phonenumber' , filtering:false}
  ]

  // Get all student data and save to AllPartnersData
  const [AllPartnersData, setAllPartnersData] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      //setLoading(true);
      api.get(url).then((res) => {
        if (!res.err) {
          setAllPartnersData(res.data);
          setError(null)
        } else {
          setAllPartnersData(null);
          setError(res);
        }
        setLoading(false);
      })
    };
    obtenerDatos();
  }, []);

  // Sweetalert to confirm removal of student
  const deleteData = (id, name, lastname, isDeleted) => {
    swal({
      title: "ELIMINAR ESTUDIANTE",
      text: `¿Está seguro de eliminar los datos del estudiante "${name} ${lastname}"?`,
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willEdit) => {
      if (willEdit) {     
        if (isDeleted === 1) {
          swal({
            title: "Error",
            text: `El usuario ${name} ${lastname} ya está eliminado`,
            icon: "warning",
          });
          return 0;
        }
        setLoadingEliminate(true);
        let endpoint = `${url}/${id}`;
        let options = {
          headers: { "content-type": "application/json" },
        };
        api.del(endpoint, options).then((res) => {
          if (!res.err) {
            let newData = AllPartnersData.filter((el) => el.id !== id);
            setAllPartnersData(newData);
            setLoadingEliminate(false);
            swal(`El usuario ${name} ${lastname} ha sido eliminado.`, {
              timer:"1500"
            });
            setTimeout(() => {
              history.go(0);
            }, 1000);
          } else {
            setLoadingEliminate(false);
            swal({
              title: "ERROR",
              text: `No se pudo eliminar al estudiante'`,
              icon: "error",
            });
          }
        });
        
      } 
    });
  }
  
  const restoreData = (data) => {
    swal({
      title: "RESTAURAR ESTUDIANTE",
      text: `¿Está seguro de restaurar los datos del estudiante "${data.firstname} ${data.lastname}"?`,
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {   
        if (data.deleted === 0) {
          swal({
            title: "Error",
            text: `El usuario ${data.firstname} ${data.lastname} está funcionando`,
            icon: "warning",
          });
          return 0;
        }
        data.deleted = 0;
        setLoadingEliminate(true);
        let endpoint = `${url}/${data.student_id}`;
        let options = {
          body: data,
          headers: { "content-type": "application/json" },
        };
        api.put(endpoint, options).then((res) => {
          if (!res.err) {
            let newData = AllPartnersData.map((el) => el.student_id === data.student_id ? data:el);
            setAllPartnersData(newData);
            setLoadingEliminate(false);
            swal(`El usuario ${data.firstname} ${data.lastname} ha sido restaurada.`, {
              timer:"1500"
            });
            setTimeout(() => {
              history.go(0);
            }, 1000);
          } else {
            setLoadingEliminate(false);
            swal({
              title: "ERROR",
              text: `No se pudo restaurar al usuario ${data.firstname} ${data.lastname}"`,
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
        data={AllPartnersData}
        title="ESTUDIANTES"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar estudiante',
            onClick: (event, rowData) => {history.push(
              {
                pathname:`/admin/estudiantes/estudiante-editado/${rowData.student_id}`,
                state: AllPartnersData.filter((el)=> el.student_id === rowData.student_id)
              })}
          },
          rowData => ({
            icon: rowData.deleted ? 'restore' : 'delete',
            tooltip: rowData.deleted ? 'Restaurar estudiante' : 'Eliminar estudiante',
            onClick: (event, rowData) => {
              rowData.deleted ?
                restoreData(rowData)
              :
                deleteData(rowData.student_id, rowData.firstname, rowData.lastname, rowData.deleted)
            }
          }),
          {
            icon:() => <AddCircleIcon fontSize="large"/>,
            tooltip: "Crear estudiante",
            onClick: (e) => {history.push(`/admin/estudiantes/crear-estudiante`)},
            isFreeAction:true
          }
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