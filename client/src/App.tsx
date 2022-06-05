import React from 'react';
import styled from 'styled-components';
import './App.css';
import Characters from './components/characters';
import Monitoring from './components/monitoring';

const Wrap = styled.div`
  margin: 0 10vw 0 10vw;
  > * {
    margin: 5em;
  }
`;

function App() {
  return (
    <Wrap>
      <Monitoring />
      <Characters />
    </Wrap>
  );
}

export default App;
