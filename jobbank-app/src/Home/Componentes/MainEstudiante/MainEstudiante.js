import "./MainEstudiante.css"
import React from 'react';
import Accordion from 'react-bootstrap/Accordion'
import CardMedia from '@mui/material/CardMedia';
import { useEffect, useState } from "react";
import { helpHttp } from "../../../helpers/helpHttp";
import Loader from "../../../helpers/Loader";
import Message from "../../../helpers/Message";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Divider from '@mui/material/Divider';
import Grid from '@material-ui/core/Grid';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useHistory } from "react-router-dom";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import student_avatar from "./student_avatar.png"
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Paper from "@material-ui/core/Paper";

import 'react-modal-video/scss/modal-video.scss';
import ReactDOM from 'react-dom'
import ModalVideo from 'react-modal-video'

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

import LinesEllipsis from "react-lines-ellipsis";
import Typography from "@material-ui/core/Typography";

import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { width } from '@mui/system';

import apiPath from "../../../ApiPath";

import swal from 'sweetalert';
import VisibilityIcon from '@mui/icons-material/Visibility';


function MainEstudiante() {

  const { idUrl } = useParams()

  let api = helpHttp();
  const { StudentId } = useParams();
  let history = useHistory();
  
  window.scrollTo(0, 0);
  const [studentData, setStudentData] = useState(null);
  const [studentSkills, setStudentSkills] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [loadingSkills, setLoadingSkills] = useState(false);

  const [errorSkills, setErrorSkills] = useState(null);

  const obtenerDatosEstudiante = async () => {
    const url = `${apiPath}/students/${StudentId}`;
    setLoading(true);
    api.get(url).then((res) => {
      if (!res.err) {
        const student_data = res;
        setStudentData(student_data);
        setError(null)
      } 
      else {
        setStudentData(null);
        setError(res);
      }
      setLoading(false);
    })
  };

  const obtenerSkillsEstudiante = async () => {
    const url = `${apiPath}/students/${StudentId}/skills`;
    setLoadingSkills(true);
    api.get(url).then((res) => {
      if (!res.err) {
        const student_skills = res;
        setStudentSkills(student_skills);
        setErrorSkills(null)
      } 
      else {
        setStudentSkills(null);
        setErrorSkills(res);
      }
      setLoadingSkills(false);
    })
  };

  useEffect(() => {    
    obtenerDatosEstudiante();
    obtenerSkillsEstudiante();
  }, []);
  
  let photo = student_avatar;

  if (studentData !== null && studentData.photo_filename_logical != null && studentData.photo_filename_logical != undefined  ) {
    photo = `${apiPath}/student_photos/${studentData.photo_filename_logical}`;
  }

  function EmptyArraySkills(array, typeSkill) {
    if (array === null) {
      array = [];
    }
    const techSkills = array.filter((obj)=> obj.type === typeSkill)
    if (techSkills.length != 0) {
      return 1;
    } else {
      return null;
    }
  }

  
  function RenderAllSkillsList(props) {
    let skills = props.studentSkills;
    if (skills === null) {
      skills = [];
    }
    const techSkills = skills.filter((obj)=> obj.type === props.tipo || props.tipo === "all")
    return (
      <div>
        {techSkills.map((skill) => (
            <Chip
              key={skill.id}
              sx={{ m: 0.3 }}
              label={skill.name} />
        ))}
      </div>
    );
  }

  const sendGmailEmail = () => {
    const student_email = studentData.email;
    const copia_email1="valery.vargas@holbertonschool.com";
    const copia_email2="erika.benavides@holbertonschool.com";
    const subject=`B??squeda de programadores`;
    const body=`Hola ${studentData.firstname} ${studentData.lastname},%0D%0AVi tu perfil en la web de Holberton y me gustar??a conversar contigo sobre una posible oferta laboral.%0D%0APor favor responder este correo en caso est??s interesado(a),%0D%0AGracias.`;
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${student_email}&su=${subject}&body=${body}&cc=${copia_email1},${copia_email2}`, '_blank'); 
  }

  const sendOutlookEmail = () => {
    const student_email = studentData.email;
    const copia_email1="valery.vargas@holbertonschool.com";
    const copia_email2="erika.benavides@holbertonschool.com";
    const subject=`B??squeda de programadores`;
    const body=`Hola ${studentData.firstname} ${studentData.lastname},%0D%0AVi tu perfil en la web de Holberton y me gustar??a conversar contigo sobre una posible oferta laboral.%0D%0APor favor responder este correo en caso est??s interesado(a),%0D%0AGracias.`;
    window.location.href = `mailto:${student_email}?Cc=${copia_email1},${copia_email2}&subject=${subject}&body=${body}`; 
  }

  const options = ['Gmail', 'Outlook', 'Copiar email'];

  const [open, setOpenOptions] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    if (index === 0){
      sendGmailEmail();
    }
    if (index === 1){
      sendOutlookEmail();
    }
    if (index === 2){
      navigator.clipboard.writeText(`${studentData.email}`)
    }
    setOpenOptions(false);
  };

  const handleToggle = () => {
    setOpenOptions((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenOptions(false);
  };

  // Video functions:
  function isYTorVimeo(url) {
    if (url !== null) {
      var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
      if (regexp.test(url)) {
        const a = url.match(/https:\/\/(:?www.)?(\w*)/)[2];
        if (a === "youtube") {
          return (<Box className="videoBox" onClick={()=> setOpen(true)} style={{position: "relative"}} >
                    <CardMedia className="videoCardMedia" component="img" id="video_link-button" image={youtube_parser(studentData.video_link)} value={studentData.video_link} src="https://player.vimeo.com/video/49384334" href={studentData.video_link} />
                    <PlayArrowIcon onClick={()=> setOpen(true)} style={{backgroundColor: "#0b0b0b87", color: "#fff", borderRadius: "50%", position: "absolute", top: "0px", right: "0px", bottom: "0px", left: "0px", margin: "auto", fontSize: "75", cursor: "pointer", cursor: "hand"}}/>
                  </Box>)
        } else if (a === "vimeo") {
          return (<Box className="videoBox" onClick={()=> setOpen(true)} style={{position: "relative"}} >
                    <CardMedia className="videoCardMedia" component="img" id="video_link-button" image={youtube_parser(studentData.video_link)} value={studentData.video_link} src="https://player.vimeo.com/video/49384334" href={studentData.video_link} />
                    <PlayArrowIcon onClick={()=> setOpen(true)} style={{backgroundColor: "#0b0b0b87", color: "#fff", borderRadius: "50%", position: "absolute", top: "0px", right: "0px", bottom: "0px", left: "0px", margin: "auto", fontSize: "75", cursor: "pointer", cursor: "hand"}}/>
                  </Box>)
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

  /* react-video-modal */
  const [isOpen, setOpen] = useState(false)

  function getVideo_id(url) {
    if (url !== null) {
      var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
      if (regexp.test(url)) {
        const a = url.match(/https:\/\/(:?www.)?(\w*)/)[2];
        if (a === "youtube") {
          var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
          var match = url.match(regExp);
          const video_id = (match&&match[7].length==11)? match[7] : false;
          return <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={video_id} onClose={() => setOpen(false)} />
        } else if (a === "vimeo") {
        var regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
        var parseUrl = regExp.exec(url)
        return <ModalVideo channel='vimeo' autoplay isOpen={isOpen} videoId={parseUrl[5]} onClose={() => setOpen(false)} />
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

  /* get video thumbnail in image*/
  function youtube_parser(url){
    const a = url.match(/https:\/\/(:?www.)?(\w*)/)[2];
    if (a === "youtube") {
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      var match = url.match(regExp);
      const video_id = (match&&match[7].length==11)? match[7] : false;
      return("https://i1.ytimg.com/vi/" + video_id + "/maxresdefault.jpg")
    } else if (a === "vimeo") {
      var regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
      var parseUrl = regExp.exec(url)
      return "https://vumbnail.com/" + parseUrl[5] + "_large.jpg"
      /*const newurl = "http://vimeo.com/api/v2/video/" + parseUrl[5] + ".json";
      fetch(newurl)
      .then(res => res.json())
      .then(out =>{
        console.log(out[0].thumbnail_large)
        return out[0].thumbnail_large
      })
      .catch(err => {throw err});*/
    } else {
      return("no hay")
    }
  };


  const Downloadcv = (cv_filename_logical, nombre, apellido, urldown) => {
    if (cv_filename_logical === null) {
      swal({
        title: "L??stima",
        text: `El usuario ${nombre} ${apellido} no ha cargado su CV, intente en otro momento.`,
        icon: "error",
        timer:"4000"
      });      
    } else {
      window.open(urldown);
    }
  }

  return (
    <main className="padding-main">
      <div classname="div-title-background" id="div-title-background">
        <p className="title-background">Holberton en el 
          <span className="mundo"> Mundo</span>
        </p>
      </div>
      <div className="container padding mt-3">
        <div className="BackButton">
        <Tooltip title="Atr??s"  placement="right" >
            <ArrowBackIcon 
              onClick={() => {
                history.goBack()
              }}
              sx={{
                background: "transparent",
                height:40,
                width:40,
                fontSize:"small",
                '&:hover': {
                  height:40,
                  fontSize: "large",
                  width:40,
                  cursor:'pointer',
                  background: "white",
                  borderRadius: "50%",
                },  
              }}/>
        </Tooltip>
        </div>
        
        {(error) && <Message/>}
        <div className="StudentsContainer">
          {loading && <Loader/>}
          
          {studentData &&
            <Stack direction="row"  spacing={5} >
            <Box
              sx={{
                minWidth: 850,
                minHeight: 400,
                display: 'flex',
                flexWrap: 'nowrap',
                backgroundColor: 'white',
                borderRadius: 5,
              }}
            >
              <div className="DescriptionContainer">
                <div className="NameAndButtonContainer">
                  <div className="NameContainer">
                    <Box
                      sx={{
                        display: 'flex',
                      }}
                    >
                      <a rel="noopener" title="" style={{display: 'block', textDecoration: 'none', color: 'inherit', width: '80px', cursor: 'pointer', height: '80px', maxWidth: '80px', minWidth: '80px', maxHeight: '80px', minHeight: '80px', marginRight: '25px'}}>
                        <img src={ photo } alt="Profile" style={{display: 'block', width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}} />
                      </a>
                      <Box
                      >
                        <a class="MuiTypography-root MuiTypography-h6 MuiTypography-alignLeft" style={{color: 'inherit', display: 'block', textDecoration: 'none', cursor: 'pointer', lineHeight: '1.7rem', marginBottom: '0.3rem', textAlign: 'left', fontSize: '1.25rem', fontWeight: '500'}} rel="noopener"> {studentData.firstname} {studentData.lastname}</a>
                        <a class="MuiTypography-root jss86 jss127 jss125 MuiTypography-body2 MuiTypography-alignLeft" rel="noopener" style={{color: 'inherit', display: 'block', textDecoration: 'none', textAlign: 'left', fontSize: '1rem', fontWeight: '400', lineHeight: '1.43', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: '1', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book'}}>{studentData.developer_type}</a>
                        <a rel="noopener" style={{color: 'inherit', margin: '4px 0px 4px -4px', display: 'flex', textDecoration: 'none'}}>
                          <svg class="MuiSvgIcon-root" style={{fill: 'currentColor', width: '1em', height: '1em', display: 'inline-block', fontSize: '1.25rem', transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', flexShrink: '0', userSelect: 'none', marginRight: '5px', color: 'inherit', textDecoration: 'none'}} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"></path>
                            <circle cx="12" cy="9" r="2.5"></circle>
                          </svg>
                          <p class="MuiTypography-root MuiTypography-body1" style={{height: '23px', display: '-webkit-box', overflow: 'hidden', fontSize: '14px', marginTop: '1px', textAlign: 'left', WebkitBoxOrient: 'vertical', WebkitLineClamp: '1', fontWeight: '500', lineHeight: '1.5', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book'}}>{studentData.province} - {studentData.nationality}</p>
                        </a>
                      </Box>
                    </Box>
                  </div>
                  <div className="ButtonContainer">
                    <IconButton color="inherit" id="copyIcon" aria-label="share" title="Copiar enlace del perfil" onClick={() => {
                            navigator.clipboard.writeText(`${window.location.href}`)
                          }}>
                          <ShareOutlinedIcon />
                    </IconButton>
                  </div>
                </div>
                <Box id="box-buttons" sx={{width: 'max-content', display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: '20px'}}>
                      
                      {/*studentData.github &&
                      <Box style={{ display: 'flex', marginLeft: '20px', flexGrow: 1}}>
                        <Button variant="contained" startIcon={<GitHubIcon style={{fontSize: '25px'}} />} id="github-button" value={studentData.github} tabindex="0" type="button" target="_blank" href={studentData.github} style={{ minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                            Github
                          <span class="MuiTouchRipple-root"></span>
                        </Button>
                      </Box>
                      }
                      {studentData.linkedin &&
                      <Box style={{ display: 'flex', marginLeft: '20px', flexGrow: 1}}>
                        <Button variant="contained" startIcon={<LinkedInIcon style={{fontSize: '25px'}} />} id="linkedin-button" value={studentData.linkedin} tabindex="0" type="button" target="_blank" href={studentData.linkedin} style={{ minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                            Linkedin
                          <span class="MuiTouchRipple-root"></span>
                        </Button>
                      </Box>
                      }
                      {studentData.portfolio &&
                      <Box style={{ display: 'flex', marginLeft: '20px', flexGrow: 1}}>
                        <Button variant="contained" startIcon={<WorkOutlineIcon style={{fontSize: '25px'}} />} id="portfolio-button" value={studentData.portfolio} tabindex="0" type="button" target="_blank" href={studentData.portfolio} style={{ minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                            Portafolio
                          <span class="MuiTouchRipple-root"></span>
                        </Button>
                      </Box>
                      }
                      {(studentData.portfolio || studentData.english_level || studentData.linkedin || studentData.github || studentData.english_level) &&
                        <Divider style={{height: '35px'}} orientation="vertical" />
                      }
                      
                      {studentData.english_level &&
                      <Box style={{ display: 'flex', marginRight: '20px', marginLeft: '20px', borderLeft: '2px solid #D7D7D7', paddingLeft: '20px', flexGrow: 1}}>
                        <Button variant="contained" startIcon={<LanguageIcon style={{fontSize: '25px'}} />} id="english-button" value={studentData.english_level} tabindex="0" type="button" style={{ cursor: 'default', minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                            Ingl??s-{studentData.english_level}
                          <span class="MuiTouchRipple-root"></span></Button>
                      </Box>
                      */}
                      {studentData.english_level && studentData.linkedin || studentData.github || studentData.portfolio
                        ? <Grid container direction="row" spacing={2} id="grid-buttons">
                            {studentData.github
                              ? <Grid item xs="auto"><Button variant="contained" startIcon={<GitHubIcon style={{fontSize: '25px'}} />} id="github-button" target="_blank" value={studentData.github} tabindex="0" type="button" href={studentData.github} style={{ minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                                  Github
                                  <span class="MuiTouchRipple-root"></span>
                                </Button></Grid>
                              : null}
                            {studentData.linkedin
                              ? <Grid item xs="auto"><Button variant="contained" startIcon={<LinkedInIcon style={{fontSize: '25px'}} />} id="linkedin-button" target="_blank" value={studentData.linkedin} tabindex="0" type="button" href={studentData.linkedin} style={{ minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                                  Linkedin
                                  <span class="MuiTouchRipple-root"></span>
                                </Button></Grid>
                              : null}
                            {studentData.portfolio
                              ?  <Grid item xs="auto"><Button variant="contained" startIcon={<WorkOutlineIcon style={{fontSize: '25px'}} />} id="portfolio-button" target="_blank" value={studentData.portfolio} tabindex="0" type="button" href={studentData.portfolio} style={{ minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                                  Portafolio
                                  <span class="MuiTouchRipple-root"></span>
                                </Button></Grid>
                              : null}
                            {studentData.github === null && studentData.linkedin === null && studentData.portfolio === null && studentData.english_level !== null
                              ? <Box>
                                  <Button variant="contained" startIcon={<LanguageIcon style={{fontSize: '25px'}} />} id="english-button" value={studentData.english_level} tabindex="0" type="button" style={{ cursor: 'default', minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                                    Ingl??s-{studentData.english_level}
                                    <span class="MuiTouchRipple-root"></span></Button>
                                </Box>
                              : null}
                          </Grid>
                        : studentData.english_level !== null /* if the student is new and has not completed his level of English */
                          ? <Box>
                              <Button variant="contained" startIcon={<LanguageIcon style={{fontSize: '25px'}} />} id="english-button" value={studentData.english_level} tabindex="0" type="button" style={{ cursor: 'default', minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                                Ingl??s-{studentData.english_level}
                                <span class="MuiTouchRipple-root"></span>
                              </Button>
                            </Box>
                          : null}
                      {studentData.github === null && studentData.linkedin === null && studentData.portfolio === null
                          ? null
                        : studentData.github || studentData.linkedin || studentData.portfolio
                          ? <Divider style={{height: '35px', marginLeft: '25px'}} orientation="vertical" flexItem/> 
                        : <Divider style={{height: '35px'}} orientation="vertical" flexItem/>}
                      {studentData.english_level && studentData.linkedin || studentData.github || studentData.portfolio
                          ? <Box style={{paddingLeft: '25px', paddingRight: '45px'}}>
                              <Button variant="contained" startIcon={<LanguageIcon style={{fontSize: '25px'}} />} id="english-button" value={studentData.english_level} tabindex="0" type="button" style={{ cursor: 'default', minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                                Ingl??s-{studentData.english_level}
                                <span class="MuiTouchRipple-root"></span></Button>
                            </Box>
                          : null}
                    </Box>
                <div className="AllDescriptionContainer">
                  {studentData.description && 
                  <Box>
                    <Typography color='textPrimary' align='left' style={{whiteSpace: 'pre-line', fontSize: '14px', marginTop: '10px', minHeight: '164px', marginBottom: '10px'}}>
                      {String(studentData.description)}
                    </Typography>
                  </Box>
                  }
                </div>
                <Box style={{ display: 'flex', flexGrow: 1}}>
                        <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                          <Button startIcon={<MailOutlineIcon style={{fontSize: '25px'}} />}
                            style={{ minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', borderRadius: '4px 0px 0px 4px', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}
                            onClick={handleToggle}
                          >
                            Contactar
                          </Button>
                          <Button
                            style={{ minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 0px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', borderRadius: '0px 4px 4px 0px', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}
                            size="small"
                            aria-controls={open ? 'split-button-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            onClick={handleToggle}
                          >
                            <ArrowDropDownIcon />
                          </Button>
                        </ButtonGroup>
                        <Button variant="contained" startIcon={<VisibilityIcon style={{fontSize: '25px'}} />} tabindex="0" type="button" style={{ minWidth: 'max-content', marginRight: '10px', marginLeft: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', border: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}
                            onClick={() => {
                              const urldown = `${apiPath}/downloadcv/` + studentData.cv_filename_logical;
                              Downloadcv(studentData.cv_filename_logical, studentData.firstname, studentData.lastname, urldown);
                              }
                            } >
                            Ver CV
                            <span class="MuiTouchRipple-root"></span>
                        </Button>
                        
                        <Popper
                          open={open}
                          anchorEl={anchorRef.current}
                          role={undefined}
                          transition
                          disablePortal={false}
                          
                        >
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}
                              style={{
                                transformOrigin:
                                  placement === 'bottom' ? 'center top' : 'center bottom',
                              }}
                              
                            >
                              <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                  <MenuList id="split-button-menu" >
                                    {options.map((option, index) => (
                                      <Button variant="contained"
                                        sx={{ backgroundColor: '#FF003C', mx: "10px", my: "4px",
                                         '&:hover': {
                                          backgroundColor: '#FF003C',
                                          color: 'white',
                                          }
                                        }}
                                        key={option}
                                        selected={index === selectedIndex}
                                        onClick={(event) => handleMenuItemClick(event, index)}
                                      >
                                        {option}
                                      </Button>
                                    ))}
                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>
                            </Grow>
                          )}
                        </Popper>
                        {
                        /*
                        <Button onClick={()=>sendEmail()} variant="contained" startIcon={<MailOutlineIcon style={{fontSize: '25px'}} />} tabindex="0" type="button" style={{ minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', borderRadius: '4px', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                          Contactar
                          <span class="MuiTouchRipple-root"></span>
                        </Button>
                        */
                        }
                      </Box>
              </div>
            </Box>
            <Box
              sx={{
                minWidth: 300,
                minHeight: 400,
                display: 'flex',
                flexWrap: 'nowrap',
                backgroundColor: 'white',
                borderRadius: 5,
              }}
            >
              <div className="SkillsContainer"> 
                <div className="TechSkillsContainer">
                  {EmptyArraySkills(studentSkills, "tech") &&
                    <Box>
                      <Typography color='textPrimary' align='left' style={{borderLeft:"4px solid #000", fontSize: '18px', paddingLeft: '7px', marginTop: '10px', minHeight: '5px', marginBottom: '10px'}}>
                        Habilidades T??cnicas
                      </Typography>
                      <RenderAllSkillsList studentSkills={studentSkills} tipo={"tech"}/>
                    </Box> 
                  }             
                </div>
                <div className="SoftSkillsContainer">
                  {EmptyArraySkills(studentSkills, "soft") &&
                    <Box>
                      <Typography color='textPrimary' align='left' style={{borderLeft:"4px solid #000", fontSize: '18px', paddingLeft: '7px', marginTop: '10px', minHeight: '5px', marginBottom: '10px'}}>
                        Habilidades Blandas
                      </Typography>
                      <RenderAllSkillsList studentSkills={studentSkills} tipo={"soft"}/>
                    </Box> 
                  }
                </div>
                <div className="OtherSkillsContainer">
                  {EmptyArraySkills(studentSkills, "other") &&
                    <Box>
                      <Typography color='textPrimary' align='left' style={{borderLeft:"4px solid #000", fontSize: '18px', paddingLeft: '7px', marginTop: '10px', minHeight: '5px', marginBottom: '2px'}}>
                        Otras Habilidades
                      </Typography>
                      <RenderAllSkillsList studentSkills={studentSkills} tipo={"other"}/>
                    </Box> 
                  }
                </div>
              </div>
            </Box>
            </Stack>
          }
        </div>

        {studentData &&
          isYTorVimeo(studentData.video_link)
                ? <Box className="videoBoxRectangle" onClick={()=> setOpen(true)} >
                      <CardMedia className="videoCardMediaRectangle" component="img" id="video_link-button" image={youtube_parser(studentData.video_link)} value={studentData.video_link} src="https://player.vimeo.com/video/49384334" href={studentData.video_link} />
                      <PlayArrowIcon className="playIcon" onClick={()=> setOpen(true)}/>
                  </Box>
                : null}

        {studentData &&
          /*react-video-modal*/
          studentData.video_link
          ? getVideo_id(studentData.video_link)
          : null}
        

        <div className="title-buttons">
          Preguntas frecuentes sobre contratar un desarrollador
        </div>
        <div className="Accordion-FAQ">
        <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>??Qu?? es hire holbies?</Accordion.Header>
                <Accordion.Body>
                  Holberton tiene desarrolladores entrenados en las ??ltimas tecnolog??as listos para unirse a tu equipo. 
                  Somos el mejor partner para encontrar el talento que las empresas necesitan para los equipos de tecnolog??a. 
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>??C??mo encontrar al talento de Holberton?</Accordion.Header>
                <Accordion.Body>
                  Acceda a talento de calidad, ahorra tiempo y dinero permitiendo que nuestro equipo busque candidatos para ti. 
                  En el perfil de cada talento podr??s obtener informaci??n sobre las tecnolog??as que domina, su background, intereses y proyectos. 
                  Puedes encontrar al candidato ideal seg??n su ubicaci??n, habilidades o nivel de ingl??s.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>??Por qu?? contratar al talento de Holberton?</Accordion.Header>
                <Accordion.Body>
                    Trabajamos arduamente para identificar el mejor talento, as?? tu empresa ahorra tiempo, esfuerzos y recursos para encontrarlo.
                    <li>
                      <span>Entendemos tus necesidades:</span> Te compartimos perfiles que hacen match con tu vacante.
                    </li>
                    <li>
                      <span>Acompa??amos tu reclutamiento:</span> Te apoyamos en todas las etapas de b??squeda del mejor talento tech.
                    </li>
                    <li>
                      <span>Perfiles listos para trabajar:</span> Nuestro bootcamp simula un entorno laboral con cultura de trabajo ??gil.
                    </li>
                    <li>
                      <span>Cero costo:</span> en todo este proceso nosotros no cobramos nada.
                    </li>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>??C??mo contactar a un talento de Holberton?</Accordion.Header>
                <Accordion.Body>
                  Nuestra plataforma es muy amigable, 
                  para contactar a un programador solo tienes que seleccionar el bot??n ???Contactar??? 
                  en el perfil del candidato que te haya interesado. 
                  Podr??s enviarle un correo electr??nico y realizarle una propuesta directamente.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
        </div>
      </div>
    </main>
  );
};

export default MainEstudiante;