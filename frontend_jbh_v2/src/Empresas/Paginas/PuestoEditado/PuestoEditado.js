import React, { useEffect, useState } from "react";
import { helpHttp } from "../../../helpers/helpHttp";
import { EmpresaNav } from '../../Navegador/EmpresaNav';
import axios from "axios";
import CrudForm from "../../Componentes/PuestoEditado/PublicarForm/PublicarForm"
import Cookies from 'universal-cookie';
import { useHistory, useLocation, useParams } from "react-router";


const cookies = new Cookies();

function PuestoEditado() {

    useEffect(() => {
	if (!cookies.get('id')){
            window.location.href="/login/empresa";
	}
    });

  const PartnerId = cookies.get("id")

  const location = useLocation();
  const { JobId } = useParams();
  console.log("este es el id del trabajo", JobId)
  console.log("este es el id del partner", PartnerId)
  const [db, setDb] = useState([]);
  /*const [dataToEdit, setDataToEdit] = useState(location.state[0]);*/
  const [dataToEdit, setDataToEdit] = useState({});

  useEffect(async ()=>{
      await axios.get(`http://localhost:5000/api/v1/partners/${PartnerId}/jobs/${JobId}`)
          .then(res => setDataToEdit(res.data[0]))
  }, []);

  let api = helpHttp();
  let url = `http://localhost:5000/api/v1/partners/${PartnerId}/jobs`;

  const history = useHistory()

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
