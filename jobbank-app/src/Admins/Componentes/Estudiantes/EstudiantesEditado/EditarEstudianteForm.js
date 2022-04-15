import React, { useState, useEffect, useRef } from "react";
import { useParams } from 'react-router-dom'
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

import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";


const CrudForm = ({ updateData, dataToEdit }) => {
  const history = useHistory();
  const { id } = useParams();

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
    province: "",
    developer_type: "",
    specialization: "",
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

  // Get video id
  function getVideo_id(url) {
    if (url !== null) {
      var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
      if (regexp.test(url)) {
        const a = url.match(/https:\/\/(:?www.)?(\w*)/)[2];
        if (a === "youtube") {
          var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
          var match = url.match(regExp);
          const video_id = (match&&match[7].length==11)? match[7] : false;
          return video_id
        } else if (a === "vimeo") {
        var regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
        var parseUrl = regExp.exec(url)
        return parseUrl[5]
        } else {
          return null
        }
      } else {
        return null
      }
    } else {
      return null
    }
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
              swal("HAS EDITADO EXITOSAMENTE LOS DATOS DEL ESTUDIANTE", {
                  timer:"1500"
              });
              setTimeout(() => {
                let path = `/admin/estudiantes`; 
                history.push(path);
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
  const inputDeveloperType = document.getElementById('inputDeveloperType');
  const inputLinkedIn = document.getElementById('inputLinkedIn');
  const inputGithub = document.getElementById('inputGithub');
  const inputTwitter = document.getElementById('inputTwitter');
  const inputPortfolio = document.getElementById('inputPortfolio');
  const inputEnglishLevel = document.getElementById('inputEnglishLevel');


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
      formProvince.classList.remove('error');
    } else if (!(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/u.test(provincevalue))) {
      formProvince.className = 'form-control error';
      errorProvince.innerText = "Use solo letras.";
      formIsValid = false;
    } else {
      formProvince.classList.remove('error');
    }

    const developertypeValue = inputDeveloperType.value.trim();
    const formDeveloperType = document.getElementById('form-developer_type');
    const errorDeveloperType = document.getElementById('smallDeveloperType');
    const selectforDeveloperType = document.getElementById('inputDeveloperType');
    const arrayoptionsDeveloperType = []
    for (var i = 0; i < selectforDeveloperType.options.length; i++) {
      arrayoptionsDeveloperType.push(selectforDeveloperType.options[i].value);
    }

    if (developertypeValue === "") {
      formDeveloperType.classList.remove('error');
    } else if (!(arrayoptionsDeveloperType.includes(developertypeValue))) {
      formDeveloperType.className = 'form-control error';
      errorDeveloperType.innerText = "Ingrese una opcion del menú desplegable"
      formIsValid = false;
    } else {
      formDeveloperType.classList.remove('error');
    }

    const english_levelValue = inputEnglishLevel.value.trim();
    const formEnglishLevel = document.getElementById('form-english_level')
    const errorEnglishLevel = document.getElementById('smallEnglishLevel')
    const selectforEnglishLevel = document.getElementById('inputEnglishLevel');
    const arrayoptionsEnglishLevel = []
    for (var i = 0; i < selectforEnglishLevel.options.length; i++) {
      arrayoptionsEnglishLevel.push(selectforEnglishLevel.options[i].value);
    }

    const LinkedInValue = inputLinkedIn.value.trim();
    const formLinkedIn = document.getElementById('form-linkedin');
    const errorLinkedIn = document.getElementById('smallLinkedIn')

    if (LinkedInValue !== "") {
      if (LinkedInValue.indexOf("http://") !== 0 && LinkedInValue.indexOf("https://") !== 0) {
        formLinkedIn.className = 'form-control error';
        errorLinkedIn.innerText = "Por favor ingrese un enlace valido (http:// o https:// requerido)";
        formIsValid = false;
      }
    }

    const GithubValue = inputGithub.value.trim();
    const formGithub = document.getElementById('form-github');
    const errorGithub = document.getElementById('smallGithub')

    if (GithubValue !== "") {
      if (GithubValue.indexOf("http://") !== 0 && GithubValue.indexOf("https://") !== 0) {
        formGithub.className = 'form-control error';
        errorGithub.innerText = "Por favor ingrese un enlace valido (http:// o https:// requerido)";
        formIsValid = false;
      }
    }

    const TwitterValue = inputTwitter.value.trim();
    const formTwitter = document.getElementById('form-twitter');
    const errorTwitter = document.getElementById('smallTwitter')

    if (TwitterValue !== "") {
      if (TwitterValue.indexOf("http://") !== 0 && TwitterValue.indexOf("https://") !== 0) {
        formTwitter.className = 'form-control error';
        errorTwitter.innerText = "Por favor ingrese un enlace valido (http:// o https:// requerido)";
        formIsValid = false;
      }
    }

    const portfolioValue = inputPortfolio.value.trim();
    const formPortfolio = document.getElementById('form-portfolio');
    const errorPortfolio = document.getElementById('smallPortfolio')
  
    if (portfolioValue !== "") {
      if (portfolioValue.indexOf("http://") !== 0 && portfolioValue.indexOf("https://") !== 0) {
        formPortfolio.className = 'form-control error';
        errorPortfolio.innerText = "Por favor ingrese un enlace valido (http:// o https:// requerido)";
        formIsValid = false;
      }
    }

    if (english_levelValue === "") {
      formEnglishLevel.classList.remove('error');
    } else if (!(arrayoptionsEnglishLevel.includes(english_levelValue))) {
      formEnglishLevel.className = 'form-control error';
      errorEnglishLevel.innerText = "Ingrese una opcion del menú desplegable"
      formIsValid = false;
    } else {
      formEnglishLevel.classList.remove('error');
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
    const data = await fetch(`${apiPath}/students/${id}/skills`);
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


  function dynamicSort(property) {
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        if(sortOrder == -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
  }

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
    uniqueItemss.sort(dynamicSort("name"));
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
              style={{backgroundColor: "rgba(0, 0, 0, 0.08)", borderRadius: "16px", margin:"3px"}}
              label={skill.name} />
        ))}
      </div>
    );
  }
  
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const [passwordShownRepeat, setPasswordShownRepeat] = useState(false);
  const togglePasswordRepeat = () => {
    setPasswordShownRepeat(!passwordShownRepeat);
  };

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
              style={{backgroundColor: "rgba(0, 0, 0, 0.08)", borderRadius: "16px", margin:"3px"}}
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
          overflowY: "auto"
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
          style={{padding: "5px 15px", borderRadius: "4px", margin:"3px", fontWeight: 500, color:"#d32f2f", border: "solid 1px #d32f2f"}}
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
              <Input
                type="email"
                onChange={handleChange}
                value={form.email}
                maxLength={60}
                autoComplete="new-email" 
                className="form-control" 
                id="inputEmail" 
                name="email"
              />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallEmail'> Error message </small>
          </div>

          <div className="form-control" id='form-password'>
            <label htmlFor="inputPassword">Contraseña</label>
            <div className="inputFormDiv">
              <Input
                type={passwordShown  ? "text" : "password"}
                onChange={handleChange}
                value={form.password}
                maxLength={20}
                autoComplete="new-password" 
                className="form-control" 
                id="inputPassword" 
                name={passwordShown  ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={()=>togglePassword()}
                    >
                      {passwordShown ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallPassword'> Error message </small>
          </div>

          <div className="form-control" id='form-repeat-password'>
            <label htmlFor="inputRepeatPassword">Repetir Contraseña</label>
            <div className="inputFormDiv">
              <Input
                type={passwordShownRepeat  ? "text" : "password"}
                maxLength={20}
                className="form-control" 
                id="inputRepeatPassword" 
                name={passwordShownRepeat  ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={()=>togglePasswordRepeat()}
                    >
                      {passwordShownRepeat ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
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

          <div className='form-control' id='form-developer_type'>
            <label htmlFor="inputDeveloperType">Tipo de desarrollador (*obligatorio)</label>
            <div className='inputFormDiv'>
              <select className="form-control" id="inputDeveloperType" onChange={handleChange} name="developer_type" value={form.developer_type}>
                <option selected disabled hidden></option>
                <option onClick={e => e.target.textarea}>Full-stack</option>
                <option onClick={e => e.target.textarea}>Front-end</option>
                <option onClick={e => e.target.textarea}>Back-end</option>
              </select>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallDeveloperType'> Error message </small>
          </div>

          <div className='form-control' id='form-specialization'>
            <label htmlFor="inputSpecialization">Especialización complementaria</label>
            <div className="inputFormDiv">
              <input type="text" className="form-control" id="inputSpecialization" name="specialization" placeholder="Machine Learning" onChange={handleChange} maxLength={45} value={form.specialization}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallSpecialization'> Error message </small>
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

          <div className='form-control' id='form-english_level'>
            <label htmlFor="inputEnglishLevel">Nivel de ingles (*obligatorio)</label>
            <div className='inputFormDiv'>
              <select className="form-control" id="inputEnglishLevel" onChange={handleChange} name="english_level" value={form.english_level}>
                <option selected disabled hidden></option>
                <option onClick={e => e.target.textarea}>No ingles</option>
                <option onClick={e => e.target.textarea}>A1</option>
                <option onClick={e => e.target.textarea}>A2</option>
                <option onClick={e => e.target.textarea}>B1</option>
                <option onClick={e => e.target.textarea}>B2</option>
                <option onClick={e => e.target.textarea}>C1</option>
                <option onClick={e => e.target.textarea}>C2</option>
              </select>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallEnglishLevel'> Error message </small>
          </div>

          <div className='form-control' id='form-portfolio'>
            <label htmlFor="inputPortfolio">Enlace a portafolio</label>
            <div className="inputFormDiv">
              <input type="text" className="form-control" id="inputPortfolio" name="portfolio" placeholder="https://www.ryansimon-pages.co/" onChange={handleChange} maxLength={45} value={form.portfolio}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallPortfolio'> Error message </small>
          </div>

          <div className='form-control' id='form-video_link'>
            <label htmlFor="inputVideoLink">Video de portafolio</label>
            <div className="inputFormDiv">
              <input type="text" className="form-control" id="inputVideoLink" name="video_link" placeholder='https://www.youtube.com/watch?v=1kpUImeLw3s' onChange={handleChange} maxLength={100} value={form.video_link}/>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallVideoLink'> Error message </small>
            {form.video_link
                ? <div className='display-video' style={{display: 'flex', justifyContent: 'center'}}>
                    <iframe src={`https://www.youtube.com/embed/${getVideo_id(form.video_link)}`}
                      frameborder='0'
                      allow='autoplay; encrypted-media'
                      allowfullscreen
                      title='video'
                      style={{width: '80%', height: '40vh'}}
                    /></div>
                : null}
          </div>


          <div className='form-control'>
            <label htmlFor="inputDisptravel">Disponibilidad para viajar</label>
            <div className='inputFormDiv'>
              <select className="form-control" id="inputDiptravel" onChange={handleChange} name="disp_travel" value={form.disp_travel}>
                <option selected disabled hidden>{form.disp_travel}</option>
                <option value="Disponible">Disponible</option>
                <option value="No disponible">No disponible</option>
              </select>
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small> Error message </small>
          </div>

          <div className='form-control' id="form-linkedin">
            <label htmlFor="inputLinkedIn">LinkedIn</label>
            <div className='inputFormDiv'>
              <input type="text" className="form-control" id="inputLinkedIn" name="linkedin" placeholder='https://www.linkedin.com/in/nombredeusuario' onChange={handleChange} maxLength={70} value={form.linkedin} />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallLinkedIn'> Error message </small>
          </div>

          <div className='form-control' id="form-github">
            <label htmlFor="inputGithub">Github</label>
            <div className='inputFormDiv'>
              <input type="text" className="form-control" id="inputGithub" name="github" placeholder='https://github.com/nombredeusuario' onChange={handleChange} maxLength={70} value={form.github} />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id='smallGithub'> Error message </small>
          </div>

          <div className='form-control' id="form-twitter">
            <label htmlFor="inputTwitter">Twitter</label>
            <div className='inputFormDiv'>
              <input type="text" className="form-control" id="inputTwitter" name="twitter" placeholder='https://twitter.com/nombredeusuario' pattern="https://.*" onChange={handleChange} maxLength={70} value={form.twitter} />
              <i className="fas fa-check-circle" />
              <i className="fas fa-exclamation-circle" />
            </div>
            <small id="smallTwitter"> Error message </small>
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
