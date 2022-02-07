import React, { useEffect, useState } from "react";
import axios from "axios";
import { EstudianteNav } from "../../Navegador/EstudianteNav";
import { helpHttp } from "../../../helpers/helpHttp";
import CrudForm from "../../Componentes/PerfilEstudiante/PerfilFormulario/Form";
import Cookies from "universal-cookie";
import apiPath from "../../../ApiPath";

const cookies = new Cookies();

function PerfilEstudiante() {

  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
    if (!cookies.get("student_id")) {
      window.location.href = "/login/estudiante";
    }
  });

  // Obtains the student's data and saves it in dataToEdit
  const student_id = cookies.get("student_id");

  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState({});

  useEffect(async () => {
    await axios
      .get(`${apiPath}/students/${student_id}`)
      .then((res) => setDataToEdit(res.data));
  }, []);

  // Update the student profile with the updateData arrow function
  let api = helpHttp();
  let url = `${apiPath}/students`;

  const updateData = (data) => {
    let endpoint = `${url}/${data.student_id}`;

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.put(endpoint, options).then((res) => {
      let newData = db.map((el) => (el.student_id === data.student_id ? data : el));
      setDb(newData);
    });
  };

  return (
    <div>
      <EstudianteNav />
        <CrudForm updateData={updateData} dataToEdit={dataToEdit} />
    </div>
  );
}

export { PerfilEstudiante };
