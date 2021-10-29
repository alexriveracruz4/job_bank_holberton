import React, { useState } from "react";
import partnerlogo from "./partnerlogo.png"
import "./PartnerInfo.css";
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { helpHttp } from "../../../../helpers/helpHttp";
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import apiPath from "../../../../ApiPath";

const cookies = new Cookies();
function PartnerInfo(props) {
    const studentId = cookies.get("id"); //string variable
    let history = useHistory();
    const { PartnerId, JobId } = useParams();


    const datos = props.JobData[0];

    const [db, setDb] = useState([]);
    let api = helpHttp();
    const PostularEmpresa = (studentId, PartnerId, JobId) => {
        swal({
            title: "POSTULACIÓN",
            text: `¿Está seguro de postular al trabajo '${datos.title}' de la empresa '${props.PartnerName}'?`,
            icon: "warning",
            buttons: true,
            dangerMode: false,
          })
          .then((willApply) => {
            if (willApply) {
                let url = `${apiPath}/students/applications`;
                const data = {"partner_id": PartnerId, "job_id": JobId, "student_id": studentId}
                let options = {
                    body: data,
                    headers: { "content-type": "application/json" },
                    };
                api.post(url, options).then((res) => {
                  setDb([...db, res]);
                  swal("HAS POSTULADO A ESTE TRABAJO", {
                    timer:"2500"
                  });
                  setTimeout(() => {
                    history.go(0);
                  }, 2000);
                });
          } else {
            swal({
                text:"HAS CANCELADO TU POSTULACIÓN",
                timer:"2000"
                });
            }
        });
    }
    /*
    const PostularEmpresa = (studentId, PartnerId, JobId) => {
        let IsPostular = window.confirm(
          `¿Estás seguro de postular al trabajo de id:${JobId} de la empresa con id:'${PartnerId}'?`
        );
        console.log("ispostular0", IsPostular)
        if (IsPostular) {
          let url = `${apiPath}/students/applications`;
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
    */

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
                {console.log(props.PostulantesIDs.includes(studentId))}
                {console.log(typeof studentId)}
                {datos.deleted || props.PostulantesIDs.includes(parseInt(studentId), 0)?
                    ""
                    :
                    <div className="postula-container" 
                        onClick={() => {
                            PostularEmpresa(studentId, PartnerId, JobId)
                        }}>
                        <div className="Postula">
                            <h2 className="postula-button">
                                Postula aquí
                            </h2>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default PartnerInfo;