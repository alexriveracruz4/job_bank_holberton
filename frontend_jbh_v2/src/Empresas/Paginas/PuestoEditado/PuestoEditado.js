import React from "react";
import { EmpresaNav } from '../../Navegador/EmpresaNav';

import PuestoForm from "../../Componentes/PuestoEditado/PublicarForm/PublicarForm"

function PuestoEditado() {
    return (
        <React.Fragment>
            <EmpresaNav />
            <PuestoForm />
        </React.Fragment>
    )
}

export { PuestoEditado }