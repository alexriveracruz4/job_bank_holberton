import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DangerousIcon from '@mui/icons-material/Dangerous';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const StyledButtonReturn = styled(Button)`
  background-color: #1b0c61;
  color: #fff;
  padding: 6px 12px;
  &:hover {
    background-color: #3a20bc;
    color: #fff;
  }
`;

function NotFoundPageMain() {
	return (
    <Box sx={{ width: "100%", minHeight: "640px",display: "flex",flexDirection: "column",alignItems: "center"}}>
      <Box sx={{ width: "70%", display: "flex",flexDirection: "column",alignItems: "center", justifyContent: "start", m: 5}}>
        <DangerousIcon sx={{ fontSize: 200 , color: "#DF003C"}}/>
				<Typography sx={{ fontWeight: 'bold', color: "#1b0c61", my: "40px" }} variant="h4" textAlign="center">
          ERROR 404          
        </Typography>
        <Typography sx={{ fontWeight: 'bold', color: "#1b0c61" }} variant="h4" textAlign="center">
          Esta página no existe.           
        </Typography>
				<StyledButtonReturn href="/home" variant="contained" sx={{m: 10}}>
					Volver al inicio
				</StyledButtonReturn>
      </Box>
    </Box>
	);
}

export default NotFoundPageMain;
