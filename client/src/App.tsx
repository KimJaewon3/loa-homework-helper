import React from 'react';
import styled from 'styled-components';
import './App.css';
import Characters from './components/characters';
import Menu from './components/menu';
import Monitoring from './components/monitoring';

const Wrap = styled.div`
  section {
    margin: 0 10vw 0 10vw;
    > * {
      margin: 5em;
    }
  }
`;

function App() {
  return (
    <Wrap>
      <Menu />
      <section>
        <Monitoring />
        <Characters />
      </section>
    </Wrap>
  );
}

export default App;
