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

    // Sweetalert to confirm when the user clicks in Postula Aquí

    const sendEmail = (title) => {
        const partner_email = props.PartnerEmail;
        const copia_email="jhonatan.jauja.c@uni.pe"
        const subject=`POSTULACION AL TRABAJO: ${title}`
        const body="Me gustaría postular a este trabajo"
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${partner_email}&su=${subject}&body=${body}&cc=${copia_email}`, '_blank'); 
    }

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
                    swal({
                        title: "Excelente",
                        text: `Has postulado exitosamente al trabajo: '${datos.title}' de la empresa '${props.PartnerName}'`,
                        icon: "success",
                    });
                    setTimeout(() => {
                        history.goBack();
                    }, 1000);
                    
                });
                sendEmail(datos.title);
            } else {
              swal({
                text:"HAS CANCELADO TU POSTULACIÓN",
                timer:"2000"
              });
            }
        });
    }

    // This is the partner information section when a student clicks on a job
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
                    {datos.deleted || props.EstadoDePostulacion ?
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