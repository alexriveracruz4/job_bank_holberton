import React, { useEffect } from "react";
import { EmpresaNav } from '../../Navegador/EmpresaNav';
import PuestoForm from "../../Componentes/NuevoPuestoDeTrabajo/PublicarForm/PublicarForm"
import Cookies from 'universal-cookie';


const cookies = new Cookies();

function NuevoPuestoDeTrabajo() {

    useEffect(() => {
	if (!cookies.get('id')){
            window.location.href="/login/empresa";
	}
    });

    return (
        <React.Fragment>
            <EmpresaNav />
            <PuestoForm />
        </React.Fragment>
    )
}

export { NuevoPuestoDeTrabajo }
