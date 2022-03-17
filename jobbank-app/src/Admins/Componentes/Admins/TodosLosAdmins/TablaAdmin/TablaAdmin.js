import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router';
import { helpHttp } from '../../../../../helpers/helpHttp';
import swal from 'sweetalert';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import apiPath from '../../../../../ApiPath';
import Message from '../../../../../helpers/Message';
import Loader from '../../../../../helpers/Loader';
import Cookies from 'universal-cookie';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const cookies = new Cookies();
function TablaAdmin() {

  let admin_id_cookies = cookies.get("admin_id");
  console.log(admin_id_cookies);
  let history = useHistory();

  let api = helpHttp();
  let url = `${apiPath}/admins`;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingEliminate, setLoadingEliminate] = useState(false);
  // Columns name
  const columnas = [
    { title:'ID', field:'admin_id', type:"numeri", textAlign:"center", filtering:false},
    { title:'ELIMINADO', field:'deleted', type:"numeric", lookup:{1:"Si", 0:"No"}, filtering:true,},
    { title:'NOMBRE', field:'firstname', filtering:false},
    { title:'APELLIDO', field:'lastname', filtering:false},
    { title:'EMAIL', field:'email', filtering:false}
  ]

  // Get partners data and save to AllPartnersData
  const [AllPartnersData, setAllPartnersData] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      //setLoading(true);
      api.get(url).then((res) => {
        if (!res.err) {
          setAllPartnersData(res);
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


  // Sweetalert to confirm removal of partner
  const deleteData = (id, firstname, lastname, isDeleted) => {
    swal({
      title: "ELIMINAR ADMINISTRADOR",
      text: `¿Está seguro de eliminar los datos del administrador "${firstname} ${lastname}"?`,
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {   
        if (isDeleted === 1) {
          swal({
            title: "Error",
            text: `El administrador "${firstname} ${lastname}" ya está eliminado`,
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
            swal(`La administrador "${firstname} ${lastname}" ha sido eliminado.`, {
              timer:"1500"
            });
            setTimeout(() => {
              history.go(0);
            }, 1000);
          } else {
            setLoadingEliminate(false);
            swal({
              title: "ERROR",
              text: `No se pudo eliminar al administrador'`,
              icon: "error",
            });
          }
        });
        
      } 
    });
  }

  const restoreData = (data) => {
    swal({
      title: "RESTAURAR ADMINISTRADOR",
      text: `¿Está seguro de restaurar los datos del admin "${data.firstname} ${data.lastname}"?`,
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {   
        if (data.deleted === 0) {
          swal({
            title: "Error",
            text: `La empresa "${data.firstname} ${data.lastname}" está funcionando`,
            icon: "warning",
          });
          return 0;
        }
        data.deleted = 0;
        setLoadingEliminate(true);
        let endpoint = `${url}/${data.admin_id}`;
        let options = {
          body: data,
          headers: { "content-type": "application/json" },
        };
        api.put(endpoint, options).then((res) => {
          if (!res.err) {
            let newData = AllPartnersData.map((el) => el.admin_id === data.admin_id ? data:el);
            setAllPartnersData(newData);
            setLoadingEliminate(false);
            swal(`El admin "${data.firstname} ${data.lastname}" ha sido restaurado.`, {
              timer:"3000"
            });
            setTimeout(() => {
              history.go(0);
            }, 1000);
          } else {
            setLoadingEliminate(false);
            swal({
              title: "ERROR",
              text: `No se pudo restaurar al admin "${data.firstname} ${data.lastname}"`,
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
        title="ADMINISTRADORES"

        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar administrador',
            onClick: (event, rowData) => {history.push(
              {
                pathname:`/admin/admins/admin-editado/${rowData.admin_id}`,
                state: AllPartnersData.filter((el)=> el.admin_id === rowData.admin_id)
              })}
          },
          rowData => ({
            icon: rowData.deleted ? 'restore' : 'delete',
            tooltip: rowData.deleted ? 'Recrear admin' : 'Eliminar admin',
            onClick: (event, rowData) => {
              if (parseInt(admin_id_cookies) === rowData.admin_id) {
                swal({
                  title: "ERROR",
                  text: `Lo sentimos, no esta permitido eliminar su propia cuenta.`,
                  icon: "error",
                  timer: "1500"
                });
              } else {
                rowData.deleted 
                ?
                  restoreData(rowData)
                :
                  deleteData(rowData.admin_id, rowData.firstname, rowData.lastname, rowData.deleted)
              }
            }
          }),
          {
            icon: () => <AddCircleIcon fontSize="large"/>,
            tooltip: "Crear un nuevo admin",
            onClick: (e) => {history.push(`/admin/admins/crear-admin`)},
            isFreeAction:true
          },
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

export default TablaAdmin;