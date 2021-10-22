import React from 'react';
import './Filters.css';

function Filters( {searchJob, setSearchJob} ) {
  const onSearchValueChange = (event) => {
    console.log(event.target.value);
    setSearchJob(event.target.value);
  };
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
          value = {searchJob}
          onChange={onSearchValueChange} 
        />
        <button>Filtrar</button>
      </div>
      <div className="TypeJob">
        <h3> Tipo de trabajo </h3>
        <div className="OptionsJob">
          <div>
            <input type='checkbox'/>
            <label>Presencial</label>
          </div>
          <div>
            <input type='checkbox'/>
            <label>Remoto</label>
          </div>
        </div>
      </div>
      <div className="TypeRegion">
        <h3> Region </h3>
        <div className="OptionsRegion">
          <div>
            <input type='checkbox'/>
            <label>Extranjero</label>
          </div>
          <div>
            <input type='checkbox'/>
            <label>Lima</label>
          </div>
          <div>
            <input type='checkbox'/>
            <label>Arequipa</label>
          </div>
          <div>
            <input type='checkbox'/>
            <label>Callao</label>
          </div>
        </div>
      </div>

    </div>
  );
}

export { Filters }