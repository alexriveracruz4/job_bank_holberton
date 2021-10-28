import React from 'react';
import './Login.css';
//import { useHistory } from 'react-router-dom';
import { withRouter } from "react-router-dom"
import axios from 'axios';
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
		// alert(result);
		if (result.deleted === 0) {
		    const token = result.token;
		    var respuesta=result;
		    cookies.set('id', respuesta.id, {path:"/"});
		    cookies.set('firstname', respuesta.firstname, {path:"/"});
		    cookies.set('lastname', respuesta.lastname, {path:"/"});
		    cookies.set('email', respuesta.email, {path:"/"});
		    cookies.set('github', respuesta.github, {path:"/"});
		    cookies.set('pres_or_remot', respuesta.pres_or_remote, {path:"/"});
		    cookies.set('availability', respuesta.availability, {path:"/"});
		    cookies.set('phonenumber', respuesta.phonenumber, {path:"/"});
		    cookies.set('age', respuesta.age, {path:"/"});
		    cookies.set('nationality', respuesta.nationality, {path:"/"});
		    cookies.set('description', respuesta.description, {path:"/"});
		    cookies.set('disp_travel', respuesta.disp_travel, {path:"/"});
		    cookies.set('linkedin', respuesta.linkedin, {path:"/"});
		    cookies.set('twitter', respuesta.twitter, {path:"/"});
		    cookies.set('token', respuesta.token, {path:"/"});
		    cookies.set('created_at', respuesta.created_at, {path:"/"});
		    cookies.set('updated_at', respuesta.updated_at, {path:"/"});
		    cookies.set('deleted_at', respuesta.deleted_at, {path:"/"});
		    cookies.set('created_by', respuesta.created_by, {path:"/"});
		    cookies.set('updated_by', respuesta.updated_by, {path:"/"});
		    cookies.set('deleted_by', respuesta.deleted_by, {path:"/"});
		    cookies.set('deleted', respuesta.deleted, {path:"/"});
		    cookies.set('cv_filename_physical', respuesta.cv_filename_physical, {path:"/"});
		    cookies.set('cv_filename_logical', respuesta.cv_filename_logical, {path:"/"});
		    cookies.set('photo_filename_physical', respuesta.photo_filename_physical, {path:"/"});
		    cookies.set('photo_filename_logical', respuesta.photo_filename_logical, {path:"/"});

				swal({
					title: "Bienvenido(a)",
					text: `${respuesta.firstname} ${respuesta.lastname}`,
					icon: "success",
					timer: "2000"
				})
		    //alert(`Bienvenido ${respuesta.firstname} ${respuesta.lastname}`);
		    localStorage.setItem("token", token);
		    this.props.history.push("/estudiante/puestos-de-trabajo");
		} else {
		    alert("Usuario o Contraseña incorrectos");
		    this.props.history.push('/login/estudiante');
		}
	    },
	    (error) => {


				swal({
					title: "Error",
					text: "Usuario y/o Contraseña incorrectos",
					icon: "error",
					dangerMode: true,
					timer: "2000"
					})
				//alert("Usuario o Contraseña incorrectos");
				this.props.history.push('/login/estudiante');
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
            this.props.history.push("/estudiante/puestos-de-trabajo");
        }
    }

		handleKeyPress = (event) => {
			if(event.key === 'Enter') {
				this.doLogin();
			}
		}
    render() {
	//let history = useHistory();
	//let mode = "estudiante"
	return (
	        <div className='containerPrincipalEstudiante'>
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

//export { LoginComponent }
export const LoginComponentWr = withRouter(LoginComponent);
