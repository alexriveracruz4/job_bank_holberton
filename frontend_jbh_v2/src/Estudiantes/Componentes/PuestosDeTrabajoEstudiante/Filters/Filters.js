import React from 'react';
import './Filters.css';

function Filters( {searchJob, setSearchJob, fetchComments, setItems, setCopia, copia} ) {
  // Filters component
  
  const handleChange = (e) => {
    console.log("HANDLECHANGE")
    console.log(searchJob)
    console.log(copia)
    setSearchJob({
      ...searchJob,
      [e.target.name]:e.target.value,
    });
  }
  
  


  const handleFilters = async () => {
    console.log(searchJob)
    console.log(copia)
    setCopia({...searchJob})
    console.log("COPIA")
    console.log(copia)
    console.log(searchJob)
    const commentsFormServer = await fetchComments(0);
    //const commentsFormServer = ListSearchedJobs.slice(currentPage*limit, limit*(currentPage + 1));
    console.log("PRUEBA")
    console.log(commentsFormServer)
    setItems(commentsFormServer);
  };

  const handleClean = async () => {
    window.location.reload(false);
  };
  
  const handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      handleFilters();
    }
  }

  return (
    <div className='FilterContainer'>
      <div className="TitleContainer">
        <h2> FILTROS </h2>  
      </div>
      <div className="KeyWord">
        <h3> Palabras clave </h3>
        <input 
          type='text'
          placeholder='Ej:Full Stack'
          name="PalabraClave"
          value={searchJob.PalabraClave}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="TypeJob">
        <h3> Tipo de trabajo </h3>
        <div className="OptionsJob">
          <div>
            <input 
              type='radio'
              id='tiempo_completo'
              name='tipoDeTrabajo'
              value="Tiempo completo"
              onChange={handleChange}
            />
            <label htmlFor="tiempo_completo">Tiempo completo</label>
          </div>
          <div>
            <input 
              type='radio'
              id='medio_tiempo'
              name='tipoDeTrabajo'
              value="Tiempo parcial"
              onChange={handleChange} 
            />
            <label htmlFor="medio_tiempo">Tiempo parcial</label>
          </div>
          <div>
            <input 
              type='radio'
              id='por_horas'
              name='tipoDeTrabajo'
              value="Por horas"
              onChange={handleChange}
            />
            <label htmlFor="por_horas">Por horas</label>
          </div>
          <div>
            <input 
              type='radio'
              id='todas'
              name='tipoDeTrabajo'
              value="todas"
              onChange={handleChange} 
              defaultChecked
            />
            <label htmlFor="todas">Todas</label>
          </div>
        </div>
      </div>
      <div className="TypeRegion">
        <h3> Modalidad de trabajo </h3>
        <div className="OptionsRegion">
          <div>
            <input 
              type='radio'
              id='presencial'
              name='modalidad'
              value="Presencial"
              onChange={handleChange} 
            />
            <label htmlFor="presencial">Presencial</label>
          </div>
          <div>
            <input 
              type='radio'
              id='remoto'
              name='modalidad'
              value="Remoto"
              onChange={handleChange} 
            />
            <label htmlFor="remoto">Remoto</label>
          </div>
          <div>
            <input 
              type='radio'
              id='semi-presencial'
              name='modalidad'
              value="Semi-presencial"
              onChange={handleChange} 
            />
            <label htmlFor="semi-presencial">Semi-presencial</label>
          </div>
          <div>
            <input 
              type='radio'
              id='all'
              name='modalidad'
              value="todas"
              onChange={handleChange}
              defaultChecked

            />
            <label htmlFor="all">Todas</label>
          </div>
        </div>
      </div>

      <div className="ConfirmationButtons">
        <button 
          onClick={handleFilters}> 
          Filtrar 
        </button>
        <button
          onClick={handleClean}> 
          Limpiar filtros
        </button>
      </div>

    </div>

  );
}

export { Filters }