import React, { useEffect, useState } from "react";
import axios from "axios";
import { EmpresaNav } from '../../Navegador/EmpresaNav';
import { helpHttp } from "../../../helpers/helpHttp";
import CrudForm from "../../Componentes/PerfilEmpresa/PerfilFormulario/Form"
import Cookies from 'universal-cookie';
import apiPath from "../../../ApiPath";

const cookies = new Cookies();

function PerfilEmpresa() {

  const partner_id= cookies.get("id"); //string variable

  // Gets the partner data and saves it in dataToEdit
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState({});

  useEffect(async ()=>{
    await axios.get(`${apiPath}/partners/${partner_id}`)
        .then(res => setDataToEdit(res.data))
  }, []);

  // Update the partner data with the updateData arrow function
  let api = helpHttp();
  let url = `${apiPath}/partners`;

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

  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
      if (!cookies.get('id')){
          window.location.href="/login/empresa";
      }
  });


  return (
    <div>
      <EmpresaNav />
      <article className="grid-1-2">
        <CrudForm
            updateData={updateData}
            dataToEdit={dataToEdit}
        />
      </article>
    </div>
  );
}

export { PerfilEmpresa }