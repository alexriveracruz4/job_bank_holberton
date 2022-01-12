import React from 'react';
//import './Login.css';
import { withRouter } from "react-router-dom"
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import apiPath from '../../ApiPath';


const cookies = new Cookies();
class LoginComponete extends React.Component {

    constructor(props) {
			super(props);
			this.state = { username: '', password: '' };
			// This binding is necessary to make `this` work in the callback
			this.handleUsernameChange = this.handleUsernameChange.bind(this);
			this.handlePasswordChange = this.handlePasswordChange.bind(this);
			this.doLogin = this.doLogin.bind(this);
    }

    doLogin() {

			const url = `${apiPath}/login`;
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
					.then((result) => {
            if (result.__class__ === "Student") {
						  if (result.deleted === 0) { //setting cookies when the user logged in
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

						  	// Sweetalert Welcome
						  	swal({
						  		title: "Bienvenido(a)",
						  		text: `${respuesta.firstname} ${respuesta.lastname}`,
						  		icon: "success",
						  		timer: "2000"
						  	})
		   			  	localStorage.setItem("token", token);
		   			  	this.props.history.push("/estudiante/puestos-de-trabajo");
						  } else { // Sweetalert incorrect user
		    		  	swal({
                  title: "Error",
                  text: "Lo sentimos, su usuario ha sido eliminado",
                  icon: "warning",
                  dangerMode: true,
                  timer: "2000"
                })
		    		  	this.props.history.push('/login');
						  }
            } else if (result.__class__ === "Partner") {
                if (result.deleted === 0) { // //setting cookies when the user logged in
                  const token = result.token;
                  var respuesta=result;
                  cookies.set('id', respuesta.id, {path:"/"});
                  cookies.set('name', respuesta.name, {path:"/"});
                  cookies.set('email', respuesta.email, {path:"/"});
                  cookies.set('nation', respuesta.nation, {path:"/"});
                  cookies.set('region', respuesta.region, {path:"/"});
                  cookies.set('description', respuesta.description, {path:"/"});
                  cookies.set('phonenumber', respuesta.phonenumber, {path:"/"});
                  cookies.set('web', respuesta.web, {path:"/"});
                  cookies.set('token', respuesta.token, {path:"/"});
                  cookies.set('created_at', respuesta.created_at, {path:"/"});
                  cookies.set('updated_at', respuesta.updated_at, {path:"/"});
                  cookies.set('deleted_at', respuesta.deleted_at, {path:"/"});
                  cookies.set('created_by', respuesta.created_by, {path:"/"});
                  cookies.set('updated_by', respuesta.updated_by, {path:"/"});
                  cookies.set('deleted_by', respuesta.deleted_by, {path:"/"});
                  cookies.set('deleted', respuesta.deleted, {path:"/"});
                  cookies.set('logo_filename_physical', respuesta.logo_filename_physical, {path:"/"});
                  cookies.set('logo_filename_logical', respuesta.logo_filename_logical, {path:"/"});
                
                  swal({ // Sweetalert Welcome
                    title: "Bienvenido",
                    text: `${respuesta.name}`,
                    icon: "success",
                    timer: "2000"
                  })
                  localStorage.setItem("token", token);
                  this.props.history.push("/empresa/mis-puestos-de-trabajo");
                } else {
                    swal({
                      title: "Error",
                      text: "Lo sentimos, su usuario ha sido eliminado",
                      icon: "warning",
                      dangerMode: true,
                      timer: "2000"
                    }) // Sweetalert incorrect user
                    this.props.history.push('/login');
                  }
            } else if (result.__class__ === "Admin") {
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
            }

	    		}, (error) => {
						swal({
							title: "Error",
							text: "Usuario y/o Contraseña incorrectos",
							icon: "error",
							dangerMode: true,
							timer: "2000"
						})
						this.props.history.push('/login');
	    	});
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

		// Submit when the user press enter
		handleKeyPress = (event) => {
			if(event.key === 'Enter') {
				this.doLogin();
			}
		}
    render() {
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

export const GlobalLoginComponete = withRouter(LoginComponete);
