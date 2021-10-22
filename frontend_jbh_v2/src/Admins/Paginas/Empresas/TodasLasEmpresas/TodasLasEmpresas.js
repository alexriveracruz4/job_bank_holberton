import React from 'react'
import './TodasLasEmpresas.css';

import NavPuesto from "../../../Componentes/Empresas/TodasLasEmpresas/Navegador/NavPuesto";
import TablaEmpresa from "../../../Componentes/Empresas/TodasLasEmpresas/TablaEmpresa/TablaEmpresa"



function TodasLasEmpresas() {
  return (
    <div className='PuestosDeTrabajoEstudianteContainer'>
      <div className='HeaderContainer'>
        <NavPuesto />
      </div>
      <div className='BodyContainer'>
        <TablaEmpresa />
      </div>
    </div>
  );
}

export { TodasLasEmpresas };