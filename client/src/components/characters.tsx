import React, { forwardRef, useRef, useState } from 'react';
import styled from 'styled-components';
import { addCharacter, addList, deleteCharacter, deleteList, RaidList, updateContent, updateSixTimesLimit } from '../redux/slice/contentsSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { BsX } from "react-icons/bs";
import Gold from './gold';
import SumGold from './sumGold';
import { addAccountBookList, deleteAccountBookList } from '../redux/slice/accountBookSlice';
import { GrMoney } from 'react-icons/gr';

const CharactersDiv = styled.div`
  > * {
    margin: 1em;
  }
  .character-title-container {
    font-size: 1.5em;
    color: white;
    margin-left: 0;
    display: flex;
    align-items: center;
  }
  .character-gold-notice {
    margin-left: 1em;
    font-size: 0.5em;
    > svg path {
      stroke: white;
    }
  }
  .characters-add-box {
    > button {
      border-radius: 5px;
      border: none;
      padding: 5px;
    }
    .characters-add-box-alert {
      color: white;
    }
    .add-box-input-info {
      display: flex;
      align-items: center;
      > * {
        margin: 10px 10px 0 0;
      }
      input {
        height: 20px;
      }
      button {
        height: 26px;
      }
    }
  }
  .character-container {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    .character-box {
      border: 2px solid #ffffff;
      border-radius: 10px;
      background-color: rgb(240, 248, 255, 0.8);
      margin: 0 1em 1em 0;
      > * {
        padding: 5px;
      }
    }
    .character-box-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 2px solid #ffffff;
      background-color: rgb(108 184 86);
      border-radius: 10px 10px 0 0;
      span {
        font-weight: bold;
      }
    }
    .character-box-list {
      ul {
        padding: 0;
      }
      li {
        border-bottom: 1px solid #8c8c8c;
        list-style: none;
        display: flex;
        align-items: center;
        margin: 0 0 5px 0;
        justify-content: space-between;
        > * {
          margin: 0 10px 5px 0;
        }
        >:first-child {
          display: flex;
          align-items: center;
        }
      }
    }
    .character-box-add-list {
      > * {
        padding: 5px;
      }
      > input {
        width: 14em;
      }
      > button {
        width: 2.5em;
      }
    }
  }
`;

type InputValue = {
  name: '',
  level: 0,
}

