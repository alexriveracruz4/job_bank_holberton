import React from 'react';
import './LoginAdmins.css';
import { IconHolberton } from '../../Componentes/LoginAdmins/IconHolberton/IconHolberton';
import { LoginComponentWr } from '../../Componentes/LoginAdmins/Login/Login';


function LoginAdmins() {
  return (
    <div className='LoginAdminsContainer'>
      <div className='IconHolbLogin'>
        <IconHolberton />
      </div>
      <div className='BoxLogin'> 
        <LoginComponentWr />
      </div>
    </div>
  );
}

export { LoginAdmins };
