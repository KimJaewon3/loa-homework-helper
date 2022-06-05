import React, { useState } from 'react';
import styled from 'styled-components';
import { addCharacter, addList, deleteCharacter, deleteList, updateContent } from '../redux/slice/contentsSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { BsX } from "react-icons/bs";

const CharactersDiv = styled.div`
  > span {
    font-size: 30px;
    color: white;
  }
  .characters-add-box {
    margin: 10px 0 0 30px;
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
    margin: 30px;
    align-items: flex-start;
    .character-box {
      border: 2px solid #ffffff;
      border-radius: 10px;
      background-color: rgb(240, 248, 255, 0.8);
      margin: 2em 2em 0 0;
      > * {
        padding: 20px;
      }
    }
    .character-box-title {
      display: flex;
      align-items: center;
      padding: 10px 20px 10px 20px;
      justify-content: space-between;
      border-bottom: 2px solid #ffffff;
      background-color: rgb(172, 172, 172);
      border-radius: 10px 10px 0 0;
      span {
        font-size: larger;
      }
    }
    .character-box-list {
      ul {
        padding: 0;
      }
      li {
        list-style: none;
        display: flex;
        align-items: center;
        margin: 5px 0 5px 0;
        >:first-child {
          margin: 5px 1em 0 0;
        }
      }
    }
    .character-box-add-list {
      > * {

        padding: 5px;
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
  listName: '',
}

export default function Characters() {
  const [isAbledInputValue, setIsAbledInputValue] = useState(true);
  const [alertText, setAlerText] = useState('');
  const [isAddCharacterModalOpen, setIsAddCharacterModalOpen] = useState(false);
  const [inpuValue, setInputValue] = useState<InputValue>({
    name: '',
    level: 0,
    listName: '',
  })
  const dispatch = useAppDispatch();
  const contetnts = useAppSelector(state => state.contentsReducer.contents);

  function handleInputValue(e: React.ChangeEvent<HTMLInputElement>) {
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
    if (inpuValue.listName === '') return;
    dispatch(addList({ characterIdx, raidName: inpuValue.listName }));
    setInputValue({
      ...inpuValue,
      listName: '',
    })
  }

  function handleDeleteCharacter(idx: number) {
    dispatch(deleteCharacter({ idx }));
  }

  function handleDeleteList(characterIdx: number, raidIdx: number) {
    dispatch(deleteList({ characterIdx, raidIdx }));
  }

  return (
    <CharactersDiv>
      <span>상세 현황</span>

      <div className='characters-add-box'>
        <button onClick={handleAddCharacter}>+ 캐릭터 추가하기</button>
        {!isAbledInputValue && (
          <span className='characters-add-box-alert'>{alertText}</span>
        )}
        {isAddCharacterModalOpen && (
          <div className='add-box-input-info'>
            <input name='name' placeholder='캐릭터명' onChange={e=>handleInputValue(e)}></input>
            <input name='level' placeholder='레벨' onChange={e=>handleInputValue(e)}></input>
            <button onClick={submitAddCharacter}>확인</button>
          </div>
        )}
      </div>

      <div className='character-container'>
        {contetnts.map((charater, characterIdx) => {
          return (
            <div className='character-box' key={charater.name} >
              <div className='character-box-title'>
                <span>{charater.name}</span>
                <div onClick={()=>handleDeleteCharacter(characterIdx)}>
                  <BsX size={30}/>
                </div>
              </div>
              <div className='character-box-list'>
                <ul>
                  {charater.content.map((raidInfo, raidIdx) => {
                    const key = Object.keys(raidInfo)[0];
                    return (
                      <li key={raidIdx}>
                        <div onClick={()=>handleDeleteList(characterIdx, raidIdx)}>
                          <BsX />
                        </div>
                        <div>{key}</div>
                        <input 
                          type="checkbox" checked={raidInfo[key]}
                          onChange={e=>changeInputChecked(e, characterIdx, raidIdx)}>
                        </input>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className='character-box-add-list'>
                <input name='listName' placeholder=' + 리스트 추가하기' onChange={e=>handleInputValue(e)} />
                <button onClick={()=>handleAddList(characterIdx)}>+</button>
              </div>
            </div>
          )
        })}
      </div>
    </CharactersDiv>
  )
}
