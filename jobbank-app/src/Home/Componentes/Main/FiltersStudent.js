import React, { useState } from 'react';
import mysvg from "../images/Magnifying_glass_icon.svg";
import {Modal, TextField} from '@material-ui/core';
import {makeStyles} from  '@material-ui/core/styles';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  modal:{
    position: 'absolute',
    width: 500,
    borderRadius: "40px",
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

  const abrirCerrarModal = () => {
    setModal(!modal);
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
            <button class="nav-link d-flex align-items-center" href="#">Habilidades</button>

          </li>
          <li class="nav-item mx-3 my-3">
            <button class="nav-link d-flex align-items-center" href="#">Nivel de inglés</button>
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