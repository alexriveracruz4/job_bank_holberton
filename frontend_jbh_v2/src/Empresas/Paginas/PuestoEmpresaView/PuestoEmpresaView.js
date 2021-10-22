import React from "react";
import { NavPuesto } from "../../Componentes/PuestoEmpresaView/Navegador/NavPuesto";
import { PuestoInfo } from "../../Componentes/PuestoEmpresaView/PuestoInfo/PuestoInfo";
import { PartnerInfo } from "../../Componentes/PuestoEmpresaView/PartnerInfo/PartnerInfo";

import Data from "../../data/MispuestosEmpresa.json";

const datos = Data;

function PuestoEmpresaView() {
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

export { PuestoEmpresaView };
