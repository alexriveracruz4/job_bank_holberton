import React, { useEffect, useState } from "react";
import partnerlogo from "./partnerlogo.png"
import "./PartnerInfo.css";
import { useLocation } from "react-router";
import apiPath from "../../../../../ApiPath";

// Function to obtain partner data
function PartnerInfo(props) {
    const location = useLocation();
    const datos = props.datos[0];
    const PartnerId = location.state.partner_id;
    const [PartnerData, setPartnerData] = useState([2]);

    useEffect(async() => {
        await obtenerDatos();
    }, []);

    const obtenerDatos = async () => {
      const data = await fetch(`${apiPath}/partners/${PartnerId}`);
      const partner = await data.json();
      setPartnerData(partner);
    }

    let photo = partnerlogo;

    if (PartnerData.logo_filename_logical != null && PartnerData.logo_filename_logical != undefined){
    photo = `${apiPath}/partner_photos/${PartnerData.logo_filename_logical}`;
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
                    <p>{PartnerData.name}</p>
                </div>
            </div>
        </div>
    )
}

export { PartnerInfo };
