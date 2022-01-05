import React from 'react';
import './ListJobs.css';

// Props with ul
function ListJobs(props) {
  return (
    <ul className='PListJob'>
      {props.children} 
    </ul>
  );
}

export { ListJobs }