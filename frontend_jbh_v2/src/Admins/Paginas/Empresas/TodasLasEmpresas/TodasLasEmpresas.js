import React from 'react'
import './TodasLasEmpresas.css';

import AdminNav from "../../../Componentes/Empresas/TodasLasEmpresas/Navegador/AdminNav";
import TablaEmpresa from "../../../Componentes/Empresas/TodasLasEmpresas/TablaEmpresa/TablaEmpresa"



function TodasLasEmpresas() {
  return (
    <div className='Admin-empresas-div'>
      <div className='HeaderContainer'>
        <AdminNav />
      </div>
      <div className='BodyContainer'>
        <TablaEmpresa />
      </div>
    </div>
  );
}

export { TodasLasEmpresas };