import React, { useEffect } from 'react'
import { AdminNav } from "../../../Navegador/AdminNav";
import TablaEmpresa from '../../../Componentes/Empresas/TodasLasEmpresas/TablaEmpresa/TablaEmpresa';
import Cookies from 'universal-cookie';


const cookies = new Cookies();

function TodasLasEmpresas() {

  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
      if (!cookies.get('admin_id')){
	  window.location.href="/login/admin";
      }
  });

  return (
    <div className='Admin-empresas-div'>
      <div className='HeaderContainer'>
        <AdminNav />
      </div>
      <div className='TablaEmpresasContainer'>
        <TablaEmpresa />
      </div>
    </div>
  );
}

export { TodasLasEmpresas };
