import React, { useState } from 'react';
import styled from 'styled-components';
import MemoBoard from './memoBoard';
import { AiOutlineArrowUp } from "react-icons/ai";

const FixedMenuDiv = styled.div`
  position: fixed;
  top: 35%;
  right: 0%;
  > div {
    padding: 3px;
    background-color: white;
    border: 2px solid black;
  }
  .fixed-menu-goto-up {
    position: fixed;
    bottom: 10%;
    right: 0;
    margin: 2em;
    padding: 0.7em;
    background-color: #ffe38f;
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

  function handleMemoBoardBtnClick() {
    setIsMemoBoardOpen(!isMemoBoardOpen);
  }

  function gotoUp() {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }

  function gotoTargetRef(targetRef: React.RefObject<HTMLDivElement>) {
    window.scroll({
      top: targetRef.current?.offsetTop,
      behavior: 'smooth',
    });
  }
  
  return (
    <FixedMenuDiv>
      <div onClick={()=>gotoTargetRef(monitoringRef)}>전체현황</div>
      <div onClick={()=>gotoTargetRef(characterRef)}>캐릭터현황</div>
      <div onClick={()=>gotoTargetRef(contentsStatusRef)}>컨텐츠현황</div>
      <div onClick={()=>gotoTargetRef(accountBookRef)}>골드현황</div>
      <div onClick={handleMemoBoardBtnClick}>메모장</div>
      <div className='fixed-menu-goto-up' onClick={gotoUp}>
        <AiOutlineArrowUp />
      </div>
      {isMemoBoardOpen && <MemoBoard />}
    </FixedMenuDiv>
  )
}
