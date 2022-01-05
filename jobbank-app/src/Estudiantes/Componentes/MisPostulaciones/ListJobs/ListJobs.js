import React from 'react';
import './ListJobs.css';

function ListJobs(props) {
  // List
  return (
    <section className='MPListJob'>
      <ul>
        {props.children} 
      </ul>
    </section>
  );
}

export { ListJobs }