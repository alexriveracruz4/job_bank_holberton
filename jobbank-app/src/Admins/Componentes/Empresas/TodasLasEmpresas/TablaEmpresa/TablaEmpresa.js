import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router';
import { helpHttp } from '../../../../../helpers/helpHttp';
import swal from 'sweetalert';
import ChevronRight from '@material-ui/icons/ChevronRight';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import apiPath from '../../../../../ApiPath';
import Message from '../../../../../helpers/Message';
import Loader from '../../../../../helpers/Loader';


function TablaEmpresa() {
  let history = useHistory();

  let api = helpHttp();
  let url = `${apiPath}/partners`;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingEliminate, setLoadingEliminate] = useState(false);
  // Columns name
  const columnas = [
    { title:'ID', field:'partner_id', type:"numeric", textAlign:"center", filtering:false},
    { title:'ELIMINADO', field:'deleted', filtering:true,lookup:{1:"Si", 0:"No"},defaultFilter:false},
    { title:'EMPRESA', field:'name', filtering:false},
    { title:'EMAIL', field:'email' , filtering:false}
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
      title: "ELIMINAR EMPRESA",
      text: `¿Está seguro de eliminar los datos de la empresa "${name}"?`,
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {   
        if (isDeleted === 1) {
          swal({
            title: "Error",
            text: `La empresa ${name} ya está eliminada`,
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
            swal(`La empresa ${name} ha sido eliminado.`, {
              timer:"1500"
            });
            setTimeout(() => {
              history.go(0);
            }, 1000);
          } else {
            setLoadingEliminate(false);
            swal({
              title: "ERROR",
              text: `No se pudo eliminar la empresa'`,
              icon: "error",
            });
          }
        });
        
      } 
    });
  }

  const restoreData = (data) => {
    swal({
      title: "RESTAURAR EMPRESA",
      text: `¿Está seguro de restaurar los datos de la empresa "${data.name}"?`,
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {   
        if (data.deleted === 0) {
          swal({
            title: "Error",
            text: `La empresa ${data.name} está funcionando`,
            icon: "warning",
          });
          return 0;
        }
        data.deleted = 0;
        setLoadingEliminate(true);
        let endpoint = `${url}/${data.partner_id}`;
        let options = {
          body: data,
          headers: { "content-type": "application/json" },
        };
        api.put(endpoint, options).then((res) => {
          if (!res.err) {
            let newData = AllPartnersData.map((el) => el.partner_id === data.partner_id ? data:el);
            setAllPartnersData(newData);
            setLoadingEliminate(false);
            swal(`La empresa ${data.name} ha sido restaurada.`, {
              timer:"1500"
            });
            setTimeout(() => {
              history.go(0);
            }, 1000);
          } else {
            setLoadingEliminate(false);
            swal({
              title: "ERROR",
              text: `No se pudo restaurar la empresa "${data.name}"'`,
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
        title="EMPRESAS"

        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar empresa',
            onClick: (event, rowData) => {history.push(
              {
                pathname:`/admin/empresas/empresa-editada/${rowData.partner_id}`,
                state: AllPartnersData.filter((trabajo)=> trabajo.partner_id === rowData.partner_id)
              })}
          },
          rowData => ({
            icon: rowData.deleted ? 'restore' : 'delete',
            tooltip: rowData.deleted ? 'Recrear empresa' : 'Eliminar empresa',
            onClick: (event, rowData) => {
              rowData.deleted ?
                restoreData(rowData)
              :
                deleteData(rowData.partner_id, rowData.name, rowData.deleted)
            }
          }),
          {
            icon: () => <ChevronRight/>,
            tooltip: 'Trabajos publicados',
            onClick: (event, rowData) => {history.push(
              {
                pathname:`/admin/empresas/trabajos/${rowData.id}`,
                state: {PartnerName:rowData.name}
              }
            )}
          },
          {
            icon: () => <AddCircleIcon fontSize="large"/>,
            tooltip: "Crear una nueva empresa",
            onClick: (e) => {history.push(`/admin/empresas/crear-empresa`)},
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

export default TablaEmpresa;