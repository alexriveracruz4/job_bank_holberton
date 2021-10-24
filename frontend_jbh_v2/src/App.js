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

import { EmpresaEditada } from './Admins/Paginas/Empresas/EmpresaEditada/EmpresaEditada';
import { TodasLasEmpresas } from './Admins/Paginas/Empresas/TodasLasEmpresas/TodasLasEmpresas';
import { EmpresaCreada } from './Admins/Paginas/Empresas/EmpresaCreada/EmpresaCreada';

import { EstudianteEditado } from './Admins/Paginas/Estudiantes/EstudiantesEditado/EstudiantesEditado'
import { TodosLosEstudiantes } from './Admins/Paginas/Estudiantes/TodosLosEstudiantes/TodosLosEstudiantes';
import { EstudianteCreado } from './Admins/Paginas/Estudiantes/EstudiantesCreado/EstudiantesCreado'

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
          <Route exact path="/estudiante/puestos-de-trabajo/partners/:PartnerId/jobs/:JobId" component={Puesto}/>
          <Route exact path="/estudiante/puestos-de-trabajo/partners/:PartnerId/jobs/:JobId/puesto-postulado" component={PuestoPostulado}/>
          <Route exact path="/estudiante/mis-postulaciones" component={MisPostulaciones}/>
          <Route exact path="/estudiante/perfil" component={PerfilEstudiante}/>


          <Route path="/login/empresa" component={LoginEmpresas}/>
          <Route exact path="/empresa/mis-puestos-de-trabajo" component={MisPuestosDeTrabajo}/>
          <Route exact path="/empresa/mis-puestos-de-trabajo/:JobId" component={PuestoEmpresaView}/>
          <Route exact path="/empresa/mis-puestos-de-trabajo/:JobId/puesto-eliminado" component={PuestoEliminado}/>
          <Route exact path="/empresa/mis-puestos-de-trabajo/:JobId/puesto-editado" component={PuestoEditado}/>
          <Route exact path="/empresa/mis-puestos-de-trabajo/:JobId/postulantes" component={Postulantes}/>
          <Route exact path="/empresa/nuevo-puesto-de-trabajo" component={NuevoPuestoDeTrabajo}/>
          <Route exact path="/empresa/perfil" component={PerfilEmpresa}/>
          


          <Route exact path="/login/admin" component={LoginAdmins}/>

          <Route exact path="/admin/empresas" component={TodasLasEmpresas}/>
          <Route exact path="/admin/empresas/empresa-editada/:id" component={EmpresaEditada}/>
          <Route exact path="/admin/empresas/crear-empresa" component={EmpresaCreada}/>

          <Route exact path="/admin/estudiantes" component={TodosLosEstudiantes}/>
          <Route exact path="/admin/estudiantes/estudiante-editado/:id" component={EstudianteEditado}/>
          <Route exact path="/admin/estudiantes/crear-estudiante" component={EstudianteCreado}/>
          


          <Route path="/404" component={NotFoundPage}/>
          <Route path="*">
            <Redirect to="/404"/>
          </Route>
      </Switch>
    </Router>
  );
}
/*
<Route exact path="/admin/estudiantes/estudiante-editado/:id" component={EstudianteCreado}/>
          <Route exact path="/admin/empresas/crear-estudiante" component={EstudianteCreado}/>
*/
export default App;
