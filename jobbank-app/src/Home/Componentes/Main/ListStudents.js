import React from 'react';

// List
function ListStudents(props) {
  return (
    <section className='list-students-section'>
      <ul>
        {props.children} 
      </ul>
    </section>
  );
}

export { ListStudents }