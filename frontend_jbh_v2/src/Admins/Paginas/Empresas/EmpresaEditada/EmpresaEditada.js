import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import axios from "axios";
import { helpHttp } from '../../../../helpers/helpHttp';
import { AdminNav } from "../../../Navegador/AdminNav";
import CrudForm from '../../../Componentes/Empresas/EmpresaEditada/EmpresaEditada';
import Cookies from 'universal-cookie';
import apiPath from '../../../../ApiPath';


const cookies = new Cookies();
function EmpresaEditada() {

  useEffect(() => {
    if (!cookies.get('id')){
        window.location.href="/login/admin";
    }
  });

  const { id } = useParams();
  const partner_id = id;

  const location = useLocation();
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(location.state[0]);

  let api = helpHttp();
  let url = `${apiPath}/partners`;

  useEffect(async () => {
    await axios
      .get(`${apiPath}/partners/${partner_id}`)
      .then((res) => setDataToEdit(res.data));
  }, []);

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
