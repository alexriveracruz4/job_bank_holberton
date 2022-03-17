import React, { useEffect } from 'react'
import { AdminNav } from "../../../Navegador/AdminNav";
import TablaEstudiante from "../../../Componentes/Estudiantes/TodosLosEstudiantes/TablaEstudiante/TablaEstudiante"
import Cookies from 'universal-cookie';
import { useAuth0 } from "@auth0/auth0-react";
import { closeSession } from "../../../../helpers/CloseSession";


const cookies = new Cookies();

function TodosLosEstudiantes() {

  const { logout } = useAuth0();

  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
    if (!cookies.get('admin_id')){
      closeSession();
      logout();
    }
  });

  return (
    <React.Fragment>
      <AdminNav />
      <TablaEstudiante />
    </React.Fragment>
  );
}

export { TodosLosEstudiantes };
