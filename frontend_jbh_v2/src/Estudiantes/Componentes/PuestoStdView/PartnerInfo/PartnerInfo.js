import React from "react";
import partnerlogo from "./partnerlogo.png"
import "./PartnerInfo.css";
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
 
function PartnerInfo(props) {
    const studentId = 3;
    let history = useHistory();
    const { PartnerId, JobId } = useParams();

    console.log(PartnerId);

    const datos = props.JobData[0];

    console.log(props.PostulantesIDs.includes(studentId,0));

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
                {datos.deleted || props.PostulantesIDs.includes(studentId,0)?
                    ""
                    :
                    <div className="postula-container" onClick={ () => {history.push(`/estudiante/puestos-de-trabajo/partners/${PartnerId}/jobs/${JobId}/puesto-postulado`)}}>
                        <div className="Postula">
                        <button className="postula-button">Postula aquí</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default PartnerInfo;