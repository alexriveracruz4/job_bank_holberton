import React, { useState, useEffect } from 'react';
import { helpHttp } from '../../../../helpers/helpHttp';
import CrudForm from '../../../Componentes/Estudiantes/EstudiantesCreado/CrearEstudianteForm';
import { AdminNav } from "../../../Navegador/AdminNav";
import Cookies from 'universal-cookie';
import apiPath from '../../../../ApiPath';


const cookies = new Cookies();

function EstudianteCreado() {

  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
    if (!cookies.get('admin_id')){
        window.location.href="/login/admin";
    }
  });

  // State that saves data in db
  const [db, setDb] = useState([]);

  // Create the new student data with the arrow function createData
  let api = helpHttp();
  let url = `${apiPath}/students`;

  const createData = (data) => {
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    api.post(url, options).then((res) => {
        setDb([...db, res]);
    });
  };

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

export { EstudianteCreado };
