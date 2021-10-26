import React, { useEffect } from 'react'
//import './TodosLosEstudiantes.css';
import { AdminNav } from "../../../Navegador/AdminNav";

import TablaEstudiante from "../../../Componentes/Estudiantes/TodosLosEstudiantes/TablaEstudiante/TablaEstudiante"
import Cookies from 'universal-cookie';


const cookies = new Cookies();


function TodosLosEstudiantes() {

  useEffect(() => {
      if (!cookies.get('id')){
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
