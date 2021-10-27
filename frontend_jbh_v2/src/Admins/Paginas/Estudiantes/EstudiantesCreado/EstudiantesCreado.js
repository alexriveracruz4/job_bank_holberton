import React, { useState, useEffect } from 'react';
import { helpHttp } from '../../../../helpers/helpHttp';
import CrudForm from '../../../Componentes/Estudiantes/EstudiantesCreado/CrearEstudianteForm';
import { AdminNav } from "../../../Navegador/AdminNav";
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router';


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
  let url = "http://localhost:5000/api/v1/students";

  const createData = (data) => {
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    api.post(url, options).then((res) => {
        setDb([...db, res]);
        let path = `/admin/estudiantes`; 
        history.push(path);
        history.go(0)
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
