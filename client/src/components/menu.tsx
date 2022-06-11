import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { GrMoney, GrNotification } from "react-icons/gr";
import { useAppDispatch } from '../redux/store';
import { initList } from '../redux/slice/contentsSlice';
import RewardInfo from './rewardInfo';

const MenuDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #7686db;
  
 > span {
    font-size: 1.2em;
    font-weight: bold;
    margin: 1em;
    color: white;
  }
  > div {
    display: flex;
    align-items: center;
  }
  .reward-menu-box {
    position: relative;
  }
`;

const MenuBtn = styled.div`
  background-color: white;
  margin: 0 10px 0 0;
  padding: 5px;
  border-radius: 10px;
  border: 2px solid black;
  position: relative;
  z-index: 5;
  > * {
    margin: 0 5px 0 0;
  }
`;

export default function Menu() {
  const dispatch = useAppDispatch();
  const [isRewardMenuOpen, setIsRewardMenuOpen] = useState(false);

  function handleInitialList() {
    dispatch(initList());
  }

  function handleRewardOpen() {
    setIsRewardMenuOpen(!isRewardMenuOpen);
  }

  return (
    <MenuDiv>
      <span>로아 숙제 현황판</span>
      <div>
        <MenuBtn onClick={handleInitialList}>
          <span>전체 초기화</span>
          <GrNotification />
        </MenuBtn>
        <div className='reward-menu-box'>
          <MenuBtn onClick={handleRewardOpen}>
            <span>레이드 보상</span>
            <GrMoney />
          </MenuBtn>
          {isRewardMenuOpen && <RewardInfo />}
        </div>
      </div>
    </MenuDiv>
  )
}

