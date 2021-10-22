import React from 'react';
import './LoginEstudiantes.css';
import { IconHolberton } from '../../Componentes/LoginEstudiantes/IconHolberton/IconHolberton';
import { Login } from '../../Componentes/LoginEstudiantes/Login/Login';


function LoginEstudiantes() {
  return (
    <div className='LoginEstudiantesContainer'>
      <div className='Icon'>
        <IconHolberton />
      </div>
      <div className='BoxLogin'> 
        <Login />
      </div>
    </div>
  );
}

export { LoginEstudiantes };