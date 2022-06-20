import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { GrMoney, GrNotification } from "react-icons/gr";
import { BsPalette } from "react-icons/bs";
import { useAppDispatch } from '../redux/store';
import { initList } from '../redux/slice/contentsSlice';
import RewardInfo from './rewardInfo';
import ThemeInfo from './themeInfo';

const MenuDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  height: 70px;
  width: 100%;
  z-index: 5;
  background-color: ${({ theme }) => theme.color.titleColor};
  box-shadow: 0 0 5px black;
 > span {
    font-size: 1.2em;
    margin: 1em;
    color: ${({ theme }) => theme.color.fontColor};
  }
  > div {
    display: flex;
    align-items: center;
  }
  .menu-box {
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
  width: 120px;
  text-align: center;
  > * {
    margin: 0 5px 0 0;
  }
`;

export default function Menu() {
  const dispatch = useAppDispatch();
  const [isRewardMenuOpen, setIsRewardMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  function handleInitialList() {
    dispatch(initList());
  }

  function handleRewardMenuOpen() {
    setIsRewardMenuOpen(!isRewardMenuOpen);
  }

  function handleThemeMenuOpen() {
    setIsThemeMenuOpen(!isThemeMenuOpen);
  }

  return (
    <MenuDiv>
      <span>로아 숙제 현황판</span>
      <div>
        <MenuBtn onClick={handleInitialList}>
          <span>주간 초기화</span>
          <GrNotification />
        </MenuBtn>
        <div className='menu-box'>
          <MenuBtn onClick={handleRewardMenuOpen}>
            <span>레이드 보상</span>
            <GrMoney />
          </MenuBtn>
          {isRewardMenuOpen && <RewardInfo />}
        </div>
        <div className='menu-box'>
          <MenuBtn onClick={handleThemeMenuOpen}>
            <span>테마 변경</span>
            <BsPalette />
          </MenuBtn>
          {isThemeMenuOpen && <ThemeInfo />}
        </div>
      </div>
    </MenuDiv>
  )
}

