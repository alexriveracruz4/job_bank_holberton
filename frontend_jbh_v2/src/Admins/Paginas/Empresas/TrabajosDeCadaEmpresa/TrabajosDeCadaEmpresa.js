import React from 'react';

import { AdminNav } from "../../../Navegador/AdminNav";

import TablaTrabajosDeCadaEmpresa from '../../../Componentes/Empresas/TrabajosDeCadaEmpresa/TablaTrabajosDeCadaEmpresa/TablaTrabajosDeCadaEmpresa';


function TrabajosDeCadaEmpresa() {
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