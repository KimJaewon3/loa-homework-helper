import React, { useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import "./App.css";
import AccountBook from "./components/AccountBook";
import Characters from "./components/Characters";
import ContentsStatus from "./components/ContentsStatus";
import FixedMenu from "./components/FixedMenu";
import Footer from "./components/Footer";
import HeaderMenu from "./components/HeaderMenu";
import Monitoring from "./components/Monitoring";
import { RootState, useAppSelector } from "./redux/store";
import { theme } from "./style/theme";

const Wrap = styled.div`
  background-color: ${({ theme }) => theme.color.backgroundColor};
  section {
    margin: 0 2em 0 2em;
    display: flex;
    flex-direction: column;
    > * {
      margin-top: 2em;
    }
    > :first-child {
      margin-top: 7em;
    }
  }
`;

function App() {
  const accountBookRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const monitoringRef = useRef<HTMLDivElement>(null);
  const contentsStatusRef = useRef<HTMLDivElement>(null);
  const themeType = useAppSelector(
    (state: RootState) => state.themeReducer.themeType
  );

  return (
    <ThemeProvider theme={theme[themeType]}>
      <Wrap>
        <HeaderMenu />
        <section>
          <Monitoring ref={monitoringRef} />
          <Characters ref={characterRef} />
          <ContentsStatus ref={contentsStatusRef} />
          <AccountBook ref={accountBookRef} />
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
