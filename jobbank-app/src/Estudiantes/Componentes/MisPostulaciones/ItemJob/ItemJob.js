import React from 'react';
import './ItemJob.css';
import { Link } from 'react-router-dom';
import apiPath from '../../../../ApiPath';
import Card from "@mui/material/Card";
import Box from "@material-ui/core/Box";
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from '@mui/icons-material/Place';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Avatar from '@mui/material/Avatar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';

function ItemJob(props) {
  // Information on the jobs you applied for
  props.setCopia(props.paginaActual);
  const [PartnerData, setPartnerData] = React.useState([2]);

  React.useEffect(() => {
    obtenerParnertDatos()
  }, []);

  const obtenerParnertDatos = async () => {
    const data = await fetch(`${apiPath}/partners/${props.id_empresa}`);
    const parnert = await data.json();
    setPartnerData(parnert);
  }

  let tiempoTranscurrido = (stringDate) =>{
    let options = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    let firstDate = new Date(stringDate)
    let secondDate = new Date();
    if ((secondDate-firstDate)/(1000) < 60 ) {
      return "Hace unos segundos";
    } else if ((secondDate-firstDate)/(1000*60) < 60) {
        if (Math.round((secondDate-firstDate)/(1000*60)) === 1) {
          return `Hace ${Math.round((secondDate-firstDate)/(1000*60))} minuto`;
        } if (Math.round((secondDate-firstDate)/(1000*60)) === 60) {
            return `Hace 1 hora`;
        }
        return `Hace ${Math.round((secondDate-firstDate)/(1000*60))} minutos`;
    } else if ((secondDate-firstDate)/(1000*60*60) < 24) {
        if (Math.round((secondDate-firstDate)/(1000*60*60)) === 1) {
          return `Hace ${Math.round((secondDate-firstDate)/(1000*60*60))} hora`;
        } if (Math.round((secondDate-firstDate)/(1000*60*60)) === 24) {
            return `Ayer`;
        }
        return `Hace ${Math.round((secondDate-firstDate)/(1000*60*60))} horas`;
    } else if ((secondDate-firstDate)/(1000*60*60*24) < 8) {
        if (Math.round((secondDate-firstDate)/(1000*60*60*24)) === 1) {
          return `Ayer`
        } 
        return `Hace ${Math.round((secondDate-firstDate)/(1000*60*60*24))} días`;
    } else {
      return firstDate.toLocaleDateString("es-ES", options);
    }
  } 

  let ubicacionTrabajo = props.city + ", " + props.country;
  let fechaPublicacion = tiempoTranscurrido(props.created_at);
  let labelFechaPublicacion = 'Fecha de Publicación';
  if (props.created_at !== props.updated_at) {
    fechaPublicacion = tiempoTranscurrido(props.updated_at);
    labelFechaPublicacion = 'Fecha de Actualización';
  }

  function FolderListJobs() {
    return (
      <List sx={{ width: '100%', maxHeight: '250px' }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccessTimeIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={labelFechaPublicacion} secondary={fechaPublicacion} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PlaceIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Ubicación" secondary={ubicacionTrabajo} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ApartmentIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Modalidad" secondary={props.pres_or_remote} />
        </ListItem>
      </List>
    );
  }

  return (
    <React.StrictMode>
      <Card elevation={4} sx={{ width: '95%', maxHeight: '270px', minWidth: 900, maxWidth: 1170, my: '30px', display: 'flex', borderRadius: '160px', px: '50px', py: '10px'}}>
        <Link to={{ pathname:`/estudiante/puestos-de-trabajo/partners/${props.id_empresa}/jobs/${props.id_job}`, state: { EstadoDePostulacion: true, DatosEmpresa: PartnerData } }} style={{ color: 'inherit', textDecoration: 'inherit'}}> 
          <Stack sx={{  minWidth: 900, maxHeight: '270px', display: 'flex', flexDirection: 'row'}}>
            <Stack sx={{ width: '60%', px: '50px', py: '10px', display: 'flex', flexDirection: 'column'}}>
              <Typography sx={{color:"#251086", fontWeight: 'bold'}} variant="h5" component="h2">
                <Box sx={{ fontWeight: 'bold', m: 0.5 }}>{props.title}</Box>
              </Typography>
              <Typography variant="h6" component="h2">
                <Box sx={{ fontWeight: 'bold'}}>{PartnerData.name}</Box>
              </Typography>
              <Typography variant="body1" component="h2">
                <div id="quill-html-container-pos-student" dangerouslySetInnerHTML={{__html: props.description.slice(0, 200) + "..."}} />
              </Typography>
            </Stack>
            <Divider orientation="vertical" flexItem>
            </Divider>
            <Stack sx={{ width: '33%', display: 'flex', flexDirection: 'column' }}>
              <FolderListJobs/>
            </Stack>
            {!props.deleted
            ?
              <Stack sx={{ width: '7%', display: 'flex', flexDirection: 'column', justifyContent: "center" }}>
                <Tooltip title="Trabajo disponible">
                  <IconButton>
                    <CheckCircleIcon fontSize="large" color="primary"/>
                  </IconButton>
                </Tooltip>
              </Stack>
            :
              <Stack sx={{ width: '7%', display: 'flex', flexDirection: 'column', justifyContent: "center" }}>
                <Tooltip title="Trabajo eliminado">
                  <IconButton>
                    <DangerousIcon fontSize="large" color="error"/>
                  </IconButton>
                </Tooltip>
              </Stack>
            }
            
          </Stack>
        </Link>
      </Card>
    </React.StrictMode>
  );
}
/*
{
          props.deleted ? <b className="MPNoDisponible"> NO DISPONIBLE </b> : <b className="MPDisponible"> DISPONIBLE </b>
        }
*/

export { ItemJob }
