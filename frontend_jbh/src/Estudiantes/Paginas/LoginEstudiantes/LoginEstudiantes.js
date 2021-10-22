import React from 'react';
import './LoginEstudiantes.css';
import { IconHolberton } from '../../Componentes/LoginEstudiantes/IconHolberton/IconHolberton';
import { LoginComponent } from '../../Componentes/LoginEstudiantes/Login/Login';

/*
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
*/

class LoginEstudiantes extends React.Component {

    render() {
	return (
		<div className='LoginEstudiantesContainer'>
		  <div className='Icon'>
		    <IconHolberton />
		  </div>
		  <div className='BoxLogin'>
		    <LoginComponent />
		  </div>
		</div>
	);
    }

}

export { LoginEstudiantes };
