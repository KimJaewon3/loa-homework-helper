import React, { useState } from "react";
import styled from "styled-components";
import { GrMoney, GrNotification } from "react-icons/gr";
import { BsPalette } from "react-icons/bs";
import RewardInfo from "../modals/rewardInfoList";
import ThemeInfo from "../modals/themeInfoList";
import WeeklyResetCheck from "../modals/weeklyResetCheck";

const HeaderMenu = () => {
  const [isRewardMenuOpen, setIsRewardMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isWeeklyResetModalOpen, setIsWeeklyResetModalOpen] = useState(false);

  const handleWeeklyRestBtn = (isOpen: boolean) => {
    setIsWeeklyResetModalOpen(isOpen);
  };

  const handleRewardMenuOpen = () => {
    setIsRewardMenuOpen(!isRewardMenuOpen);
  };

  const handleThemeMenuOpen = () => {
    setIsThemeMenuOpen(!isThemeMenuOpen);
  };

  return (
    <HeaderMenuContainer>
      <div className="menu-box">
        <h1>로아 숙제 현황판</h1>
        <ul>
          <li>
            <MenuBtn onClick={() => handleWeeklyRestBtn(true)}>
              주간 초기화
              <div className="svg-wrap">
                <GrNotification />
              </div>
            </MenuBtn>
          </li>
          <li className="menu-drop">
            <MenuBtn onClick={handleRewardMenuOpen}>
              레이드 보상
              <div className="svg-wrap">
                <GrMoney />
              </div>
            </MenuBtn>
            {isRewardMenuOpen && <RewardInfo />}
          </li>
          <li className="menu-drop">
            <MenuBtn onClick={handleThemeMenuOpen}>
              테마 변경
              <div className="svg-wrap">
                <BsPalette />
              </div>
            </MenuBtn>
            {isThemeMenuOpen && <ThemeInfo />}
          </li>
        </ul>
      </div>

      {isWeeklyResetModalOpen && (
        <WeeklyResetCheck handleWeeklyRestBtn={handleWeeklyRestBtn} />
      )}
    </HeaderMenuContainer>
  );
};

const HeaderMenuContainer = styled.header`
  .menu-box {
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
    > ul {
      display: flex;
      align-items: center;
      > li {
        list-style: none;
      }
    }
    .menu-drop {
      position: relative;
    }
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
  display: flex;
  align-items: center;
  justify-content: center;
  > * {
    margin: 0 5px 0 0;
  }
`;

export default HeaderMenu;
