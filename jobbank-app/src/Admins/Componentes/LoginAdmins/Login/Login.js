import React from 'react';
import './Login.css';
import apiPath from '../../../../ApiPath';
import { withRouter } from "react-router-dom"
import Cookies from 'universal-cookie';
import swal from 'sweetalert';

const cookies = new Cookies();

class LoginComponent extends React.Component {

  constructor(props) {
		super(props);
		this.state = { username: '', password: '' };
		// This binding is necessary to make `this` work in the callback
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.doLogin = this.doLogin.bind(this);
  }
  doLogin() {
		// Login Function
		const url = apiPath + '/admins/login';
		const data = {
		        "username": this.state.username,
		        "password": this.state.password
		};
		fetch(url, {
		        method: 'post',
		        headers: { 'Content-Type': 'application/json' },
		        body: JSON.stringify(data),
		})
		.then(res => res.json())
		.then(
		  (result) => {
				if (result.id) { // Setting cookies when the user logged in
			    const token = result.token;
			    var respuesta=result;
			    cookies.set('id', respuesta.id, {path:"/"});
			    cookies.set('firstname', respuesta.firstname, {path:"/"});
			    cookies.set('lastname', respuesta.lastname, {path:"/"});
			    cookies.set('email', respuesta.email, {path:"/"});
			    cookies.set('token', respuesta.token, {path:"/"});
			    cookies.set('created_at', respuesta.created_at, {path:"/"});
			    cookies.set('updated_at', respuesta.updated_at, {path:"/"});
			    cookies.set('deleted_at', respuesta.deleted_at, {path:"/"});
					swal({
						title: "Bienvenido(a)", // Sweetalert Welcome
						text: `${respuesta.firstname} ${respuesta.lastname}`,
						icon: "success",
						timer: "2000"
					})
			    localStorage.setItem("token", token);
			    this.props.history.push("/admin/empresas");
				}
		  },
		    (error) => {
					swal({
						title: "Error",
						text: "Usuario y/o Contraseña incorrectos", // Sweetalert incorrect user
						icon: "error",
						dangerMode: true,
						timer: "2000"
						})
					this.props.history.push('/login/admin');
		    }
		);
  }

    handleUsernameChange(event) {
			this.setState({username: event.target.value});
    }
    handlePasswordChange(event) {
			this.setState({password: event.target.value});
    }

    componentDidMount() {
			if(cookies.get('id')){
	    	this.props.history.push("/admin/empresas");
			}
    }

		// Submit when the user press enter
		handleKeyPress = (event) => {
			if(event.key === 'Enter') {
				this.doLogin();
			}
		}

    render() {
			return (
	      <div className='containerPrincipalAdmin'>
					<div className="form-group">
					<div className="User">
					<div className="label_user">
					<label for="user">Usuario</label>
					</div>
					<div className="input_user">
					<input type="text" placeholder="Usuario" name="username" value={this.state.username} onChange={this.handleUsernameChange} />
					</div>
					</div>
					<div className="Password">
					<div className="label_user">
					<label>Contraseña</label>
					</div>
					<div className="input_user">
					<input type="password" onKeyPress={this.handleKeyPress} placeholder="Contraseña" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
					</div>
					</div>
					<button className="Button" onClick={this.doLogin}>Iniciar Sesión</button>
					</div>
				</div>
			);
		}
}

export const LoginComponentWr = withRouter(LoginComponent);
