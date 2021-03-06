import React, { useEffect, useState } from "react";
import { helpHttp } from "../../../helpers/helpHttp";
import { EmpresaNav } from '../../Navegador/EmpresaNav';
import axios from "axios";
import CrudForm from "../../Componentes/PuestoEditado/PublicarForm/PublicarForm"
import Cookies from 'universal-cookie';
import { useParams } from "react-router";
import apiPath from "../../../ApiPath";
import { useAuth0 } from "@auth0/auth0-react";
import { closeSession } from "../../../helpers/CloseSession";


const cookies = new Cookies();

function PuestoEditado() {

  const { logout } = useAuth0();

  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
	  if (!cookies.get('partner_id')){
      closeSession();
      logout(); 
	  }
  });

  const PartnerId = cookies.get("partner_id")

  // Get the data of a job
  const { JobId } = useParams();

  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState({});

  useEffect(async ()=>{
      await axios.get(`${apiPath}/partners/${PartnerId}/jobs/${JobId}`)
          .then(res => setDataToEdit(res.data[0]))
  }, []);

  // Update the job with the updateData arrow function
  let api = helpHttp();
  let url = `${apiPath}/partners/${PartnerId}/jobs`;

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

export { PuestoEditado }
