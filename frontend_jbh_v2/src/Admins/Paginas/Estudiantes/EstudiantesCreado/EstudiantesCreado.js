import React, { useState, useEffect } from 'react';
import { helpHttp } from '../../../../helpers/helpHttp';
import CrudForm from '../../../Componentes/Estudiantes/EstudiantesCreado/CrearEstudianteForm';
import { AdminNav } from "../../../Navegador/AdminNav";
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router';
import apiPath from '../../../../ApiPath';


const cookies = new Cookies();

function EstudianteCreado() {

  const AdminID = cookies.get("id")

  useEffect(() => {
    if (!cookies.get('id')){
        window.location.href="/login/admin";
    }
});

  const history = useHistory()

  const [db, setDb] = useState([]);

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
