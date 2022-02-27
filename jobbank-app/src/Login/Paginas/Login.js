import React from 'react';
import { GlobalLoginComponete } from '../Componentes/GlobalLoginComponete';
import { IconHolberton } from '../Componentes/IconHolberton';
import "./Login.css";

function Login() {
	return (
		<div className='LoginEstudiantesContainer'>
		  <div className='IconHolbLogin'>
		    <IconHolberton />
		  </div>
		  <div className='BoxLogin'>
		    <GlobalLoginComponete />
		  </div>
		</div>
	);
}

export { Login };
