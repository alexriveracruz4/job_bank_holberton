import React from 'react';
import './LoginEmpresas.css';
import { IconHolberton } from '../../Componentes/LoginEmpresas/IconHolberton/IconHolberton';
import { Login } from '../../Componentes/LoginEmpresas/Login/Login';


function LoginEmpresas() {
  return (
    <div className='LoginEmpresasContainer'>
      <div className='Icon'>
        <IconHolberton />
      </div>
      <div className='BoxLogin'> 
        <Login />
      </div>
    </div>
  );
}

export { LoginEmpresas };