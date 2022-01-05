import React from 'react';
import './LoginEstudiantes.css';
import { IconHolberton } from '../../Componentes/LoginEstudiantes/IconHolberton/IconHolberton';
import { LoginComponentWr } from '../../Componentes/LoginEstudiantes/Login/Login';

class LoginEstudiantes extends React.Component {
    render() {
		return (
	    <div className='LoginEstudiantesContainer'>
		  	<div className='IconHolbLogin'>
		  	  <IconHolberton />
		  	</div>
		  	<div className='BoxLogin'>
		  	  <LoginComponentWr />
		  	</div>
			</div>
		);
  }
}

export { LoginEstudiantes };
