import React, { useEffect, useState } from 'react';
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
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';
import { useHistory } from "react-router-dom";
import Slider from '@mui/material/Slider';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import apiPath from '../../../ApiPath';
import { helpHttp } from '../../../helpers/helpHttp';
import Chip from '@mui/material/Chip';
import allSkillsArray from '../../../skills';

const useStyles = makeStyles(() => ({
  modal:{
    position: 'absolute',
    width: 400,
    borderRadius: "30px",
    backgroundColor: ' #f7f9f9 ',
    padding: "16px 32px 24px",
    top:'50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  modal2:{
    position: 'absolute',
    width: 350,
    borderRadius: "30px",
    backgroundColor: ' #f7f9f9 ',
    padding: "16px 32px 24px",
    top:'50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  modal3:{
    position: 'absolute',
    width: 1000,
    borderRadius: "30px",
    backgroundColor: ' #f7f9f9 ',
    padding: "16px 32px 24px",
    top:'50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }

}))

function FiltersStudent(props) {
  let history = useHistory();

  const styles = useStyles();

  const [modal, setModal] = useState(false)
  const [englishModal, setEnglishModal] = useState(false)
  const [skillsModal, setSkillsModal] = useState(false)

  const abrirCerrarEnglishModal = () => {
    setEnglishModal(!englishModal);
  }
  const abrirCerrarModal = () => {
    setModal(!modal);
  }
  const abrirCerrarSkillsModal = () => {
    setSkillsModal(!skillsModal);
  }
  const body=(
    <div className={styles.modal}>
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <TextField 
          fullWidth 
          label="Palabra clave" 
          id="fullWidth" 
          onChange={(e) => {
            props.setParameters({...props.parameters, PalabraClave: e.target.value});
          }}
          defaultValue={props.parameters.PalabraClave}
        />
      </Stack>
      <br/>
      <div align="right">
        <Stack direction="row-reverse" spacing={2} justifyContent="flex-start">
        <Button variant="outlined" color="primary"
          onClick={()=> {
            props.parameters.page = 1;
            let url = `/home?` + props.creadorURLs(props.parameters);  
            history.push(url);
            abrirCerrarModal();
            window.location.reload();
          }}
        >
          Confirmar
        </Button>
        <Button variant="outlined" color="error"
          onClick={()=> abrirCerrarModal()}
        >
          Cancelar
        </Button>
        </Stack>
      </div>
    </div>
  )

  const [value, setValue] = useState(() => {
    if (props.parameters.english === null) {
      return [0,6];
    } else {
      return props.parameters.english.split(',').map(Number)
    }
    
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const marks = [
    {
      value: 0,
      label: 'No',
    },
    {
      value: 1,
      label: 'A1',
    },
    {
      value: 2,
      label: 'A2',
    },
    {
      value: 3,
      label: 'B1',
    },
    {
      value: 4,
      label: 'B2',
    },
    {
      value: 5,
      label: 'C1',
    },
    {
      value: 6,
      label: 'C2',
    }
  ];

  function Formatter(num) {
    if (num === 0) {
      return "No tiene"; 
    } else if (num === 1) {
      return "Principiante";
    } else if (num === 2) {
      return "Elemental";
    } else if (num === 3) {
      return "Pre-Intermedio";
    } else if (num === 4) {
      return "Intermedio";
    } else if (num === 5) {
      return "Intermedio-Avanzado";
    } else if (num === 6) {
      return "Avanzado";
    }
  }

  const englishBody=(
    <div className={styles.modal2}>
      <div align="center">
        <h3>Nivel de Inglés</h3>
      </div>
      <br/>
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <Box sx={{ width: 300 }}>
        <Slider
          aria-label="Temperature"
          defaultValue={value}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          valueLabelFormat={Formatter}
          step={1}
          marks={marks}
          min={0}
          max={6}
        />
    </Box>
      </Stack>
      <br/>
      <div align="right">
        <Stack direction="row-reverse" spacing={2} justifyContent="flex-start">
        <Button variant="outlined" color="primary"
          onClick={()=> {
            props.parameters.page = 1;
            props.parameters.english = value.toString();
            if (props.parameters.english === "0,6") {
              props.parameters.english = "";
            }
            let url = `/home?` + props.creadorURLs(props.parameters);
            history.push(url);
            abrirCerrarEnglishModal();
            window.location.reload();
          }}
        >
          Confirmar
        </Button>
        <Button variant="outlined" color="error"
          onClick={()=> abrirCerrarEnglishModal()}
        >
          Cancelar
        </Button>
        </Stack>
      </div>
    </div>
  )

  const todasHabilidades = allSkillsArray;


  const [allSkills, setAllSkills] = useState([]);

  React.useEffect(() => {
    obtenerDatosDeSkills();
  }, []);

  const obtenerDatosDeSkills = async () => {
    const data = await fetch(`${apiPath}/skills`);
    setAllSkills(await data.json());
  }
  //
  //const [selectSkills, setSelectSkills] = useState([]);

  let api = helpHttp();

  //const [favorites, setFavorites] = useState([]);
/*
  useEffect(() => {
    setAllSkills(JSON.parse(window.sessionStorage.getItem("allSkills")));
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("allSkills", JSON.stringify(allSkills));
  }, [allSkills]);

  useEffect(() => { 

    const getComments = async () => {
      const url = `${apiPath}/skills`;
      api.get(url).then((res) => {
        if (!res.err) {
          setAllSkills(res);  
        } else {
          setAllSkills([]);
        }
      }).then(()=>{
        setSelectSkills(allSkills);
        console.log('a');
      })
    };
    getComments();
  }, []);
*/

  const handleRemoveItem = (data,setData, id) => {
    setData(data.filter(item => item.id !== id))
  }

  const initializationSelectSkills = () => {
    const newArray = [];
    if (props.parameters.skills === null) {
      return newArray;
    }
    const arrayOfSkills = props.parameters.skills.split(",");
    console.log("Array to skills");
    console.log(arrayOfSkills);
    console.log(allSkills);

    for (let i of arrayOfSkills) {
      for (let j of allSkills) {
        if (i === j.name) {
          newArray.push(j);
          console.log("Inicio");
          console.log(allSkills);
          break;
        }
      }
    }
    
    /*
    for (let j of newArray) {
      handleRemoveItem(allSkills, setAllSkills, j.id)
    }
    */
    return newArray;
  }

  const [selectSkills, setSelectSkills] = useState(()=>{
    const newArray = [];
    if (props.parameters.skills === null) {
      return newArray;
    }
    const arrayOfSkills = props.parameters.skills.split(",");
    console.log("Array to skills");
    console.log(arrayOfSkills);
    console.log(allSkills);

    for (let i of arrayOfSkills) {
      for (let j of allSkills) {
        if (i === j.name) {
          newArray.push(j);
          //handleRemoveItem(allSkills, setAllSkills, j.id);
          console.log("Inicio");
          console.log(allSkills);
          break;
        }
      }
    }

    /*
    for (let j of newArray) {
      handleRemoveItem(allSkills, setAllSkills, j.id)
    }
    */
    return newArray;
  });
  console.log("Array to skills");
  console.log(allSkills);
  console.log(selectSkills);

  const [searchValue, setSearchValue] = useState('')


  function RenderAllSkillsList(props) {
    const skills = props.allSkills;
    const HabilidadesSeleccionadas = props.selectSkills;
    //setAllSkills([...allSkills, {}]);
    const newArraySkills = skills.filter(item => !HabilidadesSeleccionadas.includes(item));
    let uniqueItems = [...new Set(newArraySkills)]
    console.log("AAAAAAAAAAAAAAAAAA");
    console.log(newArraySkills);

    const filterSkills = uniqueItems.filter(item => {
      if (item.name.toLowerCase().includes(searchValue)) {
        return true;
      }
    })

    const techSkills = filterSkills.filter((obj)=> obj.type === props.tipo || props.tipo === "all")
    return (
      <div>
        {techSkills.map((skill) => (
            <Chip
              key={skill.id}
              onClick={() => {
                setSelectSkills([...selectSkills, skill]);
                handleRemoveItem(allSkills,setAllSkills, skill.id);
              }}
              sx={{ m: 0.3 }}
              label={skill.name} />
        ))}
      </div>
    );
  }
  
  function RenderSelectedSkillsList(props) {
    const skills = props.selectSkills;
    return (
      <div>
        {skills.map((skill) => (
            <Chip 
              key={skill.id}
              onDelete={() => {
                handleRemoveItem(selectSkills, setSelectSkills, skill.id);
                setAllSkills([...allSkills, skill]);
                
              }} 
              sx={{ m: 0.3 }}
              label={skill.name}
            />
        ))}
      </div>
    );
  }
  

  console.log(allSkills)
  console.log("SLEECTES");
  console.log(selectSkills);

  const ObjToString = (Array) => {
    let array = [];
    for (let i of Array) {
      array.push(i.name)
    }
    return array.toString()
  }



  const skillsBody=(
    <div className={styles.modal3}>
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <TextField
          fullWidth
          label="Palabra clave"
          id="fullWidth"
          onChange={e => setSearchValue(e.target.value)} 
        />
      </Stack>
      <br/>
      {
        (selectSkills.length !== 0)
        ?
        <Box
        sx={{
          width: 900,
          height: 80,
          display: 'flex',
          flexWrap: 'nowrap',
        }}
        >
        <RenderSelectedSkillsList selectSkills={selectSkills} tipo={"tech"}/>
        </Box>
        :
        ""
      }
      <br/>
      <div align="center">
        <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2} justifyContent="space-around">
          <Stack direction="column"  spacing={2} >
            <Typography variant="h6" gutterBottom component="div">
              Habilidades técnicas
            </Typography>
            <Box
              sx={{
                width: 300,
                height: 300,
                display: 'flex',
                flexWrap: 'nowrap',
              }}
            >
              <RenderAllSkillsList allSkills={allSkills} selectSkills={selectSkills} tipo={"tech"}/>
            </Box>
          </Stack>
          <Stack direction="column"  spacing={2} >
            <Typography variant="h6" gutterBottom component="div">
              Habilidades blandas
            </Typography>
            <Box
              sx={{
                width: 300,
                height: 300,
                display: 'flex',
                flexWrap: 'nowrap',
              }}
            >
              <RenderAllSkillsList allSkills={allSkills} selectSkills={selectSkills} tipo={"soft"}/>
            </Box>
          </Stack>
          <Stack direction="column" spacing={2} >
            <Typography variant="h6" gutterBottom component="div">
              Otras habilidades
            </Typography>

            <Box
              sx={{
                width: 300,
                height: 300,
                display: 'flex',
                flexWrap: 'nowrap',
              }}
            >
              <RenderAllSkillsList allSkills={allSkills} selectSkills={selectSkills} tipo={"other"}/>
            </Box>
          </Stack>
        </Stack>
      </div>
      <br/>


      <div align="right">
        <Stack direction="row-reverse" spacing={2} justifyContent="flex-start" >
        <Button variant="outlined" color="primary"
          onClick={()=> {
            props.parameters.page = 1;
            props.parameters.skills = ObjToString(selectSkills);
            let url = `/home?` + props.creadorURLs(props.parameters);
            history.push(url);
            abrirCerrarSkillsModal();
            window.location.reload();
          }}
        >
          Confirmar
        </Button>
        <Button variant="outlined" color="error"
          onClick={()=> abrirCerrarSkillsModal()}
        >
          Cancelar
        </Button>
        </Stack>
      </div>
    </div>
  )

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
            <StyledButton variant="contained" sx={{ minWidth: "max-content", marginRight: "10px", textTransform: "capitalize", width: "70px"}} onClick={()=> abrirCerrarModal()} >
              <SearchIcon />
              <span class="MuiTouchRipple-root"></span>
            </StyledButton>
            <Modal
              open={modal}
              onClose={abrirCerrarModal}
            >
              {body}
            </Modal>
          </li>
          <li class="nav-item mx-3 my-3">
            <StyledButton variant="contained" sx={{ minWidth: "max-content", marginRight: "10px", textTransform: "capitalize"}} onClick={()=> abrirCerrarSkillsModal()}
              >
              Habilidades
              <span class="MuiTouchRipple-root"></span>
            </StyledButton>
            <Modal
              open={skillsModal}
              onClose={abrirCerrarSkillsModal}
            >
              {skillsBody}
            </Modal>
          </li>
          <li class="nav-item mx-3 my-3">
            <StyledButton variant="contained" sx={{ minWidth: "max-content", marginRight: "10px", textTransform: "capitalize"}} onClick={()=> abrirCerrarEnglishModal()}>
              Nivel de Inglés
              <span class="MuiTouchRipple-root"></span>
            </StyledButton>
            <Modal
                open={englishModal}
                onClose={abrirCerrarEnglishModal}
              >
                {englishBody}
              </Modal>
          </li>
          <li class="nav-item mx-3 my-3">
            <StyledButton variant="contained" sx={{ minWidth: "max-content", marginRight: "10px", textTransform: "capitalize"}} onClick={()=> {
                  let url = `/home/favoritos`
                  history.push({
                    pathname: url,
                    state: props.favorites,
                    });
                }}>
              <FavoriteBorderIcon />
              &nbsp;Favoritos
              <span class="MuiTouchRipple-root"></span>
            </StyledButton>
          </li>
          <li class="nav-item mx-3 my-3">
            <StyledButton variant="contained" sx={{ minWidth: "max-content", marginRight: "10px", textTransform: "capitalize"}} onClick={()=> {
                let url = `/home`
                history.push(url);
                window.location.reload();
              }}>
              Limpiar filtros
              <span class="MuiTouchRipple-root"></span>
            </StyledButton>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default FiltersStudent;