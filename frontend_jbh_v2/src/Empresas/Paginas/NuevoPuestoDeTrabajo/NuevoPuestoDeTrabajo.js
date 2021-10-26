import React from "react";
import { EmpresaNav } from '../../Navegador/EmpresaNav';

import PuestoForm from "../../Componentes/NuevoPuestoDeTrabajo/PublicarForm/PublicarForm"

function NuevoPuestoDeTrabajo() {
    return (
        <React.Fragment>
            <EmpresaNav />
            <PuestoForm />
        </React.Fragment>
    )
}

export { NuevoPuestoDeTrabajo }