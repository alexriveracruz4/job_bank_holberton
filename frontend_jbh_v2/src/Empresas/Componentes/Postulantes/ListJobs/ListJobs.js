import React from 'react';
import './ListJobs.css';

function ListJobs(props) {
  return (
    <ul className='PListJob'>
      {props.children} 
    </ul>
  );
}

export { ListJobs }