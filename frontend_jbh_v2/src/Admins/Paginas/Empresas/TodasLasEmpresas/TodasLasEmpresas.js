import React from 'react'
//import './TodasLasEmpresas.css';
import { AdminNav } from "../../../Navegador/AdminNav";
import TablaEmpresa from '../../../Componentes/Empresas/TodasLasEmpresas/TablaEmpresa/TablaEmpresa';



function TodasLasEmpresas() {
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