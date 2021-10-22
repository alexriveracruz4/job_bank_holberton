import React from 'react';
import './Login.css';
import { useHistory } from 'react-router-dom'; 


function Login() {
  let history = useHistory();
  return (
    <div className='containerPrincipal'>
      <div className="form-group">
        <div className="User">
          <div className="label_user">
            <label for="user">Usuario</label>
          </div>
          <div className="input_user">
            <input type="text" placeholder="Usuario" name="username"/>
          </div>
        </div>
        <div className="Password">
          <div className="label_user">
            <label>Contraseña</label>
          </div>
          <div className="input_user">
            <input type="text" placeholder="Contraseña" name="password"/>
          </div>
        </div>
        <button 
          className="Button" 
          onClick={ () => {history.push("/admin/empresas")
          } }>
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
}

export { Login }