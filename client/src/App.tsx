import React from "react";
import styled, { ThemeProvider } from "styled-components";
import "./App.css";
import { useAppSelector } from "./redux/store";
import { display } from "./style/display";
import { useNavMenu } from "./hooks/useNavMenu";

import HeaderMenu from "./components/HeaderMenu";
import MonitoringStatus from "./components/MonitoringStatus";
import CharacterStatus from "./components/CharacterStatus";
import ContentsStatus from "./components/ContentsStatus";
import AccountStatus from "./components/AccoutStatus";
import Footer from "./components/Footer";
import NavMenu from "./components/NavMenu";

export const MONITORING = "monitoring";
export const CHARACTERS = "characters";
export const CONTENTS = "contents";
export const ACCOUNT = "account";

const App = () => {
  const theme = useAppSelector((state) => state.themeReducer.themeInfo);
  const { refCallback, gotoTargetRef } = useNavMenu();

  return (
    <ThemeProvider theme={theme}>
      <Wrap>
        <HeaderMenu />
        <section>
          <MonitoringStatus ref={(el) => refCallback(el, MONITORING)} />
          <CharacterStatus ref={(el) => refCallback(el, CHARACTERS)} />
          <ContentsStatus ref={(el) => refCallback(el, CONTENTS)} />
          <AccountStatus ref={(el) => refCallback(el, ACCOUNT)} />
        </section>
        <NavMenu gotoTargetRef={gotoTargetRef} />
        <Footer />
      </Wrap>
    </ThemeProvider>
  );
};

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
  @media ${display.mobile} {
    width: fit-content;
    min-height: 100vh;
    min-width: 100vw;
    padding-bottom: 10vh;
    section {
      > * {
        margin-top: 7em;
      }
    }
  }
`;

export default App;
