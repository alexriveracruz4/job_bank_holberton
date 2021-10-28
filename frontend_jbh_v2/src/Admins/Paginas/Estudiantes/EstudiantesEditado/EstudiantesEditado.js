import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { helpHttp } from "../../../../helpers/helpHttp";
import CrudForm from "../../../Componentes/Estudiantes/EstudiantesEditado/EditarEstudianteForm";
import { AdminNav } from "../../../Navegador/AdminNav";
import { useParams } from "react-router";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function EstudianteEditado() {

  useEffect(() => {
    if (!cookies.get("id")) {
      window.location.href = "/login/admin";
    }
  });

  const AdminID = cookies.get("id")

  const { id } = useParams();
  const student_id = id;

  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState({});

  useEffect(async () => {
    await axios
      .get(`http://localhost:5000/api/v1/students/${student_id}`)
      .then((res) => setDataToEdit(res.data));
  }, []);
  /*nuevo codigo arriba*/

  /*const location = useLocation();
  console.log(location)
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState(location.state[0]);*/

  let api = helpHttp();
  let url = "http://localhost:5000/api/v1/students";

  const history = useHistory()

  const updateData = (data) => {
    let endpoint = `${url}/${data.id}`;

    data.updated_by = parseInt(AdminID);

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
      <AdminNav />
      <article className="grid-1-2">
        <CrudForm updateData={updateData} dataToEdit={dataToEdit} />
      </article>
    </div>
  );
}

export { EstudianteEditado };
