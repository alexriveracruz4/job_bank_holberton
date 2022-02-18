import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router';
import { helpHttp } from '../../../../../helpers/helpHttp';
import swal from 'sweetalert';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import apiPath from '../../../../../ApiPath';
import Message from '../../../../../helpers/Message';
import Loader from '../../../../../helpers/Loader';


function TablaAdmin() {
  let history = useHistory();

  let api = helpHttp();
  let url = `${apiPath}/admins`;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingEliminate, setLoadingEliminate] = useState(false);
  // Columns name
  const columnas = [
    { title:'ID', field:'admin_id', type:"numeri", textAlign:"center", filtering:false},
    { title:'ELIMINADO', field:'deleted', type:"numeric", lookup:{"1":"Si", "0":"No"}, filtering:true},
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
  const deleteData = (id, name, isDeleted) => {
    swal({
      title: "ELIMINAR ADMINISTRADOR",
      text: `¿Está seguro de eliminar los datos del administrador "${name}"?`,
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {   
        if (isDeleted === 1) {
          swal({
            title: "Error",
            text: `El administrador ${name} ya está eliminado`,
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
            swal(`La administrador ${name} ha sido eliminado.`, {
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
          {
            icon: 'delete',
            tooltip: 'Eliminar admin',
            onClick: (event, rowData) => {deleteData(rowData.admin_id, rowData.name, rowData.deleted)}
          },
          {
            icon: () => <AddCircleIcon fontSize="large"/>,
            tooltip: "Crear un nuevo admin",
            onClick: (e) => {history.push(`/admin/admins/crear-admin`)},
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

export default TablaAdmin;