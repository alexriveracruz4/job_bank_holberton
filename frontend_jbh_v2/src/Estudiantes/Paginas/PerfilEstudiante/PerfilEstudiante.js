import React, { useEffect, useState } from "react";
import axios from "axios";
import { helpHttp } from "../../../helpers/helpHttp";
import EstudianteNav from "../../Componentes/PerfilEstudiante/Navegador/EstudianteNav";
import CrudForm from "../../Componentes/PerfilEstudiante/PerfilFormulario/Form";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function PerfilEstudiante() {
  const student_id = cookies.get("id");

  console.log(student_id);
  const [db, setDb] = useState([]);
  const [dataToEdit, setDataToEdit] = useState({});

  useEffect(async ()=>{
      await axios.get(`http://localhost:5000/api/v1/students/${student_id}`)
          .then(res => setDataToEdit(res.data))
  }, []);

  let api = helpHttp();
  let url = "http://localhost:5000/api/v1/students";

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
      <EstudianteNav />
      <article className="grid-1-2">
          <CrudForm
              updateData={updateData}
              dataToEdit={dataToEdit}
          />
      </article>
      </div>
  );
}

export { PerfilEstudiante }