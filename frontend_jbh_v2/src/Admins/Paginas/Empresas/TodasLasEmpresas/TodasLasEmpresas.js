import React, { useEffect } from 'react'
//import './TodasLasEmpresas.css';
import { AdminNav } from "../../../Navegador/AdminNav";
import TablaEmpresa from '../../../Componentes/Empresas/TodasLasEmpresas/TablaEmpresa/TablaEmpresa';
import Cookies from 'universal-cookie';


const cookies = new Cookies();


function TodasLasEmpresas() {

  useEffect(() => {
      if (!cookies.get('id')){
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
