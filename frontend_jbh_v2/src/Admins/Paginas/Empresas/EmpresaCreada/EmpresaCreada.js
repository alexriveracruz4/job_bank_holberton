import React, { useState } from 'react';
import { helpHttp } from '../../../../helpers/helpHttp';
import CrudForm from '../../../Componentes/Empresas/EmpresaCreada/CrearEmpresaForm';
import AdminNav from '../../../Componentes/Empresas/EmpresaCreada/Navegador/AdminNav';

function EmpresaCreada() {
  const [db, setDb] = useState([]);

  let api = helpHttp();
  let url = "http://localhost:5000/api/v1/partners";

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

export { EmpresaCreada };