import React from 'react';
import './Login.css';
//import { useHistory } from 'react-router-dom';
import { withRouter } from "react-router-dom"
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

	const url = "http://localhost:5000/api/v1/admins/login";
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
		// alert(result);
		if (result.id) {
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
		    alert(`Bienvenido ${respuesta.firstname} ${respuesta.lastname}`);
		    localStorage.setItem("token", token);
		    this.props.history.push("/admin/empresas");
		}
	    },
	    (error) => {

		alert("Usuario o Contraseña incorrectos");
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
export const LoginComponentWr = withRouter(LoginComponent);
