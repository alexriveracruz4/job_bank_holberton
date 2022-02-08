import React, { useState } from 'react';
import mysvg from "../images/Magnifying_glass_icon.svg";
import {Modal, TextField} from '@material-ui/core';
import {makeStyles} from  '@material-ui/core/styles';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles(() => ({
  modal:{
    position: 'absolute',
    width: 400,
    borderRadius: "30px",
    backgroundColor: ' #f7f9f9 ',
    padding: "16px 32px 24px",
    top:'50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  modal2:{
    position: 'absolute',
    width: 350,
    borderRadius: "30px",
    backgroundColor: ' #f7f9f9 ',
    padding: "16px 32px 24px",
    top:'50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
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

function FiltersStudent(props) {
  let history = useHistory();

  const styles = useStyles();

  const [modal, setModal] = useState(false)
  const [englishModal, setEnglishModal] = useState(false)
  const [skillsModal, setSkillsModal] = useState(false)

  const abrirCerrarEnglishModal = () => {
    setEnglishModal(!englishModal);
  }
  const abrirCerrarModal = () => {
    setModal(!modal);
  }
  const abrirCerrarSkillsModal = () => {
    setSkillsModal(!skillsModal);
  }
  const body=(
    <div className={styles.modal}>
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <TextField 
          fullWidth 
          label="Palabra clave" 
          id="fullWidth" 
          onChange={(e) => {
            props.setParameters({...props.parameters, PalabraClave: e.target.value});
          }}
          defaultValue={props.parameters.PalabraClave}
        />
      </Stack>
      <br/>
      <div align="right">
        <Stack direction="row-reverse" spacing={2} justifyContent="flex-start">
        <Button variant="outlined" color="primary"
          onClick={()=> {
            props.parameters.page = 1;
            let url = `/home?` + props.creadorURLs(props.parameters);  
            history.push(url);
            abrirCerrarModal();
            window.location.reload();
          }}
        >
          Confirmar
        </Button>
        <Button variant="outlined" color="error"
          onClick={()=> abrirCerrarModal()}
        >
          Cancelar
        </Button>
        </Stack>
      </div>
    </div>
  )

  const [value, setValue] = React.useState(() => {
    if (props.parameters.english === null) {
      return [0,6];
    } else {
      return props.parameters.english.split(',').map(Number)
    }
    
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const marks = [
    {
      value: 0,
      label: 'No',
    },
    {
      value: 1,
      label: 'A1',
    },
    {
      value: 2,
      label: 'A2',
    },
    {
      value: 3,
      label: 'B1',
    },
    {
      value: 4,
      label: 'B2',
    },
    {
      value: 5,
      label: 'C1',
    },
    {
      value: 6,
      label: 'C2',
    }
  ];

  function Formatter(num) {
    if (num === 0) {
      return "No tiene"; 
    } else if (num === 1) {
      return "Principiante";
    } else if (num === 2) {
      return "Elemental";
    } else if (num === 3) {
      return "Pre-Intermedio";
    } else if (num === 4) {
      return "Intermedio";
    } else if (num === 5) {
      return "Intermedio-Avanzado";
    } else if (num === 6) {
      return "Avanzado";
    }
  }

  const englishBody=(
    <div className={styles.modal2}>
      <div align="center">
        <h3>Nivel de Inglés</h3>
      </div>
      <br/>
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <Box sx={{ width: 300 }}>
        <Slider
          aria-label="Temperature"
          defaultValue={value}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          valueLabelFormat={Formatter}
          step={1}
          marks={marks}
          min={0}
          max={6}
        />
    </Box>
      </Stack>
      <br/>
      <div align="right">
        <Stack direction="row-reverse" spacing={2} justifyContent="flex-start">
        <Button variant="outlined" color="primary"
          onClick={()=> {
            props.parameters.page = 1;
            props.parameters.english = value.toString();
            if (props.parameters.english === "0,6") {
              props.parameters.english = "";
            }
            let url = `/home?` + props.creadorURLs(props.parameters);
            history.push(url);
            abrirCerrarEnglishModal();
            window.location.reload();
          }}
        >
          Confirmar
        </Button>
        <Button variant="outlined" color="error"
          onClick={()=> abrirCerrarEnglishModal()}
        >
          Cancelar
        </Button>
        </Stack>
      </div>
    </div>
  )

  const skillsBody=(
    <div className={styles.modal3}>
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <TextField 
          fullWidth 
          label="Palabra clave" 
          id="fullWidth" 
          onChange={(e) => {
            props.setParameters({...props.parameters, PalabraClave: e.target.value});
          }}
          defaultValue={props.parameters.PalabraClave}
        />
      </Stack>


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
                backgroundColor: 'primary.dark',
                
              }}
            />
          </Stack>
          <Stack direction="column"  spacing={2} >
            <Typography variant="h6" gutterBottom component="div">
              Habilidades blandas
            </Typography>
            <Box
              sx={{
                width: 300,
                height: 300,
                backgroundColor: 'primary.dark',
                
              }}
            />
          </Stack>
          <Stack direction="column" spacing={2} >
            <Typography variant="h6" gutterBottom component="div">
              Otras habilidades
            </Typography>

            <Box
              sx={{
                width: 300,
                height: 300,
                backgroundColor: 'primary.dark',
                
              }}
            />
          </Stack>
        </Stack>
      </div>
      <br/>


      <div align="right">
        <Stack direction="row-reverse" spacing={2} justifyContent="flex-start" >
        <Button variant="outlined" color="primary"
          onClick={()=> {
            props.parameters.page = 1;
            let url = `/home?` + props.creadorURLs(props.parameters);  
            history.push(url);
            abrirCerrarSkillsModal();
            window.location.reload();
          }}
        >
          Confirmar
        </Button>
        <Button variant="outlined" color="error"
          onClick={()=> abrirCerrarSkillsModal()}
        >
          Cancelar
        </Button>
        </Stack>
      </div>
    </div>
  )




  console.log("NIVEL DE INGLES");
  console.log(value);
  return (
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarMainHolberton">
        <ul class="nav nav-filter">
          <li class="nav-item d-flex align-items-center">
            <button onClick={()=> abrirCerrarModal()} href="https://apply.holbertonschool.com/auth/sign_in?country=pe" className="nav-link d-flex align-items-center mx-3 my-3" target="_blank" id="button-search">
              <img src={mysvg} className="nav-link" href="#"/>
            </button>
            <Modal
              open={modal}
              onClose={abrirCerrarModal}
            >
              {body}
            </Modal>
          </li>
          <li class="nav-item mx-3 my-3">
            <button
              onClick={()=> abrirCerrarSkillsModal()}
              class="nav-link d-flex align-items-center" href="#">
              Habilidades
            </button>
            <Modal
              open={skillsModal}
              onClose={abrirCerrarSkillsModal}
            >
              {skillsBody}
            </Modal>
          </li>
          <li class="nav-item mx-3 my-3">
            <button 
              onClick={()=> abrirCerrarEnglishModal()} 
              class="nav-link d-flex align-items-center" href="#">
              Nivel de inglés
            </button>
              <Modal
                open={englishModal}
                onClose={abrirCerrarEnglishModal}
              >
                {englishBody}
              </Modal>
          </li>
          <li class="nav-item mx-3 my-3">
            <i class="far fa-heart"></i>
            <button 
              onClick={()=> {
                  let url = `/home/favoritos`
                  history.push({
                    pathname: url,
                    state: props.favorites,
                    });
                }}
              class="nav-link" href="#" id="fav-filter">Favoritos
            </button>
          </li>
          <li class="nav-item mx-3 my-3">
            <button 
              onClick={()=> {
                let url = `/home`
                history.push(url);
                window.location.reload();
              }}
              class="nav-link d-flex align-items-center" href="#">Limpiar filtros
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default FiltersStudent;