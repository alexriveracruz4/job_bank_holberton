import React, { useEffect } from 'react'
import { AdminNav } from "../../../Navegador/AdminNav";
import Cookies from 'universal-cookie';
import TablaAdmin from '../../../Componentes/Admins/TodosLosAdmins/TablaAdmin/TablaAdmin';


const cookies = new Cookies();

function TodasLosAdmins() {

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
        <TablaAdmin />
      </div>
    </div>
  );
}

export { TodasLosAdmins };