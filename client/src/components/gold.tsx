import React, { useState } from 'react';
import styled from 'styled-components';
import { updateGoldReward } from '../redux/slice/contentsSlice';
import { useAppDispatch } from '../redux/store';
import { GrMoney } from "react-icons/gr";

const GoldDiv = styled.div`
  .edit-gold-box {
    display: flex;
    > * {
      margin-left: 10px;
    }
    input {
      width: 6em;
    }
    .edit-gold-v {
      color: #088108;
    }
    .edit-gold-x {
      color: #bf0d0d;
    }
  }
  .gold-info {
    > span {
      margin-right: 5px;
    } 
  }
`;

type GoldProps = {
  goldReward: number;
  characterIdx: number;
  raidIdx: number;
}

export default function Gold({ goldReward, characterIdx, raidIdx }: GoldProps) {
  const dispatch = useAppDispatch();
  const [isEdited, setIsEdited] = useState(false);
  const [inputValue, setInputValue] = useState({
    gold: '0',
  });

  function handleEditGold() {
    setIsEdited(true);
  }

  function handleInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    if (value < 0 || value > 999999) return;
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmitGold() {
    dispatch(updateGoldReward({
      characterIdx,
      raidIdx,
      gold: Number(inputValue.gold)
    }));
    setIsEdited(false);
    setInputValue({
      gold: '',
    });
  }

  function handleCancleSubmit() {
    setIsEdited(false);
    setInputValue({
      gold: '',
    });
  }

  return (
    <GoldDiv>
      {isEdited ? (
        <div className='edit-gold-box'>
          <input type='number' name='gold' onChange={e=>handleInputValue(e)} value={inputValue.gold}/>
          <div className='edit-gold-v' onClick={handleSubmitGold}>v</div>
          <div className='edit-gold-x' onClick={handleCancleSubmit}>x</div>
        </div>
      ) : (
        <div className='gold-info' onClick={handleEditGold}>
          <span>{goldReward}</span>
          <GrMoney size={14}/>
        </div>
      )}
    </GoldDiv>
  )
}
