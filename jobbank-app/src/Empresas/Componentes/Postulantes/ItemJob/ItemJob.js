import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import apiPath from '../../../../ApiPath';

import Accordion from 'react-bootstrap/Accordion'
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Box from "@material-ui/core/Box";
import Card from "@mui/material/Card";
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Container from '@material-ui/core/Container';
import Divider from '@mui/material/Divider';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GitHubIcon from '@mui/icons-material/GitHub';
import Grid from '@material-ui/core/Grid';
import IconButton from '@mui/material/IconButton';
import icoStudent from './user-icon.png';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import LinesEllipsis from "react-lines-ellipsis";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Paper from "@material-ui/core/Paper";
import PlaceIcon from '@mui/icons-material/Place';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import swal from 'sweetalert';
import Typography from "@material-ui/core/Typography";
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';

import student_avatar from "./student_avatar.png"

import 'react-modal-video/scss/modal-video.scss';
import ReactDOM from 'react-dom'
import ModalVideo from 'react-modal-video'

import './ItemJob.css'

function ItemJob(props) {

  const history = useHistory();
  // Card with information of each applicant
  let photo = icoStudent;
  props.setCopia(props.paginaActual);
  // Card with information of each applicant
  const urldown = `${apiPath}/downloadcv/` + props.student.cv_filename_logical;


  const Downloadcv = (cv_filename_logical, nombre, apellido) => {
    if (cv_filename_logical === null) {
      swal({
        title: "Lástima",
        text: `El usuario ${nombre} ${apellido} no ha cargado su CV, intente en otro momento.`,
        icon: "error",
        timer:"4000"
      });      
    } else {
      window.open(urldown);
    }
  }

  if (props.student.photo_filename_logical != null && props.student.photo_filename_logical != undefined) {
    photo = `${apiPath}/student_photos/${props.student.photo_filename_logical}`;
  }

  const sendEmail = () => {
    const student_email = props.student.email;
    const copia_email="valery.vargas@holbertonschool.com"
    const subject=`Búsqueda de programadores`
    const body=`Hola ${props.student.firstname} ${props.student.lastname},%0D%0ASomos de la empresa ${props.partnerName}, queríamos ponernos en contacto con usted para hablar sobre el puesto de trabajo '${props.titleJob}'%0D%0AGracias.`;
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${student_email}&su=${subject}&body=${body}&cc=${copia_email}`, '_blank'); 
  }

  function isYTorVimeo(url) {
    if (url !== null) {
      var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
      if (regexp.test(url)) {
        const a = url.match(/https:\/\/(:?www.)?(\w*)/)[2];
        if (a === "youtube") {
          return (<Box className="videoBox" onClick={()=> setOpen(true)} style={{position: "relative"}} >
                    <CardMedia className="videoCardMedia" component="img" id="video_link-button" image={youtube_parser(props.student.video_link)} value={props.student.video_link} src="https://player.vimeo.com/video/49384334" href={props.student.video_link} />
                    <PlayArrowIcon onClick={()=> setOpen(true)} style={{backgroundColor: "#0b0b0b87", color: "#fff", borderRadius: "50%", position: "absolute", top: "0px", right: "0px", bottom: "0px", left: "0px", margin: "auto", fontSize: "75", cursor: "pointer", cursor: "hand"}}/>
                  </Box>)
        } else if (a === "vimeo") {
          return (<Box className="videoBox" onClick={()=> setOpen(true)} style={{position: "relative"}} >
                    <CardMedia className="videoCardMedia" component="img" id="video_link-button" image={youtube_parser(props.student.video_link)} value={props.student.video_link} src="https://player.vimeo.com/video/49384334" href={props.student.video_link} />
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

  function youtube_parser(url){
    /* get video thumbnail in image*/
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

  function getSkillTechName(stdskill) {
    const arrskills = JSON.parse(stdskill.replace(/'/g, '"'));
    const list_of_names = []
    for (const [key, value] of Object.entries(arrskills)) {
      if (value.type === "tech") {
        list_of_names.push(value.name)
      }
    }
    return list_of_names.splice(0, 7)
  }

  function getLengthOfSkillTech(stdskill) {
    const arrskills = JSON.parse(stdskill.replace(/'/g, '"'));
    let times = 0
    for (const [key, value] of Object.entries(arrskills)) {
      if (value.type === "tech") {
        times += 1
      }
    }
    return times
  }

  return (
    <React.StrictMode>     
      <Card elevation={4} sx={{ width: '100%', height: 330, maxWidth: 1250, my: '15px', display: 'flex', borderRadius: '160px', padding: '30px 20px 30px 30px', alignItems: 'center' }}>
        <Box
          sx={{
            width: '100%',
            padding: '33px 0px 30px 20px',
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <Grid style={{width: '35%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}} >
                <Box
                  onClick={()=>history.push(`/home/candidate/${props.student.student_id}`)}
                  sx={{
                    display: 'flex', justifyContent: 'center', marginBottom: '40px',
                    '&:hover': { cursor: "pointer" },
                  }}
                >
                  <a rel="noopener" style={{display: 'block', textDecoration: 'none', color: 'inherit', width: '80px', cursor: 'pointer', height: '80px', maxWidth: '80px', minWidth: '80px', maxHeight: '80px', minHeight: '80px', marginRight: '25px'}}>
                    <img src={ photo } alt="Profile" style={{display: 'block', width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}} />
                  </a>
                  <Box
                  >
                    <Typography variant="h6"> {props.student.firstname} {props.student.lastname}</Typography>
                    <Typography>{props.student.developer_type} {props.student.specialization ? "- " + props.student.specialization : null}</Typography>
                    <a rel="noopener" style={{color: 'inherit', margin: '4px 0px 4px -4px', display: 'flex', textDecoration: 'none'}}>
                      <PlaceIcon fontSize='small' style={{marginRight: '5px'}} />
                      <Typography variant="body2" style={{fontWeight: '500'}}>{props.student.province} - {props.student.nationality}</Typography>
                    </a>
                  </Box>
                </Box>
                <Grid item>
                  <Stack
                      direction="row"
                      spacing={1}
                      style={{display: 'flex',flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'center', height: '80px'}}
                    >
                      {getSkillTechName(props.student.student_skills).map(skill => <Chip style={{margin: '2px'}} label={skill} />)}
                      {getLengthOfSkillTech(props.student.student_skills) > 7
                        ? <Chip onClick={()=>history.push(`/home/candidate/${props.student.student_id}`)} label="Ver más" style={{ backgroundColor: "rgba(0, 0, 0, 0.15)", margin: '2px' }}/>
                        : null}
                    </Stack>
                </Grid>
              </Grid>
              <Grid container direction="column" justifyContent="space-between" alignItems="baseline" style={{width: '65%', borderLeft: '2px solid #D7D7D7', paddingLeft: '20px'}}>
                <Grid container direction="row" id="grid-buttons-english">
                  {props.student.english_level && props.student.linkedin || props.student.github || props.student.portfolio
                    ? <Grid container direction="row" spacing={2} id="grid-buttons">
                        {props.student.github
                          ? <Grid item xs="auto"><Button variant="contained" startIcon={<GitHubIcon style={{fontSize: '25px'}} />} id="github-button" target="_blank" value={props.student.github} tabindex="0" type="button" href={props.student.github} style={{ minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                              Github
                              <span class="MuiTouchRipple-root"></span>
                            </Button></Grid>
                          : null}
                        {props.student.linkedin
                          ? <Grid item xs="auto"><Button variant="contained" startIcon={<LinkedInIcon style={{fontSize: '25px'}} />} id="linkedin-button" target="_blank" value={props.student.linkedin} tabindex="0" type="button" href={props.student.linkedin} style={{ minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                              Linkedin
                              <span class="MuiTouchRipple-root"></span>
                            </Button></Grid>
                          : null}
                        {props.student.portfolio
                          ?  <Grid item xs="auto"><Button variant="contained" startIcon={<WorkOutlineIcon style={{fontSize: '25px'}} />} id="portfolio-button" target="_blank" value={props.student.portfolio} tabindex="0" type="button" href={props.student.portfolio} style={{ minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                              Portafolio
                              <span class="MuiTouchRipple-root"></span>
                            </Button></Grid>
                          : null}
                        {props.student.github === null && props.student.linkedin === null && props.student.portfolio === null
                          ? <Box>
                              <Button variant="contained" startIcon={<LanguageIcon style={{fontSize: '25px'}} />} id="english-button" value={props.student.english_level} tabindex="0" type="button" style={{ cursor: 'default', minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                                Inglés-{props.student.english_level}
                                <span class="MuiTouchRipple-root"></span></Button>
                            </Box>
                          : null}
                      </Grid>
                    : <Box>
                        <Button variant="contained" startIcon={<LanguageIcon style={{fontSize: '25px'}} />} id="english-button" value={props.student.english_level} tabindex="0" type="button" style={{ cursor: 'default', minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                          Inglés-{props.student.english_level}
                          <span class="MuiTouchRipple-root"></span>
                        </Button>
                      </Box>}
                  {props.student.github !== null && props.student.linkedin !== null && props.student.portfolio !== null
                      ? <Divider style={{height: '35px'}} orientation="vertical" flexItem/>
                    : props.student.github || props.student.linkedin || props.student.portfolio
                      ? <Divider style={{height: '35px', marginLeft: '25px'}} orientation="vertical" flexItem/> 
                    : null}
                  {props.student.english_level && props.student.linkedin || props.student.github || props.student.portfolio
                      ? <Box style={{paddingLeft: '25px', paddingRight: '45px'}}>
                          <Button variant="contained" startIcon={<LanguageIcon style={{fontSize: '25px'}} />} id="english-button" value={props.student.english_level} tabindex="0" type="button" style={{ cursor: 'default', minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                            Inglés-{props.student.english_level}
                            <span class="MuiTouchRipple-root"></span></Button>
                        </Box>
                      : null}
                </Grid>
                {props.student.description && 
                  <Box>
                    <Typography color='textPrimary' align='left' style={{fontSize: '14px', marginTop: '20px', minHeight: '64px', marginBottom: '20px'}}>
                    <LinesEllipsis
                      text={String(props.student.description)}
                      maxLine='5'
                      ellipsis='...'
                      trimRight
                      basedOn='letters'
                    />
                    </Typography>
                  </Box>
                }
                <Stack direction="row" divider={<Divider />} spacing={2}>
                  <Button onClick={()=>sendEmail()} variant="contained" startIcon={<MailOutlineIcon style={{fontSize: '25px'}} />} tabindex="0" type="button" style={{ minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', borderRadius: '4px', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                    Contactar
                    <span class="MuiTouchRipple-root"></span>
                  </Button>
                  <Button variant="contained" startIcon={<VisibilityIcon style={{fontSize: '25px'}} />} tabindex="0" type="button" style={{ minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', borderRadius: '4px', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}
                    onClick={() => Downloadcv(props.student.cv_filename_logical, props.student.firstname, props.student.lastname)} >
                      Ver CV
                    <span class="MuiTouchRipple-root"></span>
                  </Button>
                  <IconButton color="inherit" id="copyIcon" aria-label="share" title="Copiar enlace del perfil" onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/home/candidate/${props.student.student_id}`)
                    }}>
                    <ShareOutlinedIcon />
                  </IconButton>
                  <IconButton color="inherit" aria-label="view more" title="Ver más">
                        <UnfoldMoreOutlinedIcon onClick={()=>{
                          const win = window.open(`/home/candidate/${props.student.student_id}`, "_blank");
                          win.focus();
                        }}
                        />
                  </IconButton>
                </Stack>
              </Grid>
            </Box>
          </Container>
        </Box>
        {isYTorVimeo(props.student.video_link)
              ? <Box className="videoBox" onClick={()=> setOpen(true)} style={{position: "relative"}} >
                    <CardMedia className="videoCardMedia" component="img" id="video_link-button" image={youtube_parser(props.student.video_link)} value={props.student.video_link} src="https://player.vimeo.com/video/49384334" href={props.student.video_link} />
                    <PlayArrowIcon onClick={()=> setOpen(true)} style={{backgroundColor: "#0b0b0b87", color: "#fff", borderRadius: "50%", position: "absolute", top: "0px", right: "0px", bottom: "0px", left: "0px", margin: "auto", fontSize: "75", cursor: "pointer", cursor: "hand"}}/>
                </Box>
              : null}
              {/*react-video-modal*/
              props.student.video_link
              ? getVideo_id(props.student.video_link)
              : null}
      </Card>
    </React.StrictMode>
  );
}

//<a href={urldown} download className='PCVButton'>
export { ItemJob };
