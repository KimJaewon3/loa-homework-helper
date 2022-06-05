import React from 'react';
import styled from 'styled-components';
import './App.css';
import Characters from './components/characters';
import Monitoring from './components/monitoring';

const Wrap = styled.div`
  section {
    margin: 0 10vw 0 10vw;
    > * {
      margin: 5em;
    }
  }
  h1 {
    margin: 1em;
    color: white;
  }
`;

function App() {
  return (
    <Wrap>
      <h1>로아 숙제 현황판</h1>
      <section>
        <Monitoring />
        <Characters />
      </section>
    </Wrap>
  );
}

export default App;
