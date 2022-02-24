import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { helpHttp } from '../../../../helpers/helpHttp';
import { AdminNav } from "../../../Navegador/AdminNav";
import CrudForm from '../../../Componentes/Admins/PerfilAdmin/PerfilAdmin';
import Cookies from 'universal-cookie';
import apiPath from '../../../../ApiPath';
import PerfilAdminNew from '../../../Componentes/Admins/PerfilAdmin/PerfilAdminNew';

const cookies = new Cookies();

function PerfilAdmin() {

  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
    if (!cookies.get("admin_id")) {
      window.location.href = "/login/admin";
    }
  });

  const AdminID = cookies.get("admin_id")

  // Gets the Administrator data and saves it in dataToEdit
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState({});

  useEffect(async () => {
    await axios
      .get(`${apiPath}/admins/${AdminID}`)
      .then((res) => setDataToEdit(res.data));
  }, []);


  // Update the administrator data with the updateData arrow function
  let api = helpHttp();
  let url = `${apiPath}/admins`;

  const updateData = (data) => {
    let endpoint = `${url}/${data.admin_id}`;

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.put(endpoint, options).then((res) => {
      let newData = db.map((el) => (el.admin_id === data.admin_id ? data : el));
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
      {/*<PerfilAdminNew
          updateData={updateData}
      dataToEdit={dataToEdit}/>*/}
      </div>
  );
}

export { PerfilAdmin };
