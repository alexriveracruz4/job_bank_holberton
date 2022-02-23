import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
//import Tab from '@material-ui/core/Tab'; //no funciona
import Tab from '@mui/material/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Cookies from 'universal-cookie';
import partnerlogo from "./partnerlogo.png";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from '@mui/icons-material/Place';
import ApartmentIcon from '@mui/icons-material/Apartment';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HandymanIcon from '@mui/icons-material/Handyman';
import FlightIcon from '@mui/icons-material/Flight';

import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';

import Loader from '../../../../helpers/Loader';
import Message from '../../../../helpers/Message';
import { helpHttp } from "../../../../helpers/helpHttp";
import apiPath from "../../../../ApiPath";
import { useHistory } from 'react-router-dom'; 
import swal from 'sweetalert';


const cookies = new Cookies();
function JobDescriptionAdminView(props) {

  console.log(props.datos)
  const datos = props.datos[0];
  const [partner, setPartner] = useState([]);

  let history = useHistory();

  let api = helpHttp();

  useEffect(() => {
      obtenerDatosDePartners();
  }, []);
  
  let partner_id = props.PartnerId;
  
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  /*
  const obtenerDatosDePartners = async () => {
      const data = await fetch(`${apiPath}/partners/${partner_id}`);
      const applications = await data.json();
      setPartner(applications);
  }
  */

  const obtenerDatosDePartners = async () => {
    const url = `${apiPath}/partners/${partner_id}`;
    setLoading(true);
    api.get(url).then((res) => {
      if (!res.err) {
        setPartner(res);
        setError(null)
      } else {
        setPartner([]);
        setError(res);
      }
      setLoading(false);
    })
  };

  let photo = partnerlogo;
  if (partner.logo_filename_logical != null && partner.logo_filename_logical != undefined){
  photo = `${apiPath}/partner_photos/${partner.logo_filename_logical}`;
  }

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let ubicacionTrabajo = datos.city + ", " + datos.country;

  let ubicacionEmpresa = partner.region + ", " + partner.nation;
  if (partner.region === '') {
    ubicacionEmpresa = partner.nation;
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

  const fechaPublicacion = tiempoTranscurrido(datos.created_at);

  function FolderListTrabajo() {
    return (
      <List sx={{ width: '100%', maxWidth: 360 }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccessTimeIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Fecha de Publicación" secondary={fechaPublicacion} />
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
          <ListItemText primary="Modalidad" secondary={datos.pres_or_remote} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WatchLaterIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Tipo de empleo" secondary={datos.job_type} />
        </ListItem>
        {
          (datos.salary !== '') && 
          <>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AttachMoneyIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Salario" secondary={datos.salary}/>
            </ListItem>
          </>
        }
        {
          (datos.experience !== '') && 
          <>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <HandymanIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Experiencia mínima" secondary={datos.experience}/>
            </ListItem>
          </>
        }
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FlightIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Disponibilidad de viajar" secondary={datos.travel_availability}/>
        </ListItem>
      </List>
    );
  }

  function FolderListEmpresa() {
    return (
      <List sx={{ width: '100%', maxWidth: 360 }}>

        {
          (partner.phonenumber !== '') && 
          <>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PhoneIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Teléfono" secondary={partner.phonenumber} />
            </ListItem>
          </>
        }
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PlaceIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Ubicación" secondary={ubicacionEmpresa} />
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <EmailIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="E-mail" secondary={partner.email}/>
        </ListItem>
        {
          (partner.web !== '') && 
          <>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LanguageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Página Web" secondary={partner.web}/>
            </ListItem>
          </>
        }

      </List>
    );
  }

  const [loadingEliminate, setLoadingEliminate] = useState(false);

  // Sweetalert to confirm removal of job
  const deleteData = (PartnerId, JobId, TitleJob) => {
    swal({
      title: "ELIMINAR TRABAJO",
      text: `¿Está seguro de eliminar los datos del trabajo "${TitleJob}"?`,
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        setLoadingEliminate(true)
        let endpoint = `${apiPath}/partners/${PartnerId}/jobs/${JobId}`;
        let options = {
          headers: { "content-type": "application/json" },
        };
        api.del(endpoint, options).then((res) => {
          if (!res.err) {
            setLoadingEliminate(false);
            swal(`El trabajo ${TitleJob} ha sido eliminado`, {
              timer:"1500"
            });
            setTimeout(() => {
              history.go(0);
            }, 1000);
          } else {
            setLoadingEliminate(false);
            swal({
              title: "ERROR",
              text: `No se pudo elimiar el trabajo'`,
              icon: "error",
            });
          }
        });
      } 
    });
  }

  const restoreData = (data) => {
    swal({
      title: "RESTAURAR TRABAJO",
      text: `¿Está seguro de restaurar los datos del trabajo "${data.title}""?`,
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {   
        data.deleted = 0;
        setLoadingEliminate(true);
        let endpoint = `${apiPath}/partners/${data.partner_id}/jobs/${data.id}`;
        let options = {
          body: data,
          headers: { "content-type": "application/json" },
        };
        api.put(endpoint, options).then((res) => {
          if (!res.err) {
            setLoadingEliminate(false);
            swal(`El trabajo ${data.title} ha sido restaurado.`, {
              timer:"1500"
            });
            setTimeout(() => {
              history.go(0);
            }, 1000);
          } else {
            setLoadingEliminate(false);
            swal({
              title: "ERROR",
              text: `No se pudo restaurar el trabajo ${data.title}`,
              icon: "error",
            });
          }
        });
      }
    });
  }


  return (
    
    <Stack 
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      position="relative"
      top="80px"
      spacing={1}
      sx={{
        m:"10px",
      }}
    >
      {(error) && <Message/>}
      {loading 
      ?
      <div>
        <Loader/>
      </div>
      :
      <>
        <Card elevation={4} sx={{ width: '70%', maxWidth: 1000, my: '15px', borderRadius: '20px', padding: '5px', m:"10px" }}>
          <Stack direction="row" justifyContent="flex-start" spacing={3} sx={{ p:"10px", alignSelf: "center"}}>
            <Avatar
                alt="Remy Sharp"
                src={ photo }
                sx={{ width: 80, height: 80, alignSelf: "center"}}
            />
            <Stack direction="column" justifyContent="center">
              <Typography variant="h7" component="h2">
                {datos.title}
              </Typography>
              <Typography variant="h5" component="h2">
                {partner.name}
              </Typography>
            </Stack>
          </Stack>
        </Card>
        <Box sx={{ width: '70%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Detalles del trabajo" value="1" style={{padding: "0px 20px"}}/>
                <Tab label="Detalles de la empresa" value="2" style={{padding: "0px 20px"}}/>
              </TabList>
            </Box>
            <TabPanel value="1">
              <Stack direction="row" spacing={3}>
                <Card elevation={4} sx={{ minHeight: "400px", borderRadius: "20px", width: '65%', whiteSpace: 'pre-line', typography: 'body1',p: 2 }}>
                  <Typography sx={{ background: "white"}} variant="body1" component="h2">
                    {datos.description}
                  </Typography>
                </Card>
                <Box sx={{ minHeight: "400px", width: '35%', typography: 'body1', p: [2,2,2,0]}}>
                  <Stack  sx={{position: "sticky", top:50}} direction="column" spacing={3}>
                    <Card elevation={4} sx={{minHeight: "350px", width: '90%', borderRadius: "20px"}}>
                      <FolderListTrabajo/>
                    </Card>
                    <Card elevation={4} sx={{minHeight: "50px", borderRadius: "20px", width: '90%'}}>
                      {
                        datos.deleted === 0
                        ?
                          <Button 
                            onClick={()=>deleteData(partner.partner_id, datos.id, datos.title)}
                            variant="contained" 
                            color="error" 
                            sx={{
                              width: "100%", 
                              height: "50px",
                              backgroundColor: "#e31c3f",
                              '&:hover': {
                                backgroundColor: '#fd002c',
                              }
                            }}
                          >
                            Eliminar
                          </Button>
                        :
                          <Button 
                            onClick={()=>restoreData(datos)}
                            variant="contained"  
                            sx={{
                              width: "100%", 
                              height: "50px", 
                              backgroundColor: "#251086",
                              '&:hover': {
                                backgroundColor: '#2c0fae',
                              }
                            }}
                          >
                            Restaurar trabajo
                          </Button>
                      }
                    </Card>
                  </Stack>
                </Box>
              </Stack>

            </TabPanel>
            <TabPanel value="2">
              <Stack direction="row" spacing={3}>
                <Card elevation={4} sx={{ minHeight: "100px", borderRadius: "20px", width: '65%', whiteSpace: 'pre-line', typography: 'body1', p: 2 }}>
                  <Typography sx={{ background: "white"}} variant="body1" component="h2">
                    {partner.description}
                  </Typography>
                </Card>
                <Box sx={{ minHeight: "100px", width: '35%', borderRadius: "20px", typography: 'body1', p: [2,2,2,0]}}>
                  <Stack  sx={{position: "sticky", top:50}} direction="column" spacing={3}>
                    <Card elevation={4} sx={{minHeight: "100px", borderRadius: "20px", width: '90%', background: "white"}}>
                      <FolderListEmpresa/>
                    </Card>
                  </Stack>
                </Box>
              </Stack>
            </TabPanel>
          </TabContext>
        </Box>
      </>
      }
    </Stack>
  );
}


export { JobDescriptionAdminView };