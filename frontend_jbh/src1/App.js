import React from 'react';
import './App.css';
import { IconHolberton } from './IconHolberton';
import { UserStudent } from './UserStudent';
import { UserPartner } from './UserPartner';
import { UserAdmin } from './UserAdmin';

function App() {
  return (
    <div className='AppContainer'>
      <div className='Icon'>
        <IconHolberton />
      </div>
      <div className='Buttons'>
        <UserStudent />
        <UserPartner />
        <UserAdmin />
      </div>
    </div>
  );
}

export default App;
