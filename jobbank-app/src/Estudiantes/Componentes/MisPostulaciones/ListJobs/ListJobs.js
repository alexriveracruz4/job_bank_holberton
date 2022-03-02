import React from 'react';
import './ListJobs.css';

function ListJobs(props) {
  // List
  return (
    <ul className='MPListJob'>
      {props.children} 
    </ul>
  );
}

export { ListJobs }