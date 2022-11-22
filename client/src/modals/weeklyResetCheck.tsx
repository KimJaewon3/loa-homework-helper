import React from "react";
import styled from "styled-components";
import { mococoImg } from "../img/mococoImg";
import { initRaidList } from "../redux/slice/characterSlice";
import { useAppDispatch } from "../redux/store";
import { display } from "../style/display";
import { ModalBack } from "../style/styled";

type Props = {
  handleWeeklyRestBtn: (isOpen: boolean) => void;
};

const WeeklyResetCheck = ({ handleWeeklyRestBtn }: Props) => {
  const dispatch = useAppDispatch();

  const confirmReset = (check: boolean) => {
    if (check) {
      dispatch(initRaidList());
    }
    handleWeeklyRestBtn(false);
  };

  return (
    <WeeklyResetCheckContainer>
      <div className="weekly-modal">
        <div className="weekly-modal-img-box">
          <img src={mococoImg[0]} />
        </div>
        <div className="weekly-modal-confirm-container">
          <p>정말 초기화하실 건가요?</p>
          <div className="weekly-modal-btn-box">
            <div onClick={() => confirmReset(true)}>▶ 그래</div>
            <div onClick={() => confirmReset(false)}>▶ 잘못눌렀어</div>
          </div>
        </div>
      </div>
      <ModalBack onClick={() => confirmReset(false)} />
    </WeeklyResetCheckContainer>
  );
};

const WeeklyResetCheckContainer = styled.div`
  .weekly-modal {
    position: fixed;
    background-color: #d9f0cb;
    display: flex;
    z-index: 11;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    .weekly-modal-confirm-container {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      margin: 2em;
      .weekly-modal-btn-box {
        display: flex;
        margin-top: 1em;
        > div {
          min-width: 90px;
          margin-right: 1em;
          background-color: #d9f0cb;
          border: none;
          text-align: center;
        }
        > div:hover {
          font-weight: bold;
        }
      }
    }
  }
  @media ${display.mobile} {
    .weekly-modal-img-box {
      display: flex;
      align-items: center;
      justify-content: center;
      > img {
        max-width: 150px;
      }
    }
  }
`;

export default WeeklyResetCheck;
