import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion'
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Box from "@material-ui/core/Box";
import Card from "@mui/material/Card";
import Container from '@material-ui/core/Container';
import Divider from '@mui/material/Divider';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GitHubIcon from '@mui/icons-material/GitHub';
import Grid from '@material-ui/core/Grid';
import IconButton from '@mui/material/IconButton';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import mysvg from "../images/Magnifying_glass_icon.svg";
import LinesEllipsis from "react-lines-ellipsis";
import apiPath from '../../../ApiPath';
import student_avatar from "./student_avatar.png"

function ItemStudent(props) {

  const history = useHistory();
  let photo = student_avatar;

  if (props.student.photo_filename_logical != null && props.student.photo_filename_logical != undefined) {
    photo = `${apiPath}/student_photos/${props.student.photo_filename_logical}`;
  }



  const [favoriteIcon, setFavoriteIcon] = useState(false);

  function FavoriteIconState() {
    if (props.favorites !== null) {
      if (props.favorites.includes(props.student.student_id)) {
        return (<FavoriteIcon style={{color: "red"}} onClick={()=>{
          {favoriteIcon ? setFavoriteIcon(false) : setFavoriteIcon(true)}
              if (props.favorites !== null) {
                if (props.favorites.includes(props.student.student_id)) {
                  props.setFavorites(props.favorites.filter(item => item !== props.student.student_id))
                  
                } else {
                  props.setFavorites([...props.favorites, props.student.student_id])
                }
              } else {
                props.setFavorites([props.student.student_id])
              }
            }}/>)
      } else { 
        return (<FavoriteBorderOutlinedIcon onClick={()=>{
          {favoriteIcon ? setFavoriteIcon(false) : setFavoriteIcon(true)}
              if (props.favorites !== null) {
                if (props.favorites.includes(props.student.student_id)) {
                  props.setFavorites(props.favorites.filter(item => item !== props.student.student_id))
                  
                } else {
                  props.setFavorites([...props.favorites, props.student.student_id])
                }
              } else {
                props.setFavorites([props.student.student_id])
              }
        }}/>);
      };
    } else {
      return (<FavoriteBorderOutlinedIcon onClick={()=>{
        {favoriteIcon ? setFavoriteIcon(false) : setFavoriteIcon(true)}
            if (props.favorites !== null) {
              if (props.favorites.includes(props.student.student_id)) {
                props.setFavorites(props.favorites.filter(item => item !== props.student.student_id))
                
              } else {
                props.setFavorites([...props.favorites, props.student.student_id])
              }
            } else {
              props.setFavorites([props.student.student_id])
            }
      }}/>);
    };
  };


  const sendEmail = () => {
    const student_email = props.student.email;
    const copia_email="valery.vargas@holbertonschool.com"
    const subject=`BÚSQUEDA DE PROGRAMADORES`
    const body="Muy buenos días, tardes o noches, pude ver tu perfil en Holberton y me gustaría hablarte sobre una oportunidad laboral que podría interesarte."
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${student_email}&su=${subject}&body=${body}&cc=${copia_email}`, '_blank'); 
  }

  return (
    <React.StrictMode>     
          <Card elevation={4} sx={{ width: '100%', height: 320, maxWidth: 1170, my: '15px', display: 'flex', borderRadius: '160px', padding: '30px' }}>
            <Box
              sx={{
                width: '100%',
                padding: '33px 20px 30px',
              }}
            >
              <Container maxWidth="lg">
                <Box
                  sx={{
                    display: 'flex',
                  }}
                >
                  <Grid style={{width: '40%'}} container direction="column" justifyContent="space-between">
                    <Box
                      onClick={()=>history.push(`/home/candidate/${props.student.student_id}`)}
                      sx={{
                        display: 'flex', marginBottom: '40px',
                        '&:hover': { cursor: "pointer" },
                      }}
                    >
                      <a rel="noopener" title="" style={{display: 'block', textDecoration: 'none', color: 'inherit', width: '80px', cursor: 'pointer', height: '80px', maxWidth: '80px', minWidth: '80px', maxHeight: '80px', minHeight: '80px', marginRight: '25px'}}>
                        <img src={ photo } alt="Profile" style={{display: 'block', width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}} />
                      </a>
                      <Box
                      >
                        <a class="MuiTypography-root MuiTypography-h6 MuiTypography-alignLeft" style={{color: 'inherit', display: 'block', textDecoration: 'none', cursor: 'pointer', lineHeight: '1.7rem', marginBottom: '0.3rem', textAlign: 'left', fontSize: '1.25rem', fontWeight: '500'}} rel="noopener"> {props.student.firstname} {props.student.lastname}</a>
                        <a class="MuiTypography-root jss86 jss127 jss125 MuiTypography-body2 MuiTypography-alignLeft" rel="noopener" style={{color: 'inherit', display: 'block', textDecoration: 'none', textAlign: 'left', fontSize: '1rem', fontWeight: '400', lineHeight: '1.43', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: '1', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book'}}>{props.student.developer_type}</a>
                        <a rel="noopener" style={{color: 'inherit', margin: '4px 0px 4px -4px', display: 'flex', textDecoration: 'none'}}>
                          <svg class="MuiSvgIcon-root" style={{fill: 'currentColor', width: '1em', height: '1em', display: 'inline-block', fontSize: '1.25rem', transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', flexShrink: '0', userSelect: 'none', marginRight: '5px', color: 'inherit', textDecoration: 'none'}} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"></path>
                            <circle cx="12" cy="9" r="2.5"></circle>
                          </svg>
                          <p class="MuiTypography-root MuiTypography-body1" style={{height: '23px', display: '-webkit-box', overflow: 'hidden', fontSize: '14px', marginTop: '1px', textAlign: 'left', WebkitBoxOrient: 'vertical', WebkitLineClamp: '1', fontWeight: '500', lineHeight: '1.5', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book'}}>{props.student.province} - {props.student.nationality}</p>
                        </a>
                      </Box>
                    </Box>
                    <Grid item>
                      <Stack
                          direction="row"
                          divider={<Divider style={{height: '30px'}} orientation="vertical" flexItem />}
                          spacing={2}
                          style={{display: 'flex',flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'center'}}
                        >
                          {JSON.parse(props.student.student_skills.replace(/'/g, '"')).slice(0, 7).map(skill => <p id="skill">{skill.name}</p>)}
                        </Stack>
                    </Grid>
                  </Grid>
                  <Grid container direction="column" justifyContent="space-between" alignItems="baseline" style={{width: '60%', borderLeft: '2px solid #D7D7D7', paddingLeft: '20px'}}>
                    <Stack direction="row" divider={<Divider />} spacing={2}>
                      {props.student.github
                        ? <Button variant="contained" startIcon={<GitHubIcon style={{fontSize: '25px'}} />} id="github-button" target="_blank" value={props.student.github} tabindex="0" type="button" href={props.student.github} style={{ minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                            Github
                            <span class="MuiTouchRipple-root"></span>
                          </Button>
                        : null}
                      {props.student.linkedin
                        ? <Button variant="contained" startIcon={<LinkedInIcon style={{fontSize: '25px'}} />} id="linkedin-button" target="_blank" value={props.student.linkedin} tabindex="0" type="button" href={props.student.linkedin} style={{ minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                            Linkedin
                            <span class="MuiTouchRipple-root"></span>
                          </Button>
                        : null}
                      {props.student.portfolio
                        ?  <Button variant="contained" startIcon={<WorkOutlineIcon style={{fontSize: '25px'}} />} id="portfolio-button" target="_blank" value={props.student.portfolio} tabindex="0" type="button" href={props.student.portfolio} style={{ minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                            portafolio
                            <span class="MuiTouchRipple-root"></span>
                          </Button>
                        : null}
                      {props.student.github !== null || props.student.linkedin !== null || props.student.portfolio !== null
                        ? <Divider style={{height: '35px'}} orientation="vertical" />
                        : null}
                      {props.student.english_level 
                        ? <Box>
                            <Button variant="contained" startIcon={<LanguageIcon style={{fontSize: '25px'}} />} id="english-button" value={props.student.english_level} tabindex="0" type="button" style={{ cursor: 'default', minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                              Inglés-{props.student.english_level}
                              <span class="MuiTouchRipple-root"></span></Button>
                          </Box>
                        : null}
                    </Stack>
                    {props.student.description && 
                      <Box>
                        <Typography color='textPrimary' align='left' style={{fontSize: '14px', marginTop: '10px', minHeight: '64px', marginBottom: '10px'}}>
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
                    <Box style={{width: 'max-content', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                      <Box style={{ display: 'flex', flexGrow: 1}}>
                        <Button onClick={()=>sendEmail()} variant="contained" startIcon={<MailOutlineIcon style={{fontSize: '25px'}} />} tabindex="0" type="button" style={{ minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', borderRadius: '4px', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                          Contactar
                          <span class="MuiTouchRipple-root"></span>
                        </Button>
                      </Box>
                      <IconButton color="inherit" aria-label="favorite" title="Agregar a favoritos">
                        {/*favoriteIcon ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />*/}
                        <FavoriteIconState />
                        {/*<FavoriteBorderOutlinedIcon onClick={()=>{
                          {favoriteIcon ? setFavoriteIcon(false) : setFavoriteIcon(true)}
                              if (props.favorites !== null) {
                                if (props.favorites.includes(props.student.student_id)) {
                                  props.setFavorites(props.favorites.filter(item => item !== props.student.student_id))
                                  
                                } else {
                                  props.setFavorites([...props.favorites, props.student.student_id])
                                }
                              } else {
                                props.setFavorites([props.student.student_id])
                              }
                            }}/>*/}
                      </IconButton>
                      <IconButton color="inherit" id="copyIcon" aria-label="share" title="Copiar enlace del perfil" onClick={() => {
                          navigator.clipboard.writeText(`${window.location.origin}/home/candidate/${props.student.student_id}`)
                        }}>
                        <ShareOutlinedIcon />
                      </IconButton>
                      <IconButton color="inherit" aria-label="view more" title="Ver más">
                        <UnfoldMoreOutlinedIcon onClick={()=>{
                          let url = `home/candidate/${props.student.student_id}`;
                          history.push(url);
                        }}/>
                      </IconButton>
                    </Box>
                  </Grid>
                </Box>
              </Container>
            </Box>
        </Card>
    </React.StrictMode>
  );
}

export { ItemStudent }