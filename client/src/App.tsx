import React, { useRef, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import './App.css';
import AccountBook from './components/accountBook';
import Characters from './components/characters';
import ContentsStatus from './components/contentsStatus';
import FixedMenu from './components/fixedMenu';
import Footer from './components/footer';
import Menu from './components/menu';
import Monitoring from './components/monitoring';
import { RootState, useAppSelector } from './redux/store';
import { theme } from './style/theme';

const Wrap = styled.div`
  background-color: ${({ theme }) => theme.color.backgroundColor };
  section {
    margin: 0 2em 0 2em;
    display: flex;
    flex-direction: column;
    > div {
      margin-top: 2em;
    }
    >:first-child {
      margin-top: 7em;
    }
  }
`;

function App() {
  const accountBookRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const monitoringRef = useRef<HTMLDivElement>(null);
  const contentsStatusRef = useRef<HTMLDivElement>(null);
  const themeType = useAppSelector((state: RootState) => state.themeReducer.themeType);

  return (
    <ThemeProvider theme={theme[themeType]}>
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
    </ThemeProvider>
  );
}

export default App;
