import React, { useEffect, useState, useRef } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { height } from '@mui/system';

import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
  modalDescription:{
    position: 'absolute',
    width: 900,
    borderRadius: "10px",
    border: '2px solid #000',
    backgroundColor: ' #f7f9f9 ',
    padding: "40px",
    top:'50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }
}))


export default function NewModalDescription() {

  const styles = useStyles();

  
  const abrirCerrarDescriptionModal = () => {
    setDescriptionModal(!descriptionModal);
  }
  const [descriptionModal, setDescriptionModal] = useState(false)

  const descriptionBody=(
    <div className={styles.modalDescription}>
      <div className='description-title-modal' style={{marginBottom: '40px'}}>
        <h5>En esta sección podrás resaltar que es lo que te apasiona, contar sobre tu experiencia previa y finalmente invitar a los Hiring Partners a que te contacten. Si lo consideras necesario, también puedes agregar algo adicional que consideres importante resaltar sobre tu perfil. Por ejemplo:</h5>
      </div>
      <div className='description-body-modal' style={{margin: '30px 0px'}}>
        <p style={{fontSize: '1rem'}}>
          ¡Hola! Soy Erika, Full-Stack Developer, me apasiona la tecnología y particularmente el front-end, 
          ¡Puedo pasarme horas programando! Me destaco en mi capacidad de trabajar en equipo, aprender constantemente y compromiso.<br /><br />

          Estudié psicología, pero desde muy pequeña me gusta la programación, decidí cambiarme de carrera hace 2 años. 
          Desde entonces he trabajado como programadora front-end en varias empresas.<br /><br />

          Si deseas charlar conmigo acerca de cómo podría ayudar, colaborar y potenciar a tu empresa, no dudes en contactarme.
        </p>
      </div>
      <div className='description-button-modal' style={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>
        <Button variant="contained" onClick={() => setDescriptionModal(false)} style={{width: '70px', height: '35px', backgroundColor: '#1976d2', borderRadius: '4px', color: '#fff', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'}}>Ok</Button>
      </div>
    </div>
  )
  

  return (
    <div className='modal-description' style={{display: 'flex', alignItems: 'center', transform: "rotate(-180deg)", margin: '0px 5px'}}>
      <div className='information-icon' style={{color: '#1b0c61'}}>
      <Tooltip title="¿Qué información debe ir aquí?">
        <ErrorOutlineIcon type="button" onClick={()=> abrirCerrarDescriptionModal()} />
      </Tooltip>

        <Modal
          open={descriptionModal}
          onClose={abrirCerrarDescriptionModal}
        >
          {descriptionBody}
        </Modal>
      </div>
    </div>
  );
}