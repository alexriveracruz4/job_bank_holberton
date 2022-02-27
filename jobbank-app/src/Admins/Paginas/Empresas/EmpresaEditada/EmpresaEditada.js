import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import axios from "axios";
import { helpHttp } from '../../../../helpers/helpHttp';
import { AdminNav } from "../../../Navegador/AdminNav";
import CrudForm from '../../../Componentes/Empresas/EmpresaEditada/EmpresaEditada';
import Cookies from 'universal-cookie';
import apiPath from '../../../../ApiPath';
import { useAuth0 } from "@auth0/auth0-react";
import { closeSession } from "../../../../helpers/CloseSession";

const cookies = new Cookies();
function EmpresaEditada() {

  const { logout } = useAuth0();
  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
    if (!cookies.get('admin_id')){
      closeSession();
      logout();
    }
  });

  // Gets the partner data and saves it in dataToEdit
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

  // Update the partner data with the updateData arrow function
  const updateData = (data) => {
    let endpoint = `${url}/${data.partner_id}`;

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.put(endpoint, options).then((res) => {
      let newData = db.map((el) => (el.partner_id === data.partner_id ? data : el));
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
