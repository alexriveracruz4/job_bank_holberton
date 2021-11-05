import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { LoginEstudiantes } from './Estudiantes/Paginas/LoginEstudiantes/LoginEstudiantes';
import { PuestosDeTrabajoEstudiante } from "./Estudiantes/Paginas/PuestosDeTrabajoEstudiante/PuestosDeTrabajoEstudiante"
import { Puesto } from "./Estudiantes/Paginas/PuestoStdView/Puesto";
import { MisPostulaciones } from "./Estudiantes/Paginas/MisPostulaciones/MisPostulaciones";
import { PerfilEstudiante } from "./Estudiantes/Paginas/PerfilEstudiante/PerfilEstudiante";


import { LoginEmpresas } from './Empresas/Paginas/LoginEmpresas/LoginEmpresas';
import { MisPuestosDeTrabajo } from './Empresas/Paginas/MisPuestosDeTrabajo/MisPuestosDeTrabajo';
import { NuevoPuestoDeTrabajo } from './Empresas/Paginas/NuevoPuestoDeTrabajo/NuevoPuestoDeTrabajo';
import { PerfilEmpresa } from './Empresas/Paginas/PerfilEmpresa/PerfilEmpresa';
import { PuestoEmpresaView } from './Empresas/Paginas/PuestoEmpresaView/PuestoEmpresaView';
import { PuestoEditado } from './Empresas/Paginas/PuestoEditado/PuestoEditado';
import { Postulantes } from './Empresas/Paginas/Postulantes/Postulantes';


import { LoginAdmins } from './Admins/Paginas/LoginAdmins/LoginAdmins';
import { PerfilAdmin } from './Admins/Paginas/Admins/AdminEditado/AdminEditado'
import { EmpresaEditada } from './Admins/Paginas/Empresas/EmpresaEditada/EmpresaEditada';
import { TodasLasEmpresas } from './Admins/Paginas/Empresas/TodasLasEmpresas/TodasLasEmpresas';
import { EmpresaCreada } from './Admins/Paginas/Empresas/EmpresaCreada/EmpresaCreada';
import { TrabajosDeCadaEmpresa } from './Admins/Paginas/Empresas/TrabajosDeCadaEmpresa/TrabajosDeCadaEmpresa';
import { EstudianteEditado } from './Admins/Paginas/Estudiantes/EstudiantesEditado/EstudiantesEditado'
import { TodosLosEstudiantes } from './Admins/Paginas/Estudiantes/TodosLosEstudiantes/TodosLosEstudiantes';
import { EstudianteCreado } from './Admins/Paginas/Estudiantes/EstudiantesCreado/EstudiantesCreado'
import { PostulantesATrabajos } from './Admins/Paginas/Empresas/PostulantesATrabajos/PostulantesATrabajos';
import { TodosLosTrabajos } from './Admins/Paginas/TodosLosTrabajos/TodosLosTrabajos/TodosLosTrabajos';
import { PuestoAdminView } from './Admins/Paginas/TodosLosTrabajos/PuestoAdminView/PuestoAdminView';

import { Landing } from './Landing/Paginas/Landing/Landing';

import { NotFoundPage } from './NotFoundPage';

function App() {
  return (
    <Router>
      <Switch>
          <Route path="/login/estudiante" component={LoginEstudiantes}/>
          <Route exact path="/estudiante/puestos-de-trabajo" component={PuestosDeTrabajoEstudiante}/>
          <Route exact path="/estudiante/puestos-de-trabajo/partners/:PartnerId/jobs/:JobId" component={Puesto}/>
          <Route exact path="/estudiante/mis-postulaciones" component={MisPostulaciones}/>
          <Route exact path="/estudiante/perfil" component={PerfilEstudiante}/>



          <Route path="/login/empresa" component={LoginEmpresas}/>
          <Route exact path="/empresa/mis-puestos-de-trabajo" component={MisPuestosDeTrabajo}/>
          <Route exact path="/empresa/mis-puestos-de-trabajo/:JobId" component={PuestoEmpresaView}/>
          <Route exact path="/empresa/mis-puestos-de-trabajo/:JobId/puesto-editado" component={PuestoEditado}/>
          <Route exact path="/empresa/mis-puestos-de-trabajo/:JobId/postulantes" component={Postulantes}/>
          <Route exact path="/empresa/nuevo-puesto-de-trabajo" component={NuevoPuestoDeTrabajo}/>
          <Route exact path="/empresa/perfil" component={PerfilEmpresa}/>



          <Route exact path="/login/admin" component={LoginAdmins}/>
          <Route exact path="/admin/perfil" component={PerfilAdmin}/>

          <Route exact path="/admin/empresas" component={TodasLasEmpresas}/>
          <Route exact path="/admin/empresas/empresa-editada/:id" component={EmpresaEditada}/>
          <Route exact path="/admin/empresas/crear-empresa" component={EmpresaCreada}/>
          <Route exact path="/admin/empresas/trabajos/:PartnerId" component={TrabajosDeCadaEmpresa}/>
          <Route exact path="/admin/empresas/trabajos/:PartnerId/:JobId/estudiantes" component={PostulantesATrabajos}/>

          <Route exact path="/admin/estudiantes" component={TodosLosEstudiantes}/>
          <Route exact path="/admin/estudiantes/estudiante-editado/:id" component={EstudianteEditado}/>
          <Route exact path="/admin/estudiantes/crear-estudiante" component={EstudianteCreado}/>

          <Route exact path="/admin/todos-los-trabajos" component={TodosLosTrabajos}/>
          <Route exact path="/admin/todos-los-trabajos/ver-trabajo/:PartnerId/:JobId" component={PuestoAdminView}/>



          <Route exact path="/" component={Landing}/>
          


          <Route path="/404" component={NotFoundPage}/>
          <Route path="*">
            <Redirect to="/404"/>
          </Route>
      </Switch>
    </Router>
  );
}
export default App;
