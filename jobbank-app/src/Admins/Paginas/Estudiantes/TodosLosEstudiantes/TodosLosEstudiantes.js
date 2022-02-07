import React, { useEffect } from 'react'
import { AdminNav } from "../../../Navegador/AdminNav";

import TablaEstudiante from "../../../Componentes/Estudiantes/TodosLosEstudiantes/TablaEstudiante/TablaEstudiante"
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function TodosLosEstudiantes() {

  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
      if (!cookies.get('admin_id')){
          window.location.href="/login/admin";
      }
  });

  return (
    <div className='PuestosDeTrabajoEstudianteContainer'>
      <div className='HeaderContainer'>
        <AdminNav />
      </div>
      <div className='TablaEstudiantesContainer'>
        <TablaEstudiante />
      </div>
    </div>
  );
}

export { TodosLosEstudiantes };
