import React, { useState } from 'react';
import styled from 'styled-components';
import { updateGoldReward } from '../redux/slice/contentsSlice';
import { useAppDispatch } from '../redux/store';

const GoldDiv = styled.div`
  .edit-gold-box {
    display: flex;
    > * {
      margin-left: 10px;
    }
    input {
      width: 7em;
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
          <div onClick={handleSubmitGold}>v</div>
          <div onClick={handleCancleSubmit}>x</div>
        </div>
      ) : (
        <div onClick={handleEditGold}>{goldReward}</div>
      )}
    </GoldDiv>
  )
}
