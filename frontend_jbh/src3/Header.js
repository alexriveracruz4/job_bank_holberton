import React from 'react';
import './Header.css';
import logo from './holberton_icon.png'

function Header() {
  return (
    <React.StrictMode>
      <div className="logo">
        <img src={logo} alt="Holberton School"/>
      </div>
      <div class="btn-group">
        <button>Puestos de trabajo</button>
        <button>Mis postulaciones </button>
      </div>
      <div class="account">
        <img src={logo} alt="Holberton School"/>
        <button>Jhonatan Jauja </button>
      </div>
    </React.StrictMode>
  );
}

export { Header }