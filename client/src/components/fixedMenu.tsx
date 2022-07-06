import React, { useState } from 'react';
import styled from 'styled-components';
import MemoBoard from '../modals/memoBoard';
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import LootCalculator from '../modals/lootCalculator';

const FixedMenuDiv = styled.nav`
  position: fixed;
  top: 35%;
  right: 0%;
  li {
    list-style: none;
  }
  .fixed-menu {
    padding: 3px;
    background-color: white;
    border: 2px solid black;
  }
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
    bottom: 15%;
  }
  .goto-down {
    bottom: 10%;
  }
`;

type FixedMenuProps = {
  accountBookRef: React.RefObject<HTMLDivElement>;
  characterRef: React.RefObject<HTMLDivElement>;
  monitoringRef: React.RefObject<HTMLDivElement>;
  contentsStatusRef: React.RefObject<HTMLDivElement>;
}

export default function FixedMenu({ 
  accountBookRef,
  characterRef,
  monitoringRef,
  contentsStatusRef
}: FixedMenuProps) {
  const [isMemoBoardOpen, setIsMemoBoardOpen] = useState(false);
  const [isLootCalculatorOpen, setIsLootCalculatorOpen] = useState(false);

  function handleMemoBoardBtnClick() {
    setIsMemoBoardOpen(!isMemoBoardOpen);
  }

  function handleLootCalculatorBtnClick() {
    setIsLootCalculatorOpen(!isLootCalculatorOpen);
  }

  function gotoUp() {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }

  function gotoDown() {
    window.scroll({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }

  function gotoTargetRef(targetRef: React.RefObject<HTMLDivElement>) {
    const pos = targetRef.current?.offsetTop;
    if (typeof pos === 'number') {
      window.scroll({
        top: pos - 70,
        behavior: 'smooth',
      });
    }
  }
  
  return (
    <FixedMenuDiv>
      {isMemoBoardOpen && <MemoBoard/>}
      {isLootCalculatorOpen && <LootCalculator handleLootCalculatorBtnClick={handleLootCalculatorBtnClick}/>}
      <ul>
        <li className='fixed-menu' onClick={()=>gotoTargetRef(monitoringRef)}>전체현황</li>
        <li className='fixed-menu' onClick={()=>gotoTargetRef(characterRef)}>캐릭터현황</li>
        <li className='fixed-menu' onClick={()=>gotoTargetRef(contentsStatusRef)}>컨텐츠현황</li>
        <li className='fixed-menu' onClick={()=>gotoTargetRef(accountBookRef)}>골드현황</li>
        <li className='fixed-menu' onClick={handleLootCalculatorBtnClick}>입찰계산기</li>
        <li className='fixed-menu' onClick={handleMemoBoardBtnClick}>메모장</li>
      </ul>
      <ul>
        <li className='fixed-menu-goto-btn goto-up' onClick={gotoUp}><AiOutlineArrowUp /></li>
        <li className='fixed-menu-goto-btn goto-down' onClick={gotoDown}><AiOutlineArrowDown /></li>
      </ul>
    </FixedMenuDiv>
  );
}
