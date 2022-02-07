import React, { useEffect } from 'react';
import { AdminNav } from "../../../Navegador/AdminNav";
import TablaTrabajosDeCadaEmpresa from '../../../Componentes/Empresas/TrabajosDeCadaEmpresa/TablaTrabajosDeCadaEmpresa/TablaTrabajosDeCadaEmpresa';
import Cookies from 'universal-cookie';


const cookies = new Cookies();


function TrabajosDeCadaEmpresa() {

  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
      if (!cookies.get('admin_id')){
          window.location.href="/login/admin";
      }
  });

  return (
    <div className='TrabajosDeCadaEmpresaContainer'>
      <div className='HeaderContainer'>
        <AdminNav />
      </div>
      <div className='TablaTrabajosPorEmpresaContainer'>
        <TablaTrabajosDeCadaEmpresa />
      </div>
    </div>
  );
}

export { TrabajosDeCadaEmpresa } ;
