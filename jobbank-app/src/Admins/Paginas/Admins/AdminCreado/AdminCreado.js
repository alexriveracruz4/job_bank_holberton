import React, { useState, useEffect } from 'react';
import { helpHttp } from '../../../../helpers/helpHttp';
import CrudForm from '../../../Componentes/Admins/AdminCreado/CrearAdminForm';
import { AdminNav } from "../../../Navegador/AdminNav";
import Cookies from 'universal-cookie';
import apiPath from '../../../../ApiPath';
import { useAuth0 } from "@auth0/auth0-react";
import { closeSession } from "../../../../helpers/CloseSession";

const cookies = new Cookies();

function AdminCreado() {

  const { logout } = useAuth0();
  // State that saves data in db
  const [db, setDb] = useState([]);

  // Create the new partner data with the arrow function createData
  let api = helpHttp();
  let url = `${apiPath}/admins`;

  const createData = (data) => {
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    api.post(url, options).then((res) => {
        setDb([...db, res]);
    });
  };

  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
      if (!cookies.get('admin_id')){
        closeSession();
        logout();
      }
  });

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

export { AdminCreado };
