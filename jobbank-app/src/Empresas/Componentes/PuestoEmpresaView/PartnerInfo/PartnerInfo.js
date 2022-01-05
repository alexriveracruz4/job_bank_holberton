import React from "react";
import partnerlogo from "./partnerlogo.png"
import "./PartnerInfo.css";
import Cookies from 'universal-cookie';


const cookies = new Cookies();
// Partner information for job description
function PartnerInfo(props) {
    const Partnert_Name = cookies.get("name");
    const datos = props.datos[0];
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
                    <p>{Partnert_Name}</p>
                </div>
            </div>
        </div>
    )
}

export { PartnerInfo };
