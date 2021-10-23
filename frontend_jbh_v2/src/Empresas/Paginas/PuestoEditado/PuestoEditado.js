import React from "react";
import NavPartner from "../../Componentes/PuestoEditado/Navegador/EmpresaNav"
import PuestoForm from "../../Componentes/PuestoEditado/PublicarForm/PublicarForm"

function PuestoEditado() {
    return (
        <React.Fragment>
            <NavPartner />
            <PuestoForm />
        </React.Fragment>
    )
}

export { PuestoEditado }