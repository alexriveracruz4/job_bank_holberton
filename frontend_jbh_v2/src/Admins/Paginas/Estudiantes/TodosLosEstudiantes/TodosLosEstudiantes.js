import React from 'react'
//import './TodosLosEstudiantes.css';
import { AdminNav } from "../../../Navegador/AdminNav";

import TablaEstudiante from "../../../Componentes/Estudiantes/TodosLosEstudiantes/TablaEstudiante/TablaEstudiante"



function TodosLosEstudiantes() {
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