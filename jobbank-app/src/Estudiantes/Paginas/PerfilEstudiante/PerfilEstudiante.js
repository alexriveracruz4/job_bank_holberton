import React, { useEffect, useState } from "react";
import axios from "axios";
import { EstudianteNav } from "../../Navegador/EstudianteNav";
import { helpHttp } from "../../../helpers/helpHttp";
import CrudForm from "../../Componentes/PerfilEstudiante/PerfilFormulario/Form";
import Cookies from "universal-cookie";
import apiPath from "../../../ApiPath";
import { useAuth0 } from "@auth0/auth0-react";
import { closeSession } from "../../../helpers/CloseSession";

const cookies = new Cookies();

function PerfilEstudiante() {

  const { logout } = useAuth0();

  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
    if (!cookies.get("student_id")) {
      closeSession();
      logout();
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
    <React.Fragment>
      <EstudianteNav />
      <CrudForm updateData={updateData} dataToEdit={dataToEdit} />
    </React.Fragment>
  );
}

export { PerfilEstudiante };
