import React from 'react';
import './LoginEmpresas.css';
import { IconHolberton } from '../../Componentes/LoginEmpresas/IconHolberton/IconHolberton';
import { LoginComponentWr } from '../../Componentes/LoginEmpresas/Login/Login';


function LoginEmpresas() {
  return (
    <div className='LoginEmpresasContainer'>
      <div className='IconHolbLogin'>
        <IconHolberton />
      </div>
      <div className='BoxLogin'> 
        <LoginComponentWr />
      </div>
    </div>
  );
}

export { LoginEmpresas };
