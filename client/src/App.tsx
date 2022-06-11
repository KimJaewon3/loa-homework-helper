import React, { useRef } from 'react';
import styled from 'styled-components';
import './App.css';
import AccountBook from './components/accountBook';
import Characters from './components/characters';
import FixedMenu from './components/fixedMenu';
import Footer from './components/footer';
import MemoBoard from './components/memoBoard';
import Menu from './components/menu';
import Monitoring from './components/monitoring';

const Wrap = styled.div`
  section {
    margin: 0 2em 0 2em;
    display: flex;
    flex-direction: column;
    > div {
      margin-top: 1em;
    }
  }
`;

function App() {
  const accountBookRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const monitoringRef = useRef<HTMLDivElement>(null);

  return (
    <Wrap>
      <Menu />
      <section>
        <Monitoring ref={monitoringRef}/>
        <Characters ref={characterRef}/>
        <AccountBook ref={accountBookRef}/>
      </section>
      <FixedMenu accountBookRef={accountBookRef} characterRef={characterRef} monitoringRef={monitoringRef}/>
      <Footer />
    </Wrap>
  );
}

export default App;
