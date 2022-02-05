import React from 'react';

// List
function ListStudents(props) {
  return (
    <section>
      <ul>
        {props.children} 
      </ul>
    </section>
  );
}

export { ListStudents }