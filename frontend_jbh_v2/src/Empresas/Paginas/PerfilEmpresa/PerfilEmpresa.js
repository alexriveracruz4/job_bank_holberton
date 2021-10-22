import React from "react";
import EmpresaNav from "../../Componentes/PerfilEmpresa/Navegador/EmpresaNav"
import EmpresaForm from "../../Componentes/PerfilEmpresa/PerfilFormulario/Form"

function PerfilEmpresa() {
    return (
        <React.Fragment>
            <EmpresaNav />
            <EmpresaForm />
        </React.Fragment>
    )
}

export { PerfilEmpresa }