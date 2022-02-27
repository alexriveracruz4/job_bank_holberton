import React, { useEffect } from 'react'
import { AdminNav } from "../../../Navegador/AdminNav";
import Cookies from 'universal-cookie';
import TablaAdmin from '../../../Componentes/Admins/TodosLosAdmins/TablaAdmin/TablaAdmin';
import { useAuth0 } from "@auth0/auth0-react";
import { closeSession } from "../../../../helpers/CloseSession";

const cookies = new Cookies();

function TodasLosAdmins() {

  const { logout } = useAuth0();
  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
      if (!cookies.get('admin_id')){
        closeSession();
        logout();
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