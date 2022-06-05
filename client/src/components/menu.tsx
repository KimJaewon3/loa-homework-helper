import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { GrMoney, GrNotification } from "react-icons/gr";
import { useAppDispatch } from '../redux/store';
import { initList } from '../redux/slice/contentsSlice';

const MenuDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    margin: 1em;
    color: white;
  }
  > div {
    display: flex;
    align-items: center;
    .reward-menu-box {
      position: relative;
    }
    .reward-menu {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 3;
      background-color: green;
      padding: 0.5em;
      width: 6.5em;
    }
    .is-open {
    }
  }
`;

const MenuBtn = styled.div`
  background-color: white;
  margin: 0 3em 0 0;
  padding: 0.5em;
  border-radius: 10px;
  width: 6.5em;
  z-index: 5;
`;

export default function Menu() {
  const dispatch = useAppDispatch();
  const [isRewardMenuOpen, setIsRewardMenuOpen] = useState(false);

  function handleInitialList() {
    dispatch(initList());
  }

  function handleRewardOpen() {
    //setIsRewardMenuOpen(true);
  }

  return (
    <MenuDiv>
      <h1>로아 숙제 현황판</h1>
      <div>
        <MenuBtn onClick={handleInitialList}>
          전체 초기화 <GrNotification />
        </MenuBtn>
        <div className='reward-menu-box'>
          {/*
            <div className={`reward-menu ${isRewardMenuOpen && 'is-open'}`} >준비중</div>
          */}
            <MenuBtn onMouseEnter={handleRewardOpen}>
            레이드 보상 <GrMoney />
          </MenuBtn>
          </div>
      </div>
    </MenuDiv>
  )
}

