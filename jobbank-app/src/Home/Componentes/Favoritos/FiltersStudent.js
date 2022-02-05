import React, { useState } from 'react';
import mysvg from "../images/Magnifying_glass_icon.svg";
import {Modal, TextField} from '@material-ui/core';
import {makeStyles} from  '@material-ui/core/styles';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";

function FiltersStudent(props) {
  let history = useHistory();

  return (
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarMainHolberton">
        <ul class="nav nav-filter">
          <li class="nav-item mx-3 my-3">
            <i class="fas fa-heart"></i>
            <button 
              onClick={()=> {
                  let url = `/home`
                  history.push(url);
                }}
              class="nav-link" href="#" id="fav-filter">Favoritos
            </button>
            <button 
              onClick={()=> {
                  props.setFavorites([]);
                  //let url = `/home`
                  //history.push(url);
                }}
              class="nav-link" href="#" id="fav-filter">Remover Favoritos
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default FiltersStudent;