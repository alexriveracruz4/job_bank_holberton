import React from 'react';
import './ListJobs.css';

function ListJobs(props) {
  return (
    <section className='MPDTListJob'>
      <ul>
        {props.children} 
      </ul>
    </section>
  );
}

export { ListJobs }