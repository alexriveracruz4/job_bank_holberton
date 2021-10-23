import React from "react";
import Navegador from "../../Componentes/PerfilEstudiante/Navegador/EstudianteNav";
import EstudianteForm from "../../Componentes/PerfilEstudiante/PerfilFormulario/Form"

function PerfilEstudiante() {
    return (
        <React.Fragment>
            <Navegador />
            <EstudianteForm />
        </React.Fragment>
    )
}

export { PerfilEstudiante }