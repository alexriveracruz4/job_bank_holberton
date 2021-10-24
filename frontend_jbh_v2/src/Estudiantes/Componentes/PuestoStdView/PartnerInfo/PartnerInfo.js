import React, { useState } from "react";
import partnerlogo from "./partnerlogo.png"
import "./PartnerInfo.css";
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { helpHttp } from "../../../../helpers/helpHttp";


function PartnerInfo(props) {
    const studentId = 3;
    let history = useHistory();
    const { PartnerId, JobId } = useParams();


    const datos = props.JobData[0];

    const [db, setDb] = useState([]);
    let api = helpHttp();
    const PostularEmpresa = (studentId, PartnerId, JobId) => {
        let IsPostular = window.confirm(
          `¿Estás seguro de postular al trabajo de id:${JobId} de la empresa con id:'${PartnerId}'?`
        );
        if (IsPostular) {

        {/*curl -X POST http://0.0.0.0:5000/api/v1/students/applications -H "Content-Type: application/json" -d '{"partner_id": 1, "job_id": 1, "student_id": 1}' -vvv
                            */}

          let url = `http://localhost:5000/api/v1/students/applications`;
          const data = {"partner_id": PartnerId, "job_id": JobId, "student_id": studentId}
          let options = {
            body: data,
            headers: { "content-type": "application/json" },
          };
          api.post(url, options).then((res) => {
              setDb([...db, res]);
          });
        } else {
          return;
        }
      };

    return (
        <div className="body-container">
            <div className="title-container">
                <div className="title">
                    <h1>{ datos.title }</h1>
                </div>
            </div>
            <div className="country-container align-items-center">
                <div className="country">
                    <p> {datos.city}, {datos.country}</p>
                </div>
            </div>
            <div className="half-page">
                <div className="partner">
                    <img src={ partnerlogo } className="partnerlogopng" alt="logo de la empresa"/>
                </div>
                <div className="partner-name">
                    <p>{props.PartnerName}</p>
                </div>
                {datos.deleted || props.PostulantesIDs.includes(studentId, 0)?
                    ""
                    :
                    <div className="postula-container" onClick={ () => {history.push(`/estudiante/puestos-de-trabajo/partners/${PartnerId}/jobs/${JobId}/puesto-postulado`)}}>
                        <div className="Postula">
                            <button className="postula-button"
                                onClick={() => PostularEmpresa(studentId, PartnerId, JobId)}
                            >
                                Postula aquí
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default PartnerInfo;