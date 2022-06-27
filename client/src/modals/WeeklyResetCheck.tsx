import React from 'react';
import styled from 'styled-components';
import { mococoImg } from '../img/mococoImg';
import { initList } from '../redux/slice/contentsSlice';
import { useAppDispatch } from '../redux/store';



const WeeklyResetCheckDiv = styled.div`
  .weekly-modal-background {
    position: fixed;
    background-color: gray;
    opacity: 0.7;
    width: 100%;
    height: 100%;
    z-index: 10;
    top: 0;
    left: 0;
  }
  .weekly-modal {
    position: fixed;
    background-color: #d9f0cb;
    display: flex;
    z-index: 11;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 10px;
    .weekly-modal-confirm-container {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      margin: 2em;
      button {
        margin-right: 1em;
      }
    }
  }
`;

type Props = {
  handleWeeklyRestBtn: (isOpen: boolean) => void;
}

export default function WeeklyResetCheck({ handleWeeklyRestBtn }: Props) {
  const dispatch = useAppDispatch();
  
  function confirmReset(check: boolean) {
    if (check) {
      dispatch(initList());
    }
    handleWeeklyRestBtn(false);
  }

  return (
    <WeeklyResetCheckDiv>
      <div className='weekly-modal'>
        <div>
          <img src={mococoImg[0]} />
        </div>
        <div className='weekly-modal-confirm-container'>
          <p>정말 초기화하실 건가요?</p>
          <div>
            <button onClick={()=>confirmReset(true)}>그래</button>
            <button onClick={()=>confirmReset(false)}>잘못눌렀어</button>
          </div>
        </div>
      </div>
      <div className='weekly-modal-background' onClick={()=>confirmReset(false)}></div>
    </WeeklyResetCheckDiv>
  );
}
