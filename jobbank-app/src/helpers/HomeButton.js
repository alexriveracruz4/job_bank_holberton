import React from 'react';
import { useHistory } from "react-router-dom";
import "./HomeButton.css"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export const HomeButton = () => {
    let history = useHistory();
    return (
        <Tooltip title={<h5 style={{ color: "white" }}>Home</h5>} placement="right" arrow>
          <IconButton>
            <ArrowBackIosNewIcon onClick={() => history.push("/home")} sx={{ fontSize: 50 , color: "white"}}/>
          </IconButton>
        </Tooltip>
    );
};