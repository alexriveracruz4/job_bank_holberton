import React, { useState, useEffect } from 'react';
import { helpHttp } from '../../../../helpers/helpHttp';
import CrudForm from '../../../Componentes/Empresas/EmpresaCreada/CrearEmpresaForm';
import { AdminNav } from "../../../Navegador/AdminNav";
import Cookies from 'universal-cookie';
import apiPath from '../../../../ApiPath';


const cookies = new Cookies();

function EmpresaCreada() {

  // State that saves data in db
  const [db, setDb] = useState([]);

  // Create the new partner data with the arrow function createData
  let api = helpHttp();
  let url = `${apiPath}/partners`;

  const createData = (data) => {
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    api.post(url, options).then((res) => {
        setDb([...db, res]);
    });
  };

  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
      if (!cookies.get('id')){
          window.location.href="/login/admin";
      }
  });

  return (
    <div>
      <AdminNav />
      <article className="grid-1-2">
        <CrudForm
            createData={ createData }
        />
      </article>
    </div>
  );
}

export { EmpresaCreada };
