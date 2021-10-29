import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { helpHttp } from '../../../../helpers/helpHttp';
import { AdminNav } from "../../../Navegador/AdminNav";
import CrudForm from '../../../Componentes/Admins/AdminEditado/AdminEditado';
import Cookies from 'universal-cookie';
import apiPath from '../../../../ApiPath';


const cookies = new Cookies();

function PerfilAdmin() {

  useEffect(() => {
    if (!cookies.get("id")) {
      window.location.href = "/login/admin";
    }
  });

  const AdminID = cookies.get("id")

  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState({});

  useEffect(async () => {
    await axios
      .get(`${apiPath}/admins/${AdminID}`)
      .then((res) => setDataToEdit(res.data));
  }, []);

  let api = helpHttp();
  let url = `${apiPath}/admins`;

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

export { PerfilAdmin };
