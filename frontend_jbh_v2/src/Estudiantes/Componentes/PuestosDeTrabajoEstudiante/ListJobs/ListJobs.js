import React from 'react';
import './ListJobs.css';

function ListJobs(props) {
  return (
    <section className='PDTEListJob'>
      <ul>
        {props.children} 
      </ul>
    </section>
  );
}

export { ListJobs }