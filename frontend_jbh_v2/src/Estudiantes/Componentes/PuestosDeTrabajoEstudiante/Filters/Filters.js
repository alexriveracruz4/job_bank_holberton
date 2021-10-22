import React from 'react';
import './Filters.css';

function Filters( {searchJob, setSearchJob, checkTypeJob, setcheckTypeJob} ) {
  const onSearchValueChange = (event) => {
    console.log(event.target.value);
    setSearchJob(event.target.value);
  };

  const onCheckKindOfJob = (event) => {
    console.log(event.target.checked);
    setcheckTypeJob(event.target.checked)
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
            <input 
              type='radio'
              id='tiempo-completo'
              name='tipo-de-trabajo'
              value = {checkTypeJob}
              onChange={onCheckKindOfJob} 
            />
            <label htmlFor="tiempo-completo">Tiempo completo</label>
          </div>
          <div>
            <input 
              type='radio'
              id='medio-tiempo'
              name='tipo-de-trabajo'
              value = {checkTypeJob}
              onChange={onCheckKindOfJob} 
            />
            <label htmlFor="medio-tiempo">Medio tiempo</label>
          </div>
          <div>
            <input 
              type='radio'
              id='ambos'
              name='tipo-de-trabajo'
              value = {checkTypeJob}
              onChange={onCheckKindOfJob} 
            />
            <label htmlFor="ambos">Ambos</label>
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
              value = {checkTypeJob}
              onChange={onCheckKindOfJob} 
            />
            <label htmlFor="presencial">Presencial</label>
          </div>
          <div>
            <input 
              type='radio'
              id='remoto'
              name='modalidad'
              value = {checkTypeJob}
              onChange={onCheckKindOfJob} 
            />
            <label htmlFor="remoto">Remoto</label>
          </div>
          <div>
            <input 
              type='radio'
              id='semi-presencial'
              name='modalidad'
              value = {checkTypeJob}
              onChange={onCheckKindOfJob} 
            />
            <label htmlFor="semi-presencial">Semi-presencial</label>
          </div>
          <div>
            <input 
              type='radio'
              id='todas'
              name='modalidad'
              value = {checkTypeJob}
              onChange={onCheckKindOfJob} 
            />
            <label htmlFor="todas">Todas</label>
          </div>
        </div>
      </div>

    </div>
  );
}

export { Filters }