import React, { useState, useEffect, useRef } from "react";
import "./EditarEstudianteForm.css";
import Countries from "../../../../helpers/Countries.json";
import swal from 'sweetalert';
import { useHistory } from "react-router";
import UserIcon from "../../../Navegador/ImagenesNav/user-icon.png"
import apiPath from "../../../../ApiPath";

/////
import {makeStyles} from '@material-ui/core/styles';
import {Modal, TextField} from '@material-ui/core';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const CrudForm = ({ updateData, dataToEdit }) => {
  const history = useHistory();

  // Form with empty string at start
  const initailForm = {
    student_id: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phonenumber: "",
    age: "",
    nationality: "",
    province: '',
    availability: "",
    pres_or_remot: "",
    description: "",
    photo_filename_logical: "",
    photo_filename_physical: "",
    cv_filename_logical: "",
    cv_filename_physical: "",
  };

  const useStyles = makeStyles(() => ({
    modal3:{
      position: 'absolute',
      width: 1000,
      borderRadius: "30px",
      backgroundColor: ' #f7f9f9 ',
      padding: "16px 32px 24px",
      top:'50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }
  }))

  // Adding state to fill the form with the data received from dataToEdit
  const [form, setForm] = useState(initailForm);
  useEffect(() => {
    setForm(dataToEdit);
  }, [dataToEdit]);

  // This event changes the form every time a key is pressed
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [student, setStudent] = useState([2]);

  React.useEffect(() => {
    obtenerDatosDeEstudiantes();
  }, []);

  let student_id = form.student_id

  const obtenerDatosDeEstudiantes = async () => {
    const data = await fetch(`${apiPath}/students/${student_id}`);
    const applications = await data.json();
    setStudent(applications);
  }

    // Get photoname

  useEffect(() => {
  let photoname = "";
  let cvname = "";

  if (form.photo_filename_physical !== null && form.photo_filename_physical !== undefined){
    photoname = form.photo_filename_physical;
  }

  if (form.cv_filename_physical !== null && form.cv_filename_physical != undefined){
    cvname = form.cv_filename_physical;
  }

  const PhotoId = document.getElementById('photo-id');

  if (form.photo_filename_physical !== null) {
    PhotoId.innerText = photoname;
  } else {
    PhotoId.innerText = "Aún no se ha subido ninguna imagen";
  }

  const cvID = document.getElementById('cv-name');

  if (form.cv_filename_physical !== 'null') {
    cvID.innerText = cvname;
  } else {
    cvID.innerText = "Aún no se ha subido ningun CV";
  }
  });

  let photo = UserIcon;
  if (form.photo_filename_logical != null && form.photo_filename_logical != undefined){
    photo = `${apiPath}/student_photos/${form.photo_filename_logical}`;
  }

  // Sweetalert to confirm when the user clicks in Guardar cambios
  let uploadInputImage = useRef();
  let uploadInputCV = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs() === true) {
      swal({
        title: "EDITAR ESTUDIANTE",
        text: `¿Está seguro de guardar los nuevos del estudiante "${dataToEdit.firstname} ${dataToEdit.lastname}"?`,
        buttons: ["Cancelar", "Guardar"],
      }).then((willEdit) => {
        if (willEdit) {
          // updateData function
          async function updateForm() {
            const updata = await updateData(form);

            // Upload Skills
            if (selectSkills != undefined || selectSkills != null) {
              const dictSkills = {}
              const urlUploadSkills =  `${apiPath}/students/`+ student_id + '/skills'
              const skillsdata = selectSkills.map(obj => obj.id);
              dictSkills['skill_id'] = skillsdata.toString()
              
              fetch(urlUploadSkills, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(dictSkills),
              }).then((response) => {
                response.json().then((body) => {
                  console.log(body);
                });
              })
            }

            // Upload CV
            if (uploadInputCV.files[0] != undefined) {
              const cvData = new FormData();
              cvData.append('file', uploadInputCV.files[0]);
              const urlUploadCV = `${apiPath}/students/`+ student_id + '/uploadcv'

              fetch(urlUploadCV, {
                method: 'POST',
                body: cvData,
              }).then((response) => {
                response.json().then((body) => {
                  console.log(body.cv_filename_physical);
                });
              });
            }
          
            if (uploadInputImage.files[0] != undefined || uploadInputImage.files[0] != null) {
              const fileSize = uploadInputImage.files[0].size / 1024 / 1024
              if (fileSize < 10) {
                const data = new FormData();
                data.append('file', uploadInputImage.files[0]);
                const urlupload = `${apiPath}/students/`+ student_id + '/uploadphoto'
    
                fetch(urlupload, {
                  method: 'POST',
                  body: data,
                }).then((response) => {
                  if (response.ok) {
                  swal("HAS EDITADO EXITOSAMENTE TU PERFIL", {
                    timer:"1500"
                  });
                  setTimeout(() => {
                    history.go(0);
                  }, 1000);
                  window.scrollTo(0, 0);
                } else {
                  swal({
                    title: "Se ha producido un error",
                    text: "Ocurrió un error al subir la imagen",
                    icon: "error",
                    button: "Aceptar"
                  });
                }
                })
              } else {
                const formPhoto = document.getElementById('form-photo');
                const errorPhoto = document.getElementById('smallPhotoError');

                formPhoto.className = 'form-control error';
                errorPhoto.innerText = "El tamaño de la imagen sobrepasa los 10MB";
                window.scrollTo(0, 0);
              }
            } else {
              swal("HAS EDITADO EXITOSAMENTE TU PERFIL", {
                  timer:"1500"
              });
              setTimeout(() => {
                history.go(0);
              }, 1000);
              window.scrollTo(0, 0);
            }
        }
        updateForm();
        }
      });
    } else {
      swal({
        title: "Se ha producido un error",
        text: "Por favor revise que haya ingresado sus datos correctamente",
        icon: "error",
        button: "Aceptar"
      });
    }
  }

  // Getting variables from html

  const inputFirstname = document.getElementById('inputFirstname');
  const inputLastname = document.getElementById('inputLastname');
  const inputEmail = document.getElementById('inputEmail');
  const inputPassword = document.getElementById('inputPassword');
  const inputRepeatPassword = document.getElementById('inputRepeatPassword');
  const inputPhonenumber = document.getElementById('inputPhonenumber');
  const inputAge = document.getElementById('inputAge');
  const inputNationality = document.getElementById('inputNationality');
  const inputAvailability = document.getElementById('inputAvailability');
  const inputProvince = document.getElementById('inputProvince');


   // Validate form inputs

   function validateInputs() {
    let formIsValid = true;

    const firstnamevalue = inputFirstname.value.trim();
    const formFirstname = document.getElementById('form-firstname');
    const errorFirstname = document.getElementById('smallFirstname');

    if (firstnamevalue === "") {
      formFirstname.className = 'form-control error';
      errorFirstname.innerText = "Complete este campo.";
      formIsValid = false;
    } else if (!(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/u.test(firstnamevalue))) {
      formFirstname.className = 'form-control error';
      errorFirstname.innerText = "Use solo letras.";
      formIsValid = false;
    } else {
      formFirstname.classList.remove('error');
    }

    const lastnamevalue = inputLastname.value.trim();
    const formLastname = document.getElementById('form-lastname');
    const errorLastname = document.getElementById('smallLastname');

    if (lastnamevalue === "") {
      formLastname.className = 'form-control error';
      errorLastname.innerText = "Complete este campo.";
      formIsValid = false;
    } else if (!(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/u.test(lastnamevalue))) {
      formLastname.className = 'form-control error';
      errorLastname.innerText = "Use solo letras.";
      formIsValid = false;
    } else {
      formLastname.classList.remove('error');
    }

    const emailvalue = inputEmail.value.trim();
    const formEmail = document.getElementById('form-email')
    const errorEmail = document.getElementById('smallEmail')

    if (emailvalue === "") {
      formEmail.className = 'form-control error';
      errorEmail.innerText = "Complete este campo.";
      formIsValid = false;
    } else if (!(/^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(emailvalue))) {
      formEmail.className = 'form-control error';
      errorEmail.innerText = "Por favor ingrese un email válido";
      formIsValid = false;
    } else {
      formEmail.classList.remove('error');
    }

    const passwordvalue = inputPassword.value.trim();
    const formPassword = document.getElementById('form-password')
    const errorPassword = document.getElementById('smallPassword')

    if (passwordvalue === "") {
      formPassword.classList.remove('error');
    } else if (!(/^^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(passwordvalue))) {
      formPassword.className = 'form-control error';
      errorPassword.innerText = "Use entre 8 y 20 caracteres. Mínimo una letra Mayúscula, una letra minúscula y un número";
      formIsValid = false;
    } else {
      formPassword.classList.remove('error');
    }  

    const repeatpasswordvalue = inputRepeatPassword.value.trim();
    const formRepeatPassword = document.getElementById('form-repeat-password')
    const errorRepeatPassword = document.getElementById('smallRepeatPassword')

    if (passwordvalue != repeatpasswordvalue) {
      formRepeatPassword.className = 'form-control error';
      errorRepeatPassword.innerText = "La contraseña no coincide";
      formIsValid = false;
    } else {
      formRepeatPassword.classList.remove('error');
    }

    const phonenumbervalue = inputPhonenumber.value.trim();
    const formPhonenumber = document.getElementById('form-phonenumber');
    const errorPhonenumber = document.getElementById('smallPhonenumber');

    if (phonenumbervalue === "") {
      formPhonenumber.classList.remove('error');
    } else if (!(/^\+?\(?\d{1,3}\)?[\s.-]?\d{3}[\s.-]?\d{3,6}$/im.test(phonenumbervalue))) {
      formPhonenumber.className = 'form-control error';
      errorPhonenumber.innerText = "Solo puedes ingresar números.";
      formIsValid = false;
    } else {
      formPhonenumber.classList.remove('error');
    }

    const agevalue = inputAge.value.trim();
    const ageintvalue = parseInt(agevalue)
    const formAge = document.getElementById('form-age');
    const errorAge = document.getElementById('smallAge');

    if (ageintvalue === 0) {
      formAge.className = 'form-control error';
      errorAge.innerText = "Complete este campo.";
      formIsValid = false;
    } else if (!(/^[1-9][0-9]{1}$|^99$/.test(ageintvalue))) {
      formAge.className = 'form-control error';
      errorAge.innerText = "Ingrese una edad válida"
      formIsValid = false;
    } else if (typeof(ageintvalue) === "string") { 
      formAge.className = 'form-control error';
      errorAge.innerText = "Solo puedes ingresar números."
      formIsValid = false;
    } else {
      formAge.classList.remove('error');
    }

    /*const availabvalue = inputAvailability.value.trim();
    const formAvailability = document.getElementById('form-availability')
    const errorAvailability = document.getElementById('smallAvailability')
    const selectfor = document.getElementById('inputAvailability');
    const arrayoptions = []
    for (var i = 0; i < selectfor.options.length; i++) {
      arrayoptions.push(selectfor.options[i].value);
    }

    if (availabvalue === "") {
      formAvailability.className = 'form-control error';
      errorAvailability.innerText = "Complete este campo.";
      formIsValid = false;
    } else if (!(arrayoptions.includes(availabvalue))) {
      formAvailability.className = 'form-control error';
      errorAvailability.innerText = "Ingrese una opcion del menú desplegable"
      formIsValid = false;
    } else {
      formAvailability.classList.remove('error');
    }*/

    const provincevalue = inputProvince.value.trim();
    const formProvince = document.getElementById('form-province');
    const errorProvince = document.getElementById('smallProvince');

    if (provincevalue === "") {
      formProvince.className = 'form-control error';
      errorProvince.innerText = "Complete este campo.";
      formIsValid = false;
    } else if (!(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/u.test(provincevalue))) {
      formProvince.className = 'form-control error';
      errorProvince.innerText = "Use solo letras.";
      formIsValid = false;
    } else {
      formProvince.classList.remove('error');
    }

    return formIsValid
  };

  // See the chosen image
  const uploadedImage = React.useRef(null);

  const handleImageUploaded = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const {current} = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
          current.src = e.target.result;
      }
      reader.readAsDataURL(file);
    }
  };

  const [allSkills, setAllSkills] = useState([]);

  const [selectSkills, setSelectSkills] = useState([])

  React.useEffect(() => {
    obtenerDatosDeSkills();
    obtenerSkillsDeEstudiante();
  }, []);

  const obtenerDatosDeSkills = async () => {
    const data = await fetch(`${apiPath}/skills`);
    setAllSkills(await data.json());
  }

  const obtenerSkillsDeEstudiante = async () => {
    const data = await fetch(`${apiPath}/students/${student_id}/skills`);
    setSelectSkills(await data.json());
  }

  const handleRemoveItem = (data,setData, id) => {
    setData(data.filter(item => item.id !== id))
  }

  const styles = useStyles();
  const [searchValue, setSearchValue] = useState('')

  const abrirCerrarSkillsModal = () => {
    setSkillsModal(!skillsModal);
  }
  const [skillsModal, setSkillsModal] = useState(false)

  function RenderAllSkillsList(props) {
    const skills = props.allSkills;
    const HabilidadesSeleccionadas = props.selectSkills;
    const copySelectedSkills = skills.filter((item) => {
      for (let i of HabilidadesSeleccionadas) {
        if (item.id === i.id){
          return true;
        }
      }
    });

    const newArraySkills = skills.filter((item) => !copySelectedSkills.includes(item));
    
    //const uniqueItemss = [...new Set(newArraySkills)]

    const uniqueItemss = newArraySkills.reduce((acc, current) => {
      const x = acc.find(item => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    const filterSkills = uniqueItemss.filter(item => {
      if (item.name.toLowerCase().includes(searchValue)) {
        return true;
      }
    })

    const techSkills = filterSkills.filter((obj)=> obj.type === props.tipo || props.tipo === "all")
    return (
      <div>
        {techSkills.map((skill) => (
            <Chip
              key={skill.id}
              onClick={() => {
                setSelectSkills([...selectSkills, skill]);
                handleRemoveItem(allSkills,setAllSkills, skill.id);
              }}
              sx={{ m: 0.3 }}
              label={skill.name} />
        ))}
      </div>
    );
  }
  

  function RenderSelectedSkillsList(props) {
    const skills = props.selectSkills;
    return (
      <div>
        {skills.map((skill) => (
            <Chip 
              key={skill.id}
              onDelete={() => {
                handleRemoveItem(selectSkills, setSelectSkills, skill.id);
                setAllSkills([...allSkills, skill]);
                
              }} 
              sx={{ m: 0.3 }}
              label={skill.name}
            />
        ))}
      </div>
    );
  }

  const skillsBody=(
    <div className={styles.modal3}>
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <TextField
          fullWidth
          label="Palabra clave"
          id="fullWidth"
          onChange={e => setSearchValue(e.target.value)} 
        />
      </Stack>
      <br/>
      {
        (selectSkills.length !== 0)
        ?
        <Box
        sx={{
          width: 900,
          height: 80,
          display: 'flex',
          flexWrap: 'nowrap',
        }}
        >
        <RenderSelectedSkillsList selectSkills={selectSkills} tipo={"tech"}/>
        </Box>
        :
        ""
      }
      <br/>
      <div align="center">
        <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2} justifyContent="space-around">
          <Stack direction="column"  spacing={2} >
            <Typography variant="h6" gutterBottom component="div">
              Habilidades técnicas
            </Typography>
            <Box
              sx={{
                width: 300,
                height: 300,
                display: 'flex',
                flexWrap: 'nowrap',
                overflowY: "auto"
              }}
            >
              <RenderAllSkillsList allSkills={allSkills} selectSkills={selectSkills} tipo={"tech"}/>
            </Box>
          </Stack>
          <Stack direction="column"  spacing={2} >
            <Typography variant="h6" gutterBottom component="div">
              Habilidades blandas
            </Typography>
            <Box
              sx={{
                width: 300,
                height: 300,
                display: 'flex',
                flexWrap: 'nowrap',
                overflowY: "auto"
              }}
            >
              <RenderAllSkillsList allSkills={allSkills} selectSkills={selectSkills} tipo={"soft"}/>
            </Box>
          </Stack>
          <Stack direction="column" spacing={2} >
            <Typography variant="h6" gutterBottom component="div">
              Otras habilidades
            </Typography>

            <Box
              sx={{
                width: 300,
                height: 300,
                display: 'flex',
                flexWrap: 'nowrap',
                overflowY: "auto"
              }}
            >
              <RenderAllSkillsList allSkills={allSkills} selectSkills={selectSkills} tipo={"other"}/>
            </Box>
          </Stack>
        </Stack>
      </div>
      <br/>


      <div align="right">
        <Stack direction="row-reverse" spacing={2} justifyContent="flex-start" >
        <Button variant="outlined" color="error"
          onClick={()=> abrirCerrarSkillsModal()}
        >
          Cerrar
        </Button>
        </Stack>
      </div>
    </div>
  )

  return (
    <div className="container-profile-edit-student">
      <div className="header-profile">
        <h1>Editar estudiante</h1>
      </div>

      <div className='container-form'>
        <form className='form'>
          {/* Photo */}
          <div className='form-control'>
            <div className="form-Estudiante">
              <div className="form-div">
                <form className="form-form">
                  <div className="photoform-div" id="form-photo">
                    <label htmlFor="inputPhoto" className="col-form-label">Foto de perfil</label>
                    <div className='usericon-div'>
                      <img src={ photo } ref={uploadedImage} className="usericon-form" alt="imagen de usuario" />
                    </div>
                    <p id="photoHelpInline" className="text-muted">Seleccione una imagen cuadrada en formato jpg o png, Max 10MB.</p>
                    <div className="container-selectFile">
                      <div className="box-photo form-control">
                        <input ref={(ref) => { uploadInputImage = ref; }} type="file" accept="image/png, image/jpeg" onChange={handleImageUploaded} />
                      </div>
                      <div className="cv-photo">
                        <a id='photo-id' value={form.photo_filename_logical}>{form.photo_filename_physical}</a>
                      </div>
                      <small id='smallPhotoError'> Error message </small>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className='form-control' id='form-firstname'>
            <label htmlFor="inputFirstname">Nombre (*obligatorio)</label>
            <div className='inputFormDiv'>
              <input type="text" className="form-control" id="inputFirstname" name="firstname" onChange={handleChange} value={form.firstname} maxLength={45}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallFirstname'> Error message </small>
          </div>

          <div className='form-control' id='form-lastname'>
            <label htmlFor="inputLastname">Apellidos (*obligatorio)</label>
            <div className='inputFormDiv'>
              <input type="text" className="form-control" id="inputLastname" name="lastname" onChange={handleChange} value={form.lastname} maxLength={45}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallLastname'> Error message </small>
          </div>

          <div className='form-control' id='form-email'>
            <label htmlFor="inputEmail">Email (*obligatorio)</label>
            <div className='inputFormDiv'>
              <input type="email" className="form-control" id="inputEmail" name="email" onChange={handleChange} value={form.email} maxLength={60}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallEmail'> Error message </small>
          </div>

          <div className="form-control" id='form-password'>
            <label htmlFor="inputPassword">Contraseña</label>
            <div className="inputFormDiv">
              <input type="password" className="form-control" id="inputPassword" name="password" onChange={handleChange} maxLength={20} value={form.password}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallPassword'> Error message </small>
          </div>

          <div className="form-control" id='form-repeat-password'>
            <label htmlFor="inputRepeatPassword">Repetir Contraseña</label>
            <div className="inputFormDiv">
              <input type="password" className="form-control" id="inputRepeatPassword" name="password" maxLength={20}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallRepeatPassword'> Error message </small>
          </div>

          <div className='form-control' id='form-phonenumber'>
            <label htmlFor="inputPhonenumber">Celular</label>
            <div className='inputFormDiv'>
              <input type="tel" className="form-control" id="inputPhonenumber" name="phonenumber" onChange={handleChange} value={form.phonenumber} maxLength={15} />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallPhonenumber'> Error message </small>
          </div>

          <div className='form-control' id='form-age'>
            <label htmlFor="inputAge">Edad (*obligatorio)</label>
            <div className='inputFormDiv'>
              <input type="tel" className="form-control" id="inputAge" name="age" maxLength={2} onChange={handleChange} value={form.age} />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallAge'> Error message </small>
          </div>

          <div className='form-control' id='form-nationality'>
            <label htmlFor="inputNationality">País (*obligatorio)</label>
            <div className='inputFormDiv'>
              <select className="form-control" id="inputNationality" onChange={handleChange} name="nationality" value={form.nationality}>
                <option>{form.nationality}</option>
                {Countries.map(data => {;
                  return <option value={data.country}>{data.country}</option>;
                })}
              </select>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallNationality'> Error message </small>
          </div>

          <div className='form-control' id='form-province'>
            <label htmlFor="inputProvince">Ciudad (*obligatorio)</label>
            <div className="inputFormDiv">
              <input type="text" className="form-control" id="inputProvince" name="province" onChange={handleChange} maxLength={45} value={form.province}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallProvince'> Error message </small>
          </div>

          <div className='form-control'>
            <label htmlFor="inputNationality">Habilidades (*obligatorio)</label>
            <div className='inputFormDiv'>
            <button
              onClick={()=> abrirCerrarSkillsModal()}
              type="button" 
              style={{width: '100%'}}
            >
              Seleccionar habilidades
            </button>
            <Modal
              open={skillsModal}
              onClose={abrirCerrarSkillsModal}
            >
              {skillsBody}
            </Modal>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small> Error message </small>
          </div>

          <div className='form-control' id='form-availability'>
            <label htmlFor="inputAvailability">Estado actual</label>
            <div className='inputFormDiv'>
              <select className="form-control" id="inputAvailability" onChange={handleChange} name="availability" value={form.availability}>
                <option selected disabled hidden></option>
                <option onClick={e => e.target.textarea}>En busca de ofertas laborales</option>
                <option onClick={e => e.target.textarea}>Actualmente trabajando</option>
              </select>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallAvailability'> Error message </small>
          </div>

          <div className='form-control'>
            <label htmlFor="inputPresOrRemote">Modo de trabajo de preferencia</label>
            <div className='inputFormDiv'>
              <select className="form-control" id="inputPresOrRemote" onChange={handleChange} name="pres_or_remot" value={form.pres_or_remot}>
                <option selected disabled hidden></option>
                <option value="Sin preferencia">Sin preferencia</option>
                <option value="Presencial">Presencial</option>
                <option value="Remoto">Remoto</option>
                <option value="Semi-presencial">Semi-presencial</option>
              </select>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small> Error message </small>
          </div>

          <div className='form-control'>
            <label htmlFor="inputDescription">Descripción</label>
            <div className='inputFormDiv'>
              <textarea className="form-control" id="inputDescription" rows="10" maxLength={1000} name="description" onChange={ handleChange } value={form.description} />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small> Error message </small>
          </div>

          <div className='form-control'>
            <div className="form-Estudiante">
              <div className="form-div">
                <form className="form-form">
                  <div className="form-group row">
                    <label htmlFor="inputPhoto" className="col-form-label">Subir CV</label>
                    <div className="container-selectFile">
                      <div className="box-photo form-control">
                        <input ref={(ref) => { uploadInputCV = ref; }} type="file" accept="application/pdf" />
                      </div>
                      <div className="cv-name-div">
                        <a id='cv-name' value={form.cv_filename_physical}>{form.cv_filename_physical}</a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="div-button-create-partner">
            <button
              type="submit"
              className="btn btn-primary m-3"
              onClick={handleSubmit}
              value="Enviar"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrudForm;
