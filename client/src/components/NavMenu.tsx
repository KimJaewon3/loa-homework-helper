import React, { useState } from "react";
import styled from "styled-components";
import MemoBoard from "../modals/memoBoard";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import LootCalculator from "../modals/lootCalculator";
import { display, size } from "../style/display";
import { SectionItemRef } from "../hooks/useNavMenu";
import { ACCOUNT, CHARACTERS, CONTENTS, MONITORING } from "../App";

type Props = {
  sectionItemsRef: React.MutableRefObject<SectionItemRef>;
};

const NavMenu = ({ sectionItemsRef }: Props) => {
  const [isMemoBoardOpen, setIsMemoBoardOpen] = useState(false);
  const [isLootCalculatorOpen, setIsLootCalculatorOpen] = useState(false);

  const gotoUp = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const gotoDown = () => {
    window.scroll({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const gotoTargetRef = (key: string) => {
    const pos = sectionItemsRef.current?.[key].offsetTop;
    if (typeof pos === "number") {
      window.scroll({
        top: pos - 70,
        behavior: "smooth",
      });
    }
  };

  return (
    <NavMenuContainer>
      {isMemoBoardOpen && <MemoBoard setIsMemoBoardOpen={setIsMemoBoardOpen} />}
      {isLootCalculatorOpen && (
        <LootCalculator setIsLootCalculatorOpen={setIsLootCalculatorOpen} />
      )}
      <aside className="nav-menu-btn-box">
        <NavMenuList onClick={() => gotoTargetRef(MONITORING)}>
          전체 현황
        </NavMenuList>
        <NavMenuList onClick={() => gotoTargetRef(CHARACTERS)}>
          캐릭터 현황
        </NavMenuList>
        <NavMenuList onClick={() => gotoTargetRef(CONTENTS)}>
          컨텐츠 현황
        </NavMenuList>
        <NavMenuList onClick={() => gotoTargetRef(ACCOUNT)}>
          골드 현황
        </NavMenuList>
        <NavMenuList
          onClick={() => setIsLootCalculatorOpen(!isLootCalculatorOpen)}
        >
          입찰 계산기
        </NavMenuList>
        <NavMenuList onClick={() => setIsMemoBoardOpen(!isMemoBoardOpen)}>
          메모장
        </NavMenuList>
      </aside>

      <aside className="nav-menu-goto-btn-box">
        <div className="svg-wrap" onClick={gotoUp}>
          <AiOutlineArrowUp />
        </div>
        <div className="svg-wrap" onClick={gotoDown}>
          <AiOutlineArrowDown />
        </div>
      </aside>
    </NavMenuContainer>
  );
};

const NavMenuContainer = styled.nav`
  position: fixed;
  top: 36%;
  right: 0%;
  .nav-menu-goto-btn-box {
    position: fixed;
    right: 0;
    bottom: 10vh;
    display: flex;
    flex-direction: column;
    > * {
      background-color: #ffe38f;
      border: 2px solid black;
      border-radius: 5px;
      margin-bottom: 5px;
      padding: 0.5em;
    }
  }
  @media ${display.mobile} {
    .nav-menu-btn-box {
      display: flex;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100vw;
    }
  }
`;

const NavMenuList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3px;
  background-color: ${({ theme }) => theme.color.titleColor};
  color: ${({ theme }) => theme.color.fontColor};
  border: 2px solid black;
  border-radius: 5px;
  margin-top: 5px;
  @media ${display.mobile} {
    padding: 10px;
    word-break: keep-all;
  }
`;

export default NavMenu;
