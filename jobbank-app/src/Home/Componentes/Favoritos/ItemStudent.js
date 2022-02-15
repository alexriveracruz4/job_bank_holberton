import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion'
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Box from "@material-ui/core/Box";
import Card from "@mui/material/Card";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import SvgIcon from '@mui/material/SvgIcon';
import mysvg from "../images/Magnifying_glass_icon.svg";
import LinesEllipsis from "react-lines-ellipsis";
import apiPath from '../../../ApiPath';
import student_avatar from "./student_avatar.png"

function ItemStudent(props) {

  const history = useHistory();

  let photo = student_avatar;

  if (props.student.photo_filename_logical != null && props.student.photo_filename_logical != undefined){
    photo = `${apiPath}/student_photos/${props.student.photo_filename_logical}`;
  }

  return (
    <React.StrictMode>     
          <Card elevation={4} sx={{ width: '100%', height: 320, maxWidth: 1170, my: '15px', display: 'flex', borderRadius: '8px' }}>
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
                  <Grid style={{width: '40%'}}>
                    <Box
                      sx={{
                        display: 'flex',
                      }}
                    >
                      <a rel="noopener" title="" href="" style={{display: 'block', textDecoration: 'none', color: 'inherit', width: '80px', cursor: 'pointer', height: '80px', maxWidth: '80px', minWidth: '80px', maxHeight: '80px', minHeight: '80px',
marginRight: '25px'}}>
                        <img src={ photo } alt="Profile" style={{display: 'block', width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}} />
                      </a>
                      <Box
                      >
                        <a class="MuiTypography-root MuiTypography-h6 MuiTypography-alignLeft" style={{color: 'inherit', display: 'block', textDecoration: 'none', cursor: 'pointer', lineHeight: '1.7rem', marginBottom: '0.3rem', textAlign: 'left', fontSize: '1.25rem', fontWeight: '500'}} rel="noopener" href=""> {props.student.firstname} {props.student.lastname}</a>
                        <a class="MuiTypography-root jss86 jss127 jss125 MuiTypography-body2 MuiTypography-alignLeft" rel="noopener" href="" style={{color: 'inherit', display: 'block', textDecoration: 'none', textAlign: 'left', fontSize: '1rem', fontWeight: '400', lineHeight: '1.43', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: '1', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book'}}>FULL STACK</a>
                        <a rel="noopener" href="" style={{color: 'inherit', margin: '4px 0px 4px -4px', display: 'flex', textDecoration: 'none'}}>
                          <svg class="MuiSvgIcon-root" style={{fill: 'currentColor', width: '1em', height: '1em', display: 'inline-block', fontSize: '1.25rem', transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', flexShrink: '0', userSelect: 'none', marginRight: '5px', color: 'inherit', textDecoration: 'none'}} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"></path>
                            <circle cx="12" cy="9" r="2.5"></circle>
                          </svg>
                          <p class="MuiTypography-root MuiTypography-body1" style={{height: '23px', display: '-webkit-box', overflow: 'hidden', fontSize: '14px', marginTop: '1px', textAlign: 'left', WebkitBoxOrient: 'vertical', WebkitLineClamp: '1', fontWeight: '400', lineHeight: '1.5', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book'}}>Buenos Aires - Argentina</p>
                        </a>
                      </Box>
                    </Box>
                    <Box sx={{display: 'flex', marginTop: '40px'}}>
                      <div class="LinesEllipsis LinesEllipsis--clamped " id="Ellipsis"><div>
                          <p id="skill" class="button-skill-gray">JavaScript
                          </p>
                          <p id="skill" class="button-skill-gray">HTML
                          </p>
                          <p id="skill" class="button-skill-gray">CSS
                          </p>
                          <p id="skill" class="button-skill-gray">React.js
                          </p>
                          <p id="skill" class="button-skill-gray">Redux
                          </p>
                          <p id="skill" class="button-skill">Sass</p>
                          <p id="skill" class="button-skill">Styled-Components</p>
                          <p id="skill" class="button-skill">Analytical</p>
                          <p id="skill" class="button-skill">
                            <span class="LinesEllipsis-unit">M</span>
                          </p>
                          <span>
                            <p class="LinesEllipsis-ellipsis"><a>...</a></p>
                          </span>
                        </div>
                      </div>
                    </Box>
                  </Grid>
                  <Grid style={{width: '60%'}}>
                    <Box style={{width: 'max-content', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                      <Box style={{ display: 'flex', flexGrow: 1}}>
                        <Button class="MuiButtonBase-root MuiButton-root MuiButton-contained" tabindex="0" type="button" style={{ minWidth: 'max-content', marginRight: '10px', textTransform: 'capitalize', backgroundColor: '#FF003C', color: '#FFF', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)', padding: '6px 16px', fontSize: '0.875rem', boxSizing: 'border-box', fontWeight: '500', transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', lineHeight: '1.75', borderRadius: '4px', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                          <span class="MuiButton-label" style={{ textTransform: 'none', width: '100%', display: 'inherit', alignItems: 'inherit', justifyContent: 'center', fontSize: '0.875rem', fontFamily: 'Roboto,Avenir Medium,Avenir Heavy,Avenir Black,Avenir Light,Avenir Roman,Avenir Book', fontWeight: '500', lineHeight: '1.75' }}>
                            <span class="MuiButton-startIcon MuiButton-iconSizeMedium" style={{ display: 'inherit', marginLeft: '-4px', marginRight: '8px', textTransform: 'none' }}>
                            <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" style={{ fontSize: '20px', fill: 'currentcolor', width: '1em', height: '1em', display: 'inline-block', transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', flexShrink: '0', userSelect: 'none' }}>
                              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"></path>
                            </svg>
                          </span>Contactar</span>
                          <span class="MuiTouchRipple-root"></span></Button>
                      </Box>
                      <Button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit" tabindex="0" id="favorite" style={{ marginRight: '-7px', color: 'inherit', flex: '0 0 auto', padding: '12px', overflow: 'visible', fontSize: '1.5rem', textAlign: 'center', transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', borderRadius: '50%', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', backgroundColor: 'transparent', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                        <span class="MuiIconButton-label" style={{ width: '100%', display: 'flex', alignItems: 'inherit', justifyContent: 'inherit', color: 'inherit', fontSize: '1.5rem', textAlign: 'center', userSelect: 'none', WebkitTapHighlightColor: 'transparent'}}>
                          <svg 
                            onClick={()=>{
                              //const nuevo = favorites['id'].push(props.student.id)
                              //console.log(nuevo)
                              //setFavorites({...favorites, id: props.student.id})
                              console.log("chau")
                              console.log(props.favorites)
                              if (props.favorites !== null) {
                                if (props.favorites.includes(props.student.student_id)) {
                                  props.setFavorites(props.favorites.filter(item => item !== props.student.student_id))
                                  
                                } else {
                                  props.setFavorites([...props.favorites, props.student.student_id])
                                }
                              } else {
                                props.setFavorites([props.student.student_id])
                              }
                            }}
                            class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" style={{ fill: 'currentcolor', width: '1em', height: '1em', display: 'inline-block', fontSize: '1.5rem', transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', flexShrink: '0', userSelect: 'none', color: 'inherit', textAlign: 'center', WebkitTapHighlightColor: 'transparent' }}>
                            <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" style={{ boxSizing: 'inherit', fill: 'currentcolor', width: '1em', height: '1em', display: 'inline-block', fontSize: '1.5rem', transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', flexShrink: '0', userSelect: 'none'}}></path>
                          </svg>
                        </span>
                        <span class="MuiTouchRipple-root" style={{top: '0', left: '0', right: '0', bottom: '0', zIndex: '0', overflow: 'hidden', position: 'absolute', borderRadius: 'inherit', pointerEvents: 'none', fontSize: '1.5rem', textAlign: 'center', userSelect: 'none', WebkitTapHighlightColor: 'transparent'}}></span>
                      </Button>
                      <Button class="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit" tabindex="0" type="button" id="shared" style={{ marginRight: '-7px', color: 'inherit', flex: '0 0 auto', padding: '12px', overflow: 'visible', fontSize: '1.5rem', textAlign: 'center', transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', borderRadius: '50%', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', backgroundColor: 'transparent', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                          <span class="MuiIconButton-label" style={{ width: '100%', display: 'flex', alignItems: 'inherit', justifyContent: 'inherit', color: 'inherit', fontSize: '1.5rem', textAlign: 'center', userSelect: 'none', WebkitTapHighlightColor: 'transparent' }}>
                            <svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" style={{ fill: 'currentcolor', width: '1em', height: '1em', display: 'inline-block', fontSize: '1.5rem', transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', flexShrink: '0', userSelect: 'none', color: 'inherit', textAlign: 'center', WebkitTapHighlightColor: 'transparent' }}>
                              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" style={{ boxSizing: 'inherit', fill: 'currentcolor', width: '1em', height: '1em', display: 'inline-block', fontSize: '1.5rem', transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', flexShrink: '0', userSelect: 'none'}}></path>
                            </svg>
                          </span>
                          <span class="MuiTouchRipple-root" style={{top: '0', left: '0', right: '0', bottom: '0', zIndex: '0', overflow: 'hidden', position: 'absolute', borderRadius: 'inherit', pointerEvents: 'none', fontSize: '1.5rem', textAlign: 'center', userSelect: 'none', WebkitTapHighlightColor: 'transparent'}}></span>
                      </Button>
                      <button
                        onClick={()=>{
                          let url = `candidate/${props.student.student_id}`;
                          history.push(url);
                        }}
                        class="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit" tabindex="0" role="button" aria-disabled="false" id="expand" title="Ver más" style={{ marginRight: '-7px', color: 'inherit', flex: '0 0 auto', padding: '12px', overflow: 'visible', fontSize: '1.5rem', textAlign: 'center', transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', borderRadius: '50%', border: '0', margin: '0', display: 'inline-flex', outline: '0', alignItems: 'center', userSelect: 'none', verticalAlign: 'middle', justifyContent: 'center', textDecoration: 'none', backgroundColor: 'transparent', WebkitAppearance: 'none', WebkitTapHighlightColor: 'transparent'}}>
                        <span class="MuiIconButton-label" style={{ width: '100%', display: 'flex', alignItems: 'inherit', justifyContent: 'inherit', color: 'inherit', fontSize: '1.5rem', textAlign: 'center', userSelect: 'none', WebkitTapHighlightColor: 'transparent' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000" class="MuiSvgIcon-root material-icons" focusable="false" aria-hidden="true" id="targetExpand" style={{ fill: 'currentcolor', width: '1em', height: '1em', display: 'inline-block', fontSize: '1.4rem', transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms', flexShrink: '0', userSelect: 'none', color: 'inherit', textAlign: 'center', WebkitTapHighlightColor: 'transparent' }}>
                            <path d="M0 0h24v24H0V0z" fill="none"></path>
                            <path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"></path>
                          </svg>
                        </span>
                        <span class="MuiTouchRipple-root" style={{top: '0', left: '0', right: '0', bottom: '0', zIndex: '0', overflow: 'hidden', position: 'absolute', borderRadius: 'inherit', pointerEvents: 'none', fontSize: '1.5rem', textAlign: 'center', userSelect: 'none', WebkitTapHighlightColor: 'transparent'}}></span>
                      </button>
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