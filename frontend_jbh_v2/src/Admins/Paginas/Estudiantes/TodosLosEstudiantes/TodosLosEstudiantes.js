import React from 'react'
import './TodosLosEstudiantes.css';

import NavPuesto from "../../../Componentes/Estudiantes/TodosLosEstudiantes/Navegador/AdminNav";
import TablaEstudiante from "../../../Componentes/Estudiantes/TodosLosEstudiantes/TablaEstudiante/TablaEstudiante"



function TodosLosEstudiantes() {
  return (
    <div className='PuestosDeTrabajoEstudianteContainer'>
      <div className='HeaderContainer'>
        <NavPuesto />
      </div>
      <div className='BodyContainer'>
        <TablaEstudiante />
      </div>
    </div>
  );
}

export { TodosLosEstudiantes };