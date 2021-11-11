import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router';
import { helpHttp } from '../../../../../helpers/helpHttp';
import swal from 'sweetalert';
import ChevronRight from '@material-ui/icons/ChevronRight';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import apiPath from '../../../../../ApiPath';

function TablaEmpresa() {
  let history = useHistory();

  let api = helpHttp();
  let url = `${apiPath}/partners`;

  // Columns name
  const columnas = [
    { title:'ID', field:'id', type:"numeri", textAlign:"center"},
    { title:'ELIMINADO', field:'deleted', type:"numeric", lookup:{"1":"Si", "0":"No"}},
    { title:'EMPRESA', field:'name'},
    { title:'EMAIL', field:'email' }
  ]

  // Get partners data and save to AllPartnersData
  const [AllPartnersData, setAllPartnersData] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await fetch(url);
    const partners = await data.json();
    setAllPartnersData(partners);
  }

  // Sweetalert to confirm removal of partner
  const deleteData = (id, name) => {
    swal({
      title: "ELIMINAR EMPRESA",
      text: `¿Está seguro de eliminar los datos de la empresa "${name}"?`,
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {     
        let endpoint = `${url}/${id}`;
        let options = {
          headers: { "content-type": "application/json" },
        };
        api.del(endpoint, options).then((res) => {
            let newData = AllPartnersData.filter((el) => el.id !== id);
            setAllPartnersData(newData);
        });
        swal("HAS ELIMINADO UNA EMPRESA", {
            timer:"1500"
          });
        setTimeout(() => {
          history.go(0);
        }, 1000);
      } 
    });
  }

  return (
    <React.StrictMode>
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
                pathname:`/admin/empresas/empresa-editada/${rowData.id}`,
                state: AllPartnersData.filter((trabajo)=> trabajo.id === rowData.id)
              })}
          },
          {
            icon: 'delete',
            tooltip: 'Eliminar empresa',
            onClick: (event, rowData) => {deleteData(rowData.id, rowData.name)}
          },
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

export default TablaEmpresa;