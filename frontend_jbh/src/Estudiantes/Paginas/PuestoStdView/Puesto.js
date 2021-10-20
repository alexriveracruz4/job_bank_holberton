import React from "react";
import NavPuesto from "../../Componentes/PuestoStdView/Navegador/NavPuesto";
import PuestoInfo from "../../Componentes/PuestoStdView/PuestoInfo/PuestoInfo";
import PartnerInfo from "../../Componentes/PuestoStdView/PartnerInfo/PartnerInfo";

import Data from "../../data/puestodata.json";

const datos = Data;

function Puesto() {
  return (
    <React.Fragment>
        <NavPuesto />
        <PartnerInfo 
          datos = {datos}
        />
        <PuestoInfo 
          datos = {datos}
        />
    </React.Fragment>
  );
}

export { Puesto };
