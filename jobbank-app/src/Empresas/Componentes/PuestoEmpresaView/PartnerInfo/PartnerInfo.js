import React, { useEffect, useState } from "react";
import partnerlogo from "./partnerlogo.png"
import "./PartnerInfo.css";
import Cookies from 'universal-cookie';
import apiPath from "../../../../ApiPath";

const cookies = new Cookies();
// Partner information for job description
function PartnerInfo(props) {
    const Partnert_Name = cookies.get("name");
    const datos = props.datos[0];
    const [partner, setPartner] = useState([]);

    useEffect(() => {
        obtenerDatosDePartners();
    }, []);
    
    let partner_id = cookies.get('id')
    
    const obtenerDatosDePartners = async () => {
        const data = await fetch(`${apiPath}/partners/${partner_id}`);
        const applications = await data.json();
        setPartner(applications);
    }

    let photo = partnerlogo;

    if (partner.logo_filename_logical != null && partner.logo_filename_logical != undefined){
    photo = `${apiPath}/partner_photos/${partner.logo_filename_logical}`;
    }


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
                    <img src={ photo } className="partnerlogopng" alt="logo de la empresa"/>
                </div>
                <div className="partner-name">
                    <p>{Partnert_Name}</p>
                </div>
            </div>
        </div>
    )
}

export { PartnerInfo };
