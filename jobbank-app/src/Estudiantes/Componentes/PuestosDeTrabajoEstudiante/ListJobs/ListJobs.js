import React from 'react';
//import './ListJobs.css';

// List
function ListJobs(props) {
  return (
      <ul>
        {props.children} 
      </ul>
  );
}

export { ListJobs }