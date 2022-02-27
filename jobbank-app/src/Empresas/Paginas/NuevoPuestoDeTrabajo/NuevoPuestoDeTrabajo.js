import React, { useEffect, useState } from "react";
import { EmpresaNav } from '../../Navegador/EmpresaNav';
import CrudForm from "../../Componentes/NuevoPuestoDeTrabajo/PublicarForm/PublicarForm"
import { helpHttp } from "../../../helpers/helpHttp";
import Cookies from 'universal-cookie';
import apiPath from "../../../ApiPath";
import { useAuth0 } from "@auth0/auth0-react";
import { closeSession } from "../../../helpers/CloseSession";


const cookies = new Cookies();

function NuevoPuestoDeTrabajo() {

  const { logout } = useAuth0();

  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
	  if (!cookies.get('partner_id')){
      closeSession();
      logout(); 
	  }
  });

  // Create the new job with the arrow function createData
  const [db, setDb] = useState([]);
  let api = helpHttp();
  let url = `${apiPath}/jobs`;

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
      <EmpresaNav />
      <article className="grid-1-2">
        <CrudForm
            createData={ createData }
        />
      </article>
    </div>
    );
}

export { NuevoPuestoDeTrabajo }
