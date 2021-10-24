import React, { useState } from 'react';
import { helpHttp } from '../../../../helpers/helpHttp';
import CrudForm from '../../../Componentes/Estudiantes/EstudiantesCreado/CrearEstudianteForm';
import AdminNav from '../../../Componentes/Estudiantes/EstudiantesCreado/Navegador/AdminNav'

function EstudianteCreado() {
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