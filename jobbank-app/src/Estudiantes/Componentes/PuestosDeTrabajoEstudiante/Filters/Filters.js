import React from 'react';
import './Filters.css';

// Filters component
function Filters( {searchJob, setSearchJob, fetchComments, setItems, setCopia, copia, handleClean} ) {
  
  const handleChange = (e) => {
    setSearchJob({
      ...searchJob,
      [e.target.name]:e.target.value,
    });
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
          defaultValue={copia.tipoDeTrabajo}
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
              defaultChecked={"Tiempo completo" === copia.tipoDeTrabajo}
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
              defaultChecked={"Tiempo parcial" === copia.tipoDeTrabajo}
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
              defaultChecked={"Por horas" === copia.tipoDeTrabajo}
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
              defaultChecked={"todas" === copia.tipoDeTrabajo}
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
              defaultChecked={"Presencial" === copia.modalidad}
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
              defaultChecked={"Remoto" === copia.modalidad}
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
              defaultChecked={"Semi-presencial" === copia.modalidad}
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
              defaultChecked={"todas" === copia.modalidad}
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