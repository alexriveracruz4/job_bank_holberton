import React, { useState } from 'react';
import mysvg from "../images/Magnifying_glass_icon.svg";
import {Modal, TextField} from '@material-ui/core';
import {makeStyles} from  '@material-ui/core/styles';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import { styled, createTheme, ThemeProvider } from '@mui/system';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";

function FiltersStudent(props) {
  let history = useHistory();

  const StyledButton = styled(Button)`
  background-color: #DF003C;
  color: #fff;
  padding: 6px 12px;
  &:hover {
    background-color: #1B0C61;
  }
  `;

  return (
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarMainHolberton">
        <ul class="nav nav-filter">
          <li class="nav-item mx-3 my-3">
            <StyledButton variant="contained" sx={{ minWidth: "max-content", marginRight: "10px", textTransform: "capitalize"}} onClick={()=> {
                  let url = `/home`
                  history.push(url);
                }}>
              <FavoriteIcon />
              &nbsp;Favoritos
              <span class="MuiTouchRipple-root"></span>
            </StyledButton>
          </li>
          <li class="nav-item mx-3 my-3">
            <StyledButton variant="contained" sx={{ minWidth: "max-content", marginRight: "10px", textTransform: "capitalize"}} onClick={()=> {
                  props.setFavorites([]);
                  //let url = `/home`
                  //history.push(url);
                }}>
              Remover favoritos
              <span class="MuiTouchRipple-root"></span>
            </StyledButton>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default FiltersStudent;