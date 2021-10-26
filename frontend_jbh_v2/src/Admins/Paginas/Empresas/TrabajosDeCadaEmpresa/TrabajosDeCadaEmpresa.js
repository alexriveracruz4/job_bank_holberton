import React, { useEffect } from 'react';
import { AdminNav } from "../../../Navegador/AdminNav";
import TablaTrabajosDeCadaEmpresa from '../../../Componentes/Empresas/TrabajosDeCadaEmpresa/TablaTrabajosDeCadaEmpresa/TablaTrabajosDeCadaEmpresa';
import Cookies from 'universal-cookie';


const cookies = new Cookies();


function TrabajosDeCadaEmpresa() {

  useEffect(() => {
      if (!cookies.get('id')){
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
