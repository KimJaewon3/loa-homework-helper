import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { GrMoney, GrNotification } from "react-icons/gr";
import { BsPalette } from "react-icons/bs";
import { useAppDispatch } from '../redux/store';
import { initList } from '../redux/slice/contentsSlice';
import RewardInfo from '../modals/rewardInfoList';
import ThemeInfo from '../modals/themeInfoList';
import WeeklyResetCheck from '../modals/WeeklyResetCheck';

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
  > h1 {
    font-weight: unset;
    font-size: 1.2em;
    margin: 1em;
    color: ${({ theme }) => theme.color.fontColor};
  }
  > aside {
    display: flex;
    align-items: center;
    > li {
      list-style: none;
    }
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
  const [isWeeklyResetModalOpen, setIsWeeklyResetModalOpen] = useState(false);

  function handleWeeklyRestBtn(isOpen: boolean) {
    setIsWeeklyResetModalOpen(isOpen);
  }

  function handleRewardMenuOpen() {
    setIsRewardMenuOpen(!isRewardMenuOpen);
  }

  function handleThemeMenuOpen() {
    setIsThemeMenuOpen(!isThemeMenuOpen);
  }

  return (
    <header>
      <MenuDiv>
        <h1>로아 숙제 현황판</h1>
        <aside>
          <li>
            <MenuBtn onClick={()=>handleWeeklyRestBtn(true)}>
              주간 초기화
              <GrNotification />
            </MenuBtn>
          </li>
          <li className='menu-box'>
            <MenuBtn onClick={handleRewardMenuOpen}>
              레이드 보상
              <GrMoney />
            </MenuBtn>
            {isRewardMenuOpen && <RewardInfo />}
          </li>
          <li className='menu-box'>
            <MenuBtn onClick={handleThemeMenuOpen}>
              테마 변경
              <BsPalette />
            </MenuBtn>
            {isThemeMenuOpen && <ThemeInfo />}
          </li>
        </aside>
      </MenuDiv>
      {isWeeklyResetModalOpen && 
        <WeeklyResetCheck handleWeeklyRestBtn={handleWeeklyRestBtn}/>
      }
    </header>
  );
}
