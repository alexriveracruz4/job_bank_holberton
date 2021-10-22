import React from "react";
import partnerlogo from "./partnerlogo.png"
import "./PartnerInfo.css";
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
 
function PartnerInfo(props) {
    let history = useHistory();
    const { id_empresa, id } = useParams();
    const datos = props.datos[0];
    console.log(datos);
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
                    <p>PARNERT NAME</p>
                </div>
                {datos.deleted ?
                    ""
                    :
                    <div className="postula-container" onClick={ () => {history.push(`/estudiante/puestos-de-trabajo/partners/${id_empresa}/jobs/${id}/puesto-postulado`)}}>
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