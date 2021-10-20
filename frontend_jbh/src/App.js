import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';

import { LoginEstudiantes } from './Estudiantes/Paginas/LoginEstudiantes/LoginEstudiantes';
import { PuestosDeTrabajoEstudiante } from "./Estudiantes/Paginas/PuestosDeTrabajoEstudiante/PuestosDeTrabajoEstudiante"
import { Puesto } from "./Estudiantes/Paginas/PuestoStdView/Puesto";
import { MisPostulaciones } from "./Estudiantes/Paginas/MisPostulaciones/MisPostulaciones";
import { PerfilEstudiante } from "./Estudiantes/Paginas/PerfilEstudiante/PerfilEstudiante";
import { PuestoPostulado } from "./Estudiantes/Paginas/PuestoPostulado/PuestoPostulado";


import { LoginEmpresas } from './Empresas/Paginas/LoginEmpresas/LoginEmpresas';
import { MisPuestosDeTrabajo } from './Empresas/Paginas/MisPuestosDeTrabajo/MisPuestosDeTrabajo';
import { NuevoPuestoDeTrabajo } from './Empresas/Paginas/NuevoPuestoDeTrabajo/NuevoPuestoDeTrabajo';
import { PerfilEmpresa } from './Empresas/Paginas/PerfilEmpresa/PerfilEmpresa';
import { PuestoEmpresaView } from './Empresas/Paginas/PuestoEmpresaView/PuestoEmpresaView';
import { PuestoEliminado } from './Empresas/Paginas/PuestoEliminado/PuestoEliminado';
import { PuestoEditado } from './Empresas/Paginas/PuestoEditado/PuestoEditado';
import { Postulantes } from './Empresas/Paginas/Postulantes/Postulantes';

import { LoginAdmins } from './Admins/Paginas/LoginAdmins/LoginAdmins';

import { NotFoundPage } from './NotFoundPage';
/*
          <Route exact path="/empresa/mis-puestos-de-trabajo/:id/puesto-editado" component={PuestoEditado}/>
          <Route exact path="/empresa/mis-puestos-de-trabajo/:id/postulantes" component={Postulantes}/>
*/
function App() {
  return (
    <Router>
      <Switch>

          <Route path="/login/estudiante" component={LoginEstudiantes}/>
          <Route exact path="/estudiante/puestos-de-trabajo" component={PuestosDeTrabajoEstudiante}/>
          <Route exact path="/estudiante/puestos-de-trabajo/:id" component={Puesto}/>
          <Route exact path="/estudiante/puestos-de-trabajo/:id/puesto-postulado" component={PuestoPostulado}/>
          <Route exact path="/estudiante/mis-postulaciones" component={MisPostulaciones}/>
          <Route exact path="/estudiante/perfil" component={PerfilEstudiante}/>

          <Route path="/login/empresa" component={LoginEmpresas}/>
          <Route exact path="/empresa/mis-puestos-de-trabajo" component={MisPuestosDeTrabajo}/>
          <Route exact path="/empresa/mis-puestos-de-trabajo/:id" component={PuestoEmpresaView}/>
          <Route exact path="/empresa/mis-puestos-de-trabajo/:id/puesto-eliminado" component={PuestoEliminado}/>
          <Route exact path="/empresa/mis-puestos-de-trabajo/:id/puesto-editado" component={PuestoEditado}/>
          <Route exact path="/empresa/mis-puestos-de-trabajo/:id/postulantes" component={Postulantes}/>


          <Route exact path="/empresa/nuevo-puesto-de-trabajo" component={NuevoPuestoDeTrabajo}/>
          <Route exact path="/empresa/perfil" component={PerfilEmpresa}/>
          
          <Route path="/login/admin" component={LoginAdmins}/>
          <Route exact path="/admin/puestos-de-trabajo">
            <h2>Puestos de trabajo de todas las empresas</h2>
          </Route>

          <Route path="/404" component={NotFoundPage}/>
          <Route path="*">
            <Redirect to="/404"/>
          </Route>
      </Switch>
    </Router>
  );
}

export default App;
