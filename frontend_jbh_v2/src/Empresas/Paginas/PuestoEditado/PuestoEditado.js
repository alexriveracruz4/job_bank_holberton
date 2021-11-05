import React, { useEffect, useState } from "react";
import { helpHttp } from "../../../helpers/helpHttp";
import { EmpresaNav } from '../../Navegador/EmpresaNav';
import axios from "axios";
import CrudForm from "../../Componentes/PuestoEditado/PublicarForm/PublicarForm"
import Cookies from 'universal-cookie';
import { useParams } from "react-router";
import apiPath from "../../../ApiPath";


const cookies = new Cookies();

function PuestoEditado() {

  useEffect(() => {
	  if (!cookies.get('id')){
      window.location.href="/login/empresa";
	  }
  });

  const PartnerId = cookies.get("id")

  const { JobId } = useParams();

  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState({});

  useEffect(async ()=>{
      await axios.get(`${apiPath}/partners/${PartnerId}/jobs/${JobId}`)
          .then(res => setDataToEdit(res.data[0]))
  }, []);

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

export { PuestoEditado }
