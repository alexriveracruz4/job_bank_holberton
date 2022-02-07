import React, { useState, useEffect } from "react";
import axios from "axios";
import { helpHttp } from "../../../../helpers/helpHttp";
import CrudForm from "../../../Componentes/Estudiantes/EstudiantesEditado/EditarEstudianteForm";
import { AdminNav } from "../../../Navegador/AdminNav";
import { useParams } from "react-router";
import Cookies from "universal-cookie";
import apiPath from "../../../../ApiPath";

const cookies = new Cookies();

function EstudianteEditado() {

  // If the cookies are not found, then the page will return to the login page
  useEffect(() => {
    if (!cookies.get("admin_id")) {
      window.location.href = "/login/admin";
    }
  });

  const AdminID = cookies.get("admin_id")

  // Gets the student data and saves it in dataToEdit
  const { id } = useParams();
  const student_id = id;

  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState({});

  useEffect(async () => {
    await axios
      .get(`${apiPath}/students/${student_id}`)
      .then((res) => setDataToEdit(res.data));
  }, []);

  // Update the student data with the updateData arrow function
  let api = helpHttp();
  let url = `${apiPath}/students`;

  const updateData = (data) => {
    let endpoint = `${url}/${data.student_id}`;

    data.updated_by = parseInt(AdminID);

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
      <AdminNav />
      <article className="grid-1-2">
        <CrudForm updateData={updateData} dataToEdit={dataToEdit} />
      </article>
    </div>
  );
}

export { EstudianteEditado };
