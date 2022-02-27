import React, { useEffect, useState } from 'react';
import './Filters.css';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';

import Card from "@mui/material/Card";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(0),
  },
  group: {
    margin: theme.spacing(1, 0),
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}



// Filters component
function Filters( {searchJob, setSearchJob, fetchComments, setItems, setCopia, copia, handleClean} ) {
  const classes = useStyles();

  const handleChange = (e) => {
    console.log(e.target.value)
    if (e.target.value === searchJob.modalidad || e.target.value === searchJob.tipoDeTrabajo || e.target.value === searchJob.fecha) {
      setSearchJob({
        ...searchJob,
        [e.target.name]:"",
      });
    } else {
      setSearchJob({
        ...searchJob,
        [e.target.name]:e.target.value,
      });
    }
  }

  const handleFilters = async () => {
    setCopia({...searchJob})
    fetchComments(0);
  };

  const handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      handleFilters();
    }
  }

  const handleDeletePalabraClave = () => {
    setCopia({...searchJob, PalabraClave: ""})
    setSearchJob({...searchJob, PalabraClave: ""})
    fetchComments(0);
  }
  const handleDeletemodalidad = () => {
    setCopia({...searchJob, modalidad: ""})
    setSearchJob({...searchJob, modalidad: ""})
    fetchComments(0);
  }
  const handleDeletetipoDeTrabajo = () => {
    setCopia({...searchJob, tipoDeTrabajo: ""})
    setSearchJob({...searchJob, tipoDeTrabajo: ""})
    fetchComments(0);
  }
  const handleDeletefecha = () => {
    setCopia({...searchJob, fecha: ""})
    setSearchJob({...searchJob, fecha: ""})
    fetchComments(0);
  }

  const [value, setValue] = React.useState(0);

  const handleChangeTable = (event, newValue) => {
    setValue(newValue);
  };


  return (

    <Stack
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
        sx={{ position: "sticky", top:50}}
      >
      <Box 
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ borderRadius: "10px",  my: "5px",  width: "98%",  mb:"10px", mt:"10px", mr:"10px", ml:"10px", borderRadius: "20px"}} 
      >
        {
          copia.PalabraClave === "" ? 
            ""
          :
            <Chip label={copia.PalabraClave} style={{backgroundColor: "rgba(0, 0, 0, 0.08)", borderRadius: "16px"}} onDelete={handleDeletePalabraClave} />
        }
        {
          copia.modalidad === "" ? 
            ""
          :
          <Chip label={copia.modalidad} style={{backgroundColor: "rgba(0, 0, 0, 0.08)", borderRadius: "16px"}} onDelete={handleDeletemodalidad} />
        }
        {
          copia.tipoDeTrabajo === "" ? 
            ""
          :
            <Chip label={copia.tipoDeTrabajo} style={{backgroundColor: "rgba(0, 0, 0, 0.08)", borderRadius: "16px"}} onDelete={handleDeletetipoDeTrabajo} />
        }
        {
          copia.fecha === "" ? 
            ""
          :
            <Chip label={copia.fecha} style={{backgroundColor: "rgba(0, 0, 0, 0.08)", borderRadius: "16px"}} onDelete={handleDeletefecha} />
        }
      </Box>

      <Card elevation={4} 
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
        sx={{width: "98%", height: "550px", mb:"10px", mt:"70px", mr:"10px", ml:"10px", borderRadius: "20px"}}

      >
        <Box sx={{ '& > :not(style)': { mt: 1 }, display: "flex", justifyContent: "center", mt: "5px", borderRadius: "30px"}}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField
              name="PalabraClave"
              defaultValue={copia.PalabraClave}
              value={searchJob.PalabraClave}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              id="input-with-sx" 
              label="Buscar"
              variant="standard" 
            />
          </Box>
        </Box>

        <Box
        sx={{ flexGrow: 1, display: 'flex', flexDirection: "row", height: 420,  borderRadius: "20px"}}
        >
          <Stack sx={{height: 420, width: "35%", display: 'flex', justifyContent: "center" }}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChangeTable}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: 'divider'}}
            >
              <Tab label="Fecha de publicación" {...a11yProps(0)} />
              <Tab label="Modalidad" {...a11yProps(1)} />
              <Tab label="Tipo de trabajo" {...a11yProps(2)} />
            </Tabs>
          </Stack>
          <Stack sx={{height: 420, width: "70%", display: 'flex', justifyContent: "center" }}>
            <TabPanel value={value} index={2}>

              <FormControl component="fieldset" className={classes.formControl}>

                <RadioGroup
                  aria-label="gender"
                  name="tipoDeTrabajo"
                  className={classes.group}
                  value={searchJob.tipoDeTrabajo}
                >
                  <FormControlLabel 
                    value="Tiempo completo"
                    control={<Radio onClick={handleChange} />}
                    label="Tiempo completo"
                  />
                  <FormControlLabel
                    value="Tiempo parcial"
                    control={<Radio onClick={handleChange} />}
                    label="Tiempo parcial"
                  />
                  <FormControlLabel
                    value="Por horas"
                    control={<Radio onClick={handleChange} />}
                    label="Por horas"
                  />
                  <FormControlLabel
                    value="Por proyecto"
                    control={<Radio onClick={handleChange} />}
                    label="Por proyecto"
                  />
                </RadioGroup>

              </FormControl>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <FormControl component="fieldset" className={classes.formControl}>
                <RadioGroup
                  aria-label="gender"
                  name="modalidad"
                  className={classes.group}
                  value={searchJob.modalidad}
                >
                  <FormControlLabel
                    value="Presencial"
                    control={<Radio onClick={handleChange} />}
                    label="Presencial"
                  />
                  <FormControlLabel
                    value="Remoto"
                    control={<Radio onClick={handleChange} />}
                    label="Remoto"
                  />
                  <FormControlLabel
                    value="Semi-presencial"
                    control={<Radio onClick={handleChange} />}
                    label="Semi-presencial"
                  />
                </RadioGroup>
              </FormControl>
            </TabPanel>
            <TabPanel value={value} index={0}>
              <FormControl component="fieldset" className={classes.formControl}>
                <RadioGroup
                  aria-label="gender"
                  name="fecha"
                  className={classes.group}
                  value={searchJob.fecha}
                >
                  <FormControlLabel
                    value="Hoy"
                    control={<Radio onClick={handleChange} />}
                    label="Hoy"
                  />
                  <FormControlLabel
                    value="Ayer"
                    control={<Radio onClick={handleChange} />}
                    label="Ayer"
                  />
                  <FormControlLabel
                    value="Menor a 3 dias"
                    control={<Radio onClick={handleChange} />}
                    label="Menor a 3 dias"
                  />
                  <FormControlLabel
                    value="Menor a 4 dias"
                    control={<Radio onClick={handleChange} />}
                    label="Menor a 4 dias"
                  />
                  <FormControlLabel
                    value="Menor a 5 dias"
                    control={<Radio onClick={handleChange} />}
                    label="Menor a 5 dias"
                  />
                  <FormControlLabel
                    value="Menor a 1 semana"
                    control={<Radio onClick={handleChange} />}
                    label="Menor a 1 semana"
                  />
                  <FormControlLabel
                    value="Menor a 2 semanas"
                    control={<Radio onClick={handleChange} />}
                    label="Menor a 2 semanas"
                  />
                  <FormControlLabel
                    value="Menor a 1 mes"
                    control={<Radio onClick={handleChange} />}
                    label="Menor a 1 mes"
                  />
                  <FormControlLabel
                    value="Menor a 2 meses"
                    control={<Radio onClick={handleChange} />}
                    label="Menor a 2 meses"
                  />
                </RadioGroup>
              </FormControl>
            </TabPanel>
          </Stack>
        </Box>
        <Box sx={{width: "100%", display: 'flex', justifyContent: "space-around", borderRadius: "20px",}}>
          <Button onClick={handleFilters} variant="contained" style={{padding: "6px 16px", backgroundColor: "#1b0c61", borderRadius: "4px", color: "#fff"}} startIcon={<FilterAltIcon />}>
            Filtrar
          </Button>
          <Tooltip onClick={handleClean} title="Limpiar filtros">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Card>
      </Stack>
    </Stack>
  );
}
export { Filters }