import React from 'react';
import './App.css';
import { IconHolberton } from './IconHolberton';
import { Login } from './Login';


function App() {
  return (
    <div className='AppContainer'>
      <div className='Icon'>
        <IconHolberton />
      </div>
      <div className='BoxLogin'> 
        <Login />
      </div>
    </div>
  );
}

export default App;
