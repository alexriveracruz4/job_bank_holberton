import React, { useEffect, useState } from "react";
import { EmpresaNav } from '../../Navegador/EmpresaNav';
import CrudForm from "../../Componentes/NuevoPuestoDeTrabajo/PublicarForm/PublicarForm"
import { helpHttp } from "../../../helpers/helpHttp";
import Cookies from 'universal-cookie';
import apiPath from "../../../ApiPath";


const cookies = new Cookies();

function NuevoPuestoDeTrabajo() {

  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
	  if (!cookies.get('id')){
      window.location.href="/login/empresa";
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