import React, { useEffect, useState } from "react";
import axios from "axios";
import { EstudianteNav } from "../../Navegador/EstudianteNav";
import { helpHttp } from "../../../helpers/helpHttp";
import CrudForm from "../../Componentes/PerfilEstudiante/PerfilFormulario/Form";
import Cookies from "universal-cookie";
import { UploadCv } from "../../Componentes/PerfilEstudiante/PerfilFormulario/Form";
import apiPath from "../../../ApiPath";

const cookies = new Cookies();

function PerfilEstudiante() {

  useEffect(() => {
    if (!cookies.get("id")) {
      window.location.href = "/login/estudiante";
    }
  });

  const student_id = cookies.get("id");

  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState({});

  useEffect(async () => {
    await axios
      .get(`${apiPath}/students/${student_id}`)
      .then((res) => setDataToEdit(res.data));
  }, []);

  let api = helpHttp();
  let url = `${apiPath}/students`;

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
  };

  return (
    <div>
      <EstudianteNav />
      <article className="grid-1-2">
        <CrudForm updateData={updateData} dataToEdit={dataToEdit} />
	      <UploadCv />
      </article>
    </div>
  );
}

export { PerfilEstudiante };
