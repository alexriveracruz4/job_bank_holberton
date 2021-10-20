import React from 'react';
import './LoginAdmins.css';
import { IconHolberton } from '../../Componentes/LoginAdmins/IconHolberton/IconHolberton';
import { Login } from '../../Componentes/LoginAdmins/Login/Login';


function LoginAdmins() {
  return (
    <div className='LoginAdminsContainer'>
      <div className='Icon'>
        <IconHolberton />
      </div>
      <div className='BoxLogin'> 
        <Login />
      </div>
    </div>
  );
}

export { LoginAdmins };