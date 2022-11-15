import React, { useState } from "react";
import styled from "styled-components";
import MemoBoard from "../modals/memoBoard";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import LootCalculator from "../modals/lootCalculator";

type FixedMenuProps = {
  accountBookRef: React.RefObject<HTMLDivElement>;
  characterRef: React.RefObject<HTMLDivElement>;
  monitoringRef: React.RefObject<HTMLDivElement>;
  contentsStatusRef: React.RefObject<HTMLDivElement>;
};

const NavMenu = ({
  accountBookRef,
  characterRef,
  monitoringRef,
  contentsStatusRef,
}: FixedMenuProps) => {
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

  const gotoTargetRef = (targetRef: React.RefObject<HTMLDivElement>) => {
    const pos = targetRef.current?.offsetTop;
    if (typeof pos === "number") {
      window.scroll({
        top: pos - 70,
        behavior: "smooth",
      });
    }
  };

  return (
    <NavMenuContainer>
      {isMemoBoardOpen && <MemoBoard />}
      {isLootCalculatorOpen && (
        <LootCalculator
          handleLootCalculatorBtnClick={() =>
            setIsLootCalculatorOpen(!isLootCalculatorOpen)
          }
        />
      )}
      <aside>
        <NavMenuList onClick={() => gotoTargetRef(monitoringRef)}>
          전체현황
        </NavMenuList>
        <NavMenuList onClick={() => gotoTargetRef(characterRef)}>
          캐릭터현황
        </NavMenuList>
        <NavMenuList onClick={() => gotoTargetRef(contentsStatusRef)}>
          컨텐츠현황
        </NavMenuList>
        <NavMenuList onClick={() => gotoTargetRef(accountBookRef)}>
          골드현황
        </NavMenuList>
        <NavMenuList
          onClick={() => setIsLootCalculatorOpen(!isLootCalculatorOpen)}
        >
          입찰계산기
        </NavMenuList>
        <NavMenuList onClick={() => setIsMemoBoardOpen(!isMemoBoardOpen)}>
          메모장
        </NavMenuList>
      </aside>
      <aside>
        <div className="fixed-menu-goto-btn goto-up" onClick={gotoUp}>
          <AiOutlineArrowUp />
        </div>
        <div className="fixed-menu-goto-btn goto-down" onClick={gotoDown}>
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
  .fixed-menu-goto-btn {
    position: fixed;
    background-color: #ffe38f;
    right: 0;
    margin: 2em;
    padding: 0.5em;
    height: 20px;
    width: 20px;
    text-align: center;
    border: 2px solid black;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .goto-up {
    bottom: 14%;
  }
  .goto-down {
    bottom: 10%;
  }
`;

const NavMenuList = styled.div`
  padding: 3px;
  background-color: ${({ theme }) => theme.color.titleColor};
  color: ${({ theme }) => theme.color.fontColor};
  border: 2px solid black;
  border-radius: 5px;
  margin-top: 5px;
`;

export default NavMenu;
