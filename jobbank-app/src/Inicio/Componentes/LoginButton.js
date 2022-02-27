import React from "react";
import "./loginbutton.css"
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BackButton } from "../../helpers/BackButton";


const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="InicioContainer">
      <div className="logoholbertonInicio">
        <a href="https://holberton-peru.com/">
          <img src="https://holberton-peru.com/storage/media/3rXHgQvQ8LqvY4ClnG2ncJgBrnufN3NRDDRvuCFB.png" alt="logo"/>
        </a>
      </div>
      <div className="backButtonInicio">
        <BackButton/>
      </div>
      <div className="LoginButonInicio">
        <Stack spacing={2} sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
          <Typography sx={{ fontWeight: 'bold', width: "100%", color: "white"}} variant="h2"  component="div">
            Job Bank Holberton
          </Typography>
          <Button sx={{ width: "80%" }} color="primary" variant="contained" onClick={() => loginWithRedirect()} startIcon={<LoginIcon />}>
            Iniciar sesión
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default LoginButton;