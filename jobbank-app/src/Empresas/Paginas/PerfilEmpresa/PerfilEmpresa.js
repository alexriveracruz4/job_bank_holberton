import React, { useEffect, useState } from "react";
import axios from "axios";
import { EmpresaNav } from '../../Navegador/EmpresaNav';
import { helpHttp } from "../../../helpers/helpHttp";
import CrudForm from "../../Componentes/PerfilEmpresa/PerfilFormulario/Form"
import Cookies from 'universal-cookie';
import apiPath from "../../../ApiPath";
import { useAuth0 } from "@auth0/auth0-react";
import { closeSession } from "../../../helpers/CloseSession";

const cookies = new Cookies();

function PerfilEmpresa() {

  const { logout } = useAuth0();

  const PartnerID= cookies.get("partner_id"); //string variable

  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
    if (!cookies.get('partner_id')){
      closeSession();
      logout(); 
    }
  });

  // Gets the partner data and saves it in dataToEdit
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState({});

  useEffect(async ()=>{
    await axios.get(`${apiPath}/partners/${PartnerID}`)
        .then(res => setDataToEdit(res.data))
  }, []);

  // Update the partner data with the updateData arrow function
  let api = helpHttp();
  let url = `${apiPath}/partners`;

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
    <React.Fragment>
      <EmpresaNav />
      <article className="grid-1-2">
        <CrudForm
            updateData={updateData}
            dataToEdit={dataToEdit}
        />
      </article>
    </React.Fragment>
  );
}

export { PerfilEmpresa }
