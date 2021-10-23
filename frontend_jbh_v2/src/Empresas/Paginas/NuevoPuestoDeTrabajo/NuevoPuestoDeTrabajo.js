import React from "react";
import NavPartner from "../../Componentes/NuevoPuestoDeTrabajo/Navegador/EmpresaNav"
import PuestoForm from "../../Componentes/NuevoPuestoDeTrabajo/PublicarForm/PublicarForm"

function NuevoPuestoDeTrabajo() {
    return (
        <React.Fragment>
            <NavPartner />
            <PuestoForm />
        </React.Fragment>
    )
}

export { NuevoPuestoDeTrabajo }