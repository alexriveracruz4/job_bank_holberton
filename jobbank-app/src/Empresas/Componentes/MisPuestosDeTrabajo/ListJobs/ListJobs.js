import React from 'react';
import './ListJobs.css';

function ListJobs(props) {
  return (
    <ul className='MPDTListJob'>
      {props.children} 
    </ul>
  );
}

export { ListJobs }