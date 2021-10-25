import React from 'react';
import './Login.css';
//import { useHistory } from 'react-router-dom';
import { withRouter } from "react-router-dom"
import axios from 'axios';
import Cookies from 'universal-cookie';


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
	//alert(this.state.username);
	//alert(this.state.password);
	//const history = useHistory();

	const url = "http://localhost:5000/api/v1/students/login";
	const data = {
	    "username": this.state.username,
	    "password": this.state.password
	};
	//const token = localStorage.getItem("token");
	fetch(url, {
	    method: 'post',
	    headers: { 'Content-Type': 'application/json' },
	    //headers: { 'Content-Type': 'application/json', 'Token': token },
	    body: JSON.stringify(data),
	})
	.then(res => res.json())
	.then(
	        (result) => {
		    //this.setState({
		    //isLoaded: true,
		    //items: result.items
		    //});
		    alert(result);
		    if (result.id) {
			const token = result.token;
			var respuesta=result;
			cookies.set('id', respuesta.id, {path:"/"});
			cookies.set('firstname', respuesta.firstname, {path:"/"});
			cookies.set('lastname', respuesta.lastname, {path:"/"});
			cookies.set('email', respuesta.email, {path:"/"});
			cookies.set('github', respuesta.github, {path:"/"});
			cookies.set('phonenumber', respuesta.phonenumber, {path:"/"});
			alert(`Bienvenido ${respuesta.firstname} ${respuesta.lastname}`);
			localStorage.setItem("token", token);
			this.props.history.push("/estudiante/puestos-de-trabajo");
		    }
		    //this.props.history.push("/estudiante/puestos-de-trabajo");
		    //history.push("/path/to/push");
		},
	        (error) => {
		    //this.setState({
		    //isLoaded: true,
		    //error
		    //});
		    alert("Error al hacer login.");
		    this.props.history.push('/404');
		}
	);
    }

    handleUsernameChange(event) {
	this.setState({username: event.target.value});
    }
    handlePasswordChange(event) {
	this.setState({password: event.target.value});
    }

    render() {
	//let history = useHistory();
	//let mode = "estudiante"
	return (
	        <div className='containerPrincipal'>
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
		<input type="password" placeholder="Contraseña" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
		</div>
		</div>
		<button className="Button" onClick={this.doLogin}>Iniciar Sesión</button>
		</div>
		</div>
		);
	}

}

//export { LoginComponent }
export const LoginComponent_wr = withRouter(LoginComponent);