const Characters = forwardRef<HTMLDivElement>(function Characters(props, ref) {
  const [isAbledInputValue, setIsAbledInputValue] = useState(true);
  const [alertText, setAlerText] = useState('');
  const [isAddCharacterModalOpen, setIsAddCharacterModalOpen] = useState(false);
  const [inpuValue, setInputValue] = useState<InputValue>({
    name: '',
    level: 0,
  });
  const dispatch = useAppDispatch();
  const contetnts = useAppSelector(state => state.contentsReducer.contents);
  const listNameInputRef = useRef<HTMLInputElement[]>([]);

  function handleInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === 'name' && e.target.value.length > 12) return;
    setInputValue({
      ...inpuValue,
      [e.target.name]: e.target.value
    });
  }

  function submitAddCharacter() {
    if (inpuValue.name === '' || inpuValue.level === 0) {
      setIsAbledInputValue(false);
      setAlerText(' * 값을 입력해주세요 * ');
      return;
    }
    if (contetnts.findIndex(el => el.name === inpuValue.name) !== -1) {
      setIsAbledInputValue(false);
      setAlerText(' * 이미 존재하는 캐릭터입니다 * ');
      return;
    }
    dispatch(addCharacter({
      name: inpuValue.name,
      level: inpuValue.level,
    }));
    dispatch(addAccountBookList({
      type: 'character',
      history: inpuValue.name,
      gold: 0,
    }))
    setIsAddCharacterModalOpen(false);
    setIsAbledInputValue(true);
    setInputValue({
      ...inpuValue,
      name: '',
      level: 0,
    });
  }

  function changeInputChecked(e: React.ChangeEvent<HTMLInputElement>, characterIdx: number, raidIdx: number) {
    dispatch(updateContent({
        characterIdx,
        raidIdx,
        check: e.target.checked,
    }));
  }

  function handleAddCharacter() {
    setIsAddCharacterModalOpen(!isAddCharacterModalOpen);
    setIsAbledInputValue(true);
  }

  function handleAddList(characterIdx: number) {
    const value = listNameInputRef.current[characterIdx].value;
    if (value === '') return;
    dispatch(addList({ characterIdx, raidName: value }));
    listNameInputRef.current[characterIdx].value = '';
  }

  function handleDeleteCharacter(idx: number) {
    dispatch(deleteCharacter({ idx }));
    dispatch(deleteAccountBookList({
      type: 'character',
      targetIdx: idx,
    }));
  }

  function handleDeleteList(characterIdx: number, raidIdx: number) {
    dispatch(deleteList({ characterIdx, raidIdx }));
  }

  function handleSixTimesLimit(characterIdx: number) {
    dispatch(updateSixTimesLimit({ characterIdx }));
  }
  
  function handlePressEnterKey(e: React.KeyboardEvent<HTMLInputElement>, characterIdx: number) {
    if (e.key !== 'Enter') return;
    handleAddList(characterIdx);
  }

  return (
    <CharactersDiv ref={ref}>
      <div className='character-title-container'>
        <span>캐릭터 현황</span>
        <div className='character-gold-notice'>
          <span>* </span>
          <GrMoney size={14} />
          <span>를 클릭해 골드를 변경할 수 있습니다.</span>
        </div>
      </div>

      <div className='characters-add-box'>
        <button onClick={handleAddCharacter}>+ 캐릭터 추가하기</button>
        {!isAbledInputValue && (
          <span className='characters-add-box-alert'>{alertText}</span>
        )}
        {isAddCharacterModalOpen && (
          <div className='add-box-input-info'>
            <input name='name' placeholder='캐릭터명' onChange={e=>handleInputValue(e)} value={inpuValue.name}></input>
            <input name='level' placeholder='레벨' onChange={e=>handleInputValue(e)}></input>
            <button onClick={submitAddCharacter}>확인</button>
          </div>
        )}
      </div>

      <div className='character-container'>
        {contetnts.map((character, characterIdx) => {
          return (
            <div className='character-box' key={character.name} >
              <div className='character-box-title'>
                <div>
                  <input type='checkbox' checked={character.abledReward} onChange={()=>handleSixTimesLimit(characterIdx)} />
                  <span>{character.name}</span>
                </div>
                <BsX size={30} onClick={()=>handleDeleteCharacter(characterIdx)}/>
              </div>
              <div className='character-box-list'>
                <ul>
                  {character.content.map((raidInfo, raidIdx) => {
                    const key = Object.keys(raidInfo)[0];
                    return (
                      <li key={raidIdx}>
                        <div>
                          <BsX onClick={()=>handleDeleteList(characterIdx, raidIdx)}/>
                          <div>{key}</div>
                          <input 
                            type="checkbox" checked={raidInfo[key].isDone}
                            onChange={e=>changeInputChecked(e, characterIdx, raidIdx)}>
                          </input>
                        </div>

                        <Gold goldReward={raidInfo[key].rewardGold} characterIdx={characterIdx} raidIdx={raidIdx} />                       
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className='character-box-sum-gold'>
                <SumGold contents={character.content}></SumGold>
              </div>
              <div className='character-box-add-list'>
                <input 
                  name='listName' 
                  placeholder=' + 리스트 추가하기'
                  onKeyDown={e=>handlePressEnterKey(e, characterIdx)}
                  ref={el => {
                    if (el !== null) {
                      listNameInputRef.current[characterIdx] = el;
                    }
                  }}
                />
                <button onClick={()=>handleAddList(characterIdx)}>+</button>
              </div>
            </div>
          )
        })}
      </div>
    </CharactersDiv>
  )
});

export default Characters;
