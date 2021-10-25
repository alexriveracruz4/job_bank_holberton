import React from 'react'
//import './TodosLosEstudiantes.css';

import { AdminNav } from "../../../Navegador/AdminNav";
import TablaDeTodoLosTrabajos from "../../../Componentes/TodosLosTrabajos/TablaDeTodosLosTrabajos/TablaDeTodosLosTrabajos"


function TodosLosTrabajos() {
  return (
    <div className='TablaDeTodoLosTrabajosContainer'>
      <div className='HeaderContainer'>
        <AdminNav />
      </div>
      <div className='TablaDeTodoLosTrabajosContainer'>
        <TablaDeTodoLosTrabajos />
      </div>
    </div>
  );
}

export { TodosLosTrabajos };