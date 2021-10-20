import React from 'react';
import './IconHolberton.css';
import logo from './holberton_icon.png'

function IconHolberton() {
  return (
    <div className="IconHolberton">
      <img src={logo} alt="Holberton School"/>
    </div>
  );
}

export { IconHolberton }