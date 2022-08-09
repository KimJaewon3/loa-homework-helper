import React from 'react';
import './App.css';
import Characters from './components/characters';
import Monitoring from './components/monitoring';
import Status from './components/status';

function App() {
  return (
    <div>
      <Monitoring />
      <Characters />
    </div>
  );
}

export default App;
