import React from 'react';
import './ItemJob.css';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
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


const cookies = new Cookies();

function ItemJob(props) {
  const studentId= cookies.get("student_id"); //string variable

  // Obtains the data of the applicants for a job and saves them in PostulantesData
  const [PostulantesData, setPostulantesData] = React.useState([2]);
  const [PartnerData, setPartnerData] = React.useState([2]);


  React.useEffect(() => {
    obtenerPostulantesDatos();
    obtenerParnertDatos()
  }, []);

  const obtenerPostulantesDatos = async () => {
    const data = await fetch(`${apiPath}/jobs/${props.id_empresa}/${props.id_job}/students`);
    const postulantes = await data.json();
    setPostulantesData(postulantes.data);
  }

  const obtenerParnertDatos = async () => {
    const data = await fetch(`${apiPath}/partners/${props.id_empresa}`);
    const parnert = await data.json();
    setPartnerData(parnert);
  }


  // Jobs to be displayed upon login
  let PostulantesIDs = PostulantesData.map(postulante => postulante.student_id);
  let EstadoDePostulacion= PostulantesIDs.includes(parseInt(studentId),0); /*true== postulado; false== no postulado*/


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
      <Card elevation={4} sx={{ width: '100%', maxHeight: '270px', minWidth: 900, my: '30px', display: 'flex', borderRadius: '160px', px: '50px', py: '10px'}}>
        <Link to={{ pathname:`/estudiante/puestos-de-trabajo/partners/${props.id_empresa}/jobs/${props.id_job}`, state: { EstadoDePostulacion: EstadoDePostulacion, DatosEmpresa: PartnerData } }} style={{ color: 'inherit', textDecoration: 'inherit'}}> 
          <Stack sx={{  minWidth: 900, maxHeight: '270px', display: 'flex', flexDirection: 'row'}}>
            <Stack sx={{ width: '60%', px: '50px', py: '10px', display: 'flex', flexDirection: 'column'}}>
              <Typography sx={{color:"#251086", fontWeight: 'bold'}} variant="h5" component="h2">
                <Box sx={{ fontWeight: 'bold', m: 0.5 }}>{props.title}</Box>
              </Typography>
              <Typography variant="h6" component="h2">
                <Box sx={{ fontWeight: 'bold'}}>{PartnerData.name}</Box>
              </Typography>
              <Typography variant="body1" component="h2">
              {props.description.slice(0, 200) + "..."}
              </Typography>
            </Stack>
            <Divider orientation="vertical" flexItem>
            </Divider>
            <Stack sx={{ width: '33%', display: 'flex', flexDirection: 'column' }}>
              <FolderListJobs/>
            </Stack>
            {EstadoDePostulacion === true
            ?
              <Stack sx={{ width: '7%', display: 'flex', flexDirection: 'column', justifyContent: "center" }}>
                <Tooltip title="Trabajo postulado">
                  <IconButton>
                    <CheckIcon fontSize="large" color="success"/>
                  </IconButton>
                </Tooltip>
              </Stack>
            :
              ""
            }
            
          </Stack>
        </Link>
      </Card>
    </React.StrictMode>
  );
}

export { ItemJob }
