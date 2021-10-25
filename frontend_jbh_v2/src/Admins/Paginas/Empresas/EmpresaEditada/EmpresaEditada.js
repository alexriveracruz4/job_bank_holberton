import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { helpHttp } from '../../../../helpers/helpHttp';
import { AdminNav } from "../../../Navegador/AdminNav";
import CrudForm from '../../../Componentes/Empresas/EmpresaEditada/EmpresaEditada';

function EmpresaEditada() {
  const location = useLocation();
  console.log(location)
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(location.state[0]);

  let api = helpHttp();
  let url = "http://localhost:5000/api/v1/partners";

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

export { EmpresaEditada };