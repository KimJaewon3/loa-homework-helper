import React, { useState } from "react";
import styled from "styled-components";
import { GrMoney, GrNotification } from "react-icons/gr";
import { BsPalette } from "react-icons/bs";
import WeeklyResetCheck from "../modals/weeklyResetCheck";
import { display } from "../style/display";
import RewardInfoList from "../modals/rewardInfoList";
import ThemeInfoList from "../modals/themeInfoList";

const HeaderMenu = () => {
  const [isRewardMenuOpen, setIsRewardMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isWeeklyResetModalOpen, setIsWeeklyResetModalOpen] = useState(false);

  const handleWeeklyRestBtn = (isOpen: boolean) => {
    setIsWeeklyResetModalOpen(isOpen);
  };

  return (
    <HeaderMenuContainer>
      <div className="menu-box">
        <h1>로아 숙제 현황판</h1>
        <ul>
          <li>
            <MenuBtn onClick={() => handleWeeklyRestBtn(true)}>
              <span>주간 초기화</span>
              <div className="svg-wrap">
                <GrNotification />
              </div>
            </MenuBtn>
          </li>

          <li>
            <MenuBtn onClick={() => setIsRewardMenuOpen(!isRewardMenuOpen)}>
              <span>레이드 보상</span>
              <div className="svg-wrap">
                <GrMoney />
              </div>
            </MenuBtn>
            {isRewardMenuOpen && <RewardInfoList />}
          </li>

          <li>
            <MenuBtn onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}>
              <span>테마 변경</span>
              <div className="svg-wrap">
                <BsPalette />
              </div>
            </MenuBtn>
            {isThemeMenuOpen && <ThemeInfoList />}
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
        margin: 0 10px 0 10px;
      }
    }
  }
`;

const MenuBtn = styled.div`
  padding: 5px;
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
  @media ${display.mobile} {
    width: auto;
    > span {
      display: none;
    }
  }
`;

export default HeaderMenu;
