import React, { useEffect } from 'react'
import { AdminNav } from "../../../Navegador/AdminNav";
import TablaDeTodoLosTrabajos from "../../../Componentes/TodosLosTrabajos/TablaDeTodosLosTrabajos/TablaDeTodosLosTrabajos"
import Cookies from 'universal-cookie';


const cookies = new Cookies();

function TodosLosTrabajos() {

  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
      if (!cookies.get('id')){
          window.location.href="/login/admin";
      }
  });

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
