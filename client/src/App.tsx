import React, { useRef } from 'react';
import styled from 'styled-components';
import './App.css';
import AccountBook from './components/accountBook';
import Characters from './components/characters';
import ContentsStatus from './components/contentsStatus';
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
  const contentsStatusRef = useRef<HTMLDivElement>(null); 

  return (
    <Wrap>
      <Menu />
      <section>
        <Monitoring ref={monitoringRef}/>
        <Characters ref={characterRef}/>
        <ContentsStatus ref={contentsStatusRef}/>
        <AccountBook ref={accountBookRef}/>
      </section>
      <FixedMenu 
        accountBookRef={accountBookRef}
        characterRef={characterRef}
        monitoringRef={monitoringRef}
        contentsStatusRef={contentsStatusRef}
      />
      <Footer />
    </Wrap>
  );
}

export default App;
