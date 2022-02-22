import React from 'react';
import { useHistory } from "react-router-dom";
import "./BackButton.css"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export const BackButton = () => {
    let history = useHistory();
    return (
        <Tooltip title={<h5 style={{ color: "white" }}>Atrás</h5>} placement="right" arrow>
          <IconButton>
            <ArrowBackIosNewIcon onClick={() => history.goBack()} sx={{ fontSize: 50 , color: "white"}}/>
          </IconButton>
        </Tooltip>
    );
};