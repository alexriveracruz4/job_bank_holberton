import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { helpHttp } from '../../../../helpers/helpHttp';
import CrudForm from '../../../Componentes/Estudiantes/EstudiantesEditado/EditarEstudianteForm';
import { AdminNav } from "../../../Navegador/AdminNav";
import Cookies from 'universal-cookie';


const cookies = new Cookies();


function EstudianteEditado() {
  const location = useLocation();
  console.log(location)
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(location.state[0]);

  let api = helpHttp();
  let url = "http://localhost:5000/api/v1/students";

  const updateData = (data) => {
    let endpoint = `${url}/${data.id}`;

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.put(endpoint, options).then((res) => {
      let newData = db.map((el) => (el.id === data.id ? data : el));
      setDb(newData);
    });
  }

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
            updateData={updateData}
            dataToEdit={dataToEdit}
        />
      </article>
    </div>
  );
}

export { EstudianteEditado };
