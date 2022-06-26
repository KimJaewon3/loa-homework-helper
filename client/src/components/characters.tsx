import React, { forwardRef, useRef, useState } from 'react';
import styled from 'styled-components';
import { addCharacter, addList, ChangeOrder, changeOrder, deleteCharacter, deleteList, RaidList, updateContent, updateSixTimesLimit } from '../redux/slice/contentsSlice';
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
    color: ${({ theme }) => theme.color.fontColor};
    margin-left: 0;
    display: flex;
    align-items: center;
  }
  .character-gold-notice {
    margin-left: 1em;
    font-size: 0.5em;
    > svg path {
      stroke: ${({ theme }) => theme.color.fontColor};;
    }
  }
  .characters-add-box {
    > button {
      border-radius: 5px;
      border: none;
      padding: 5px;
    }
    .characters-add-box-alert {
      color: ${({ theme }) => theme.color.fontColor};
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
      margin: 0 1em 1em 0;
      > div {
        border: 2px solid ${({ theme }) => theme.color.borderColor};
        border-radius: 10px;
        background-color: rgb(240, 248, 255, 0.8);
        > * {
          padding: 5px;
        }
        .character-box-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid ${({ theme }) => theme.color.borderColor};
          background-color: ${({ theme }) => theme.color.titleColor};
          border-radius: 7px 7px 0 0;
          span {
            font-size: 1.2em;
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
    }
  }
  .drag-start {
    opacity: 0.7;
  }
  .drag-over-move-before {
    transform: translateX(10px);
    > div{
      box-shadow: -7px 0 9px -4px ${({ theme }) => theme.color.fontColor};
    };
  }
  .drag-over-move-after {
    transform: translateX(-10px);
    > div{
      box-shadow: 7px 0 9px -4px ${({ theme }) => theme.color.fontColor};
    }
  }
  .mute-drag-children * {
    pointer-events: none;
  }
`;

type InputValue = {
  name: '',
  level: 0,
}

type Pos = {
  fromIdx: string;
  toIdx: string;
  clientX: number;
  behavior: 'before' | 'after';
}

const Characters = forwardRef<HTMLDivElement>(function Characters(props, ref) {
  const [isAbledInputValue, setIsAbledInputValue] = useState(true); // 6회제한
  const [alertText, setAlerText] = useState('');
  const [isAddCharacterModalOpen, setIsAddCharacterModalOpen] = useState(false);
  const [inpuValue, setInputValue] = useState<InputValue>({
    name: '',
    level: 0,
  });
  const dispatch = useAppDispatch();
  const contetnts = useAppSelector(state => state.contentsReducer.contents);
  const listNameInputRef = useRef<HTMLInputElement[]>([]); // 숙제 리스트 추가
  // drag
  const characterRef = useRef<HTMLDivElement[]>([]);
  const pos = useRef<Pos>({
    fromIdx: '0',
    toIdx: '0',
    clientX: 0,
    behavior: 'before',
  });

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

  function handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    characterRef.current.map(el => {
      if (el.id !== e.currentTarget.id) {
        el.classList.add('mute-drag-children');
      } else {
        pos.current.fromIdx = el.id;
        el.classList.add('drag-start');
      }
    });
  }

  function handleDrag(e: React.DragEvent<HTMLDivElement>) {
    pos.current.clientX = e.clientX;
  }

  function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
    pos.current.toIdx = e.currentTarget.id;
    characterRef.current.map(el => {
      if (el.id !== e.currentTarget.id) {
        el.classList.remove(`drag-over-move-${pos.current.behavior}`);
      }
    });
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    const { left, width } = e.currentTarget.getBoundingClientRect();
    const behavior = pos.current.clientX < left + width / 2 ? 'before' : 'after';
    if (behavior !== pos.current.behavior) {
      e.currentTarget.classList.remove(`drag-over-move-${pos.current.behavior}`);
    }
    pos.current.behavior = behavior;

    if (e.currentTarget.id !== pos.current.fromIdx) {
      e.currentTarget.classList.add(`drag-over-move-${behavior}`);
    }
  }

  function handleDragzoneDragEnd() {
    characterRef.current.map(el => {
      el.classList.remove(
        'mute-drag-children',
        `drag-over-move-${pos.current.behavior}`,
        'drag-start',
      );
    });
    dispatch(changeOrder({
      from: Number(pos.current.fromIdx),
      to: Number(pos.current.toIdx),
      behavior: pos.current.behavior,
    }));
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
        <div>
          <span className='character-gold-notice'>* 드래그해 캐릭터의 순서를 변경할 수 있습니다.</span>
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
      
      <div className='character-container'onDragEnd={handleDragzoneDragEnd} >
        {contetnts.map((character, characterIdx) => {
          return (
            <div
              className='character-box'
              key={character.name} 
              id={`${characterIdx}`} 
              draggable={true}
              onDrag={e=>handleDrag(e)}
              onDragOver={e=>handleDragOver(e)}
              onDragEnter={e=>handleDragEnter(e)}
              onDragStart={e=>handleDragStart(e)}
              ref={el => {
                if (el !== null) {
                  characterRef.current[characterIdx] = el;
              }}
            }>
              <div>
                <div className='character-box-title'>
                  <div>
                    <input type='checkbox' checked={character.abledReward} onChange={()=>handleSixTimesLimit(characterIdx)}/>
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
            </div>
          )
        })}
      </div>
    </CharactersDiv>
  )
});

export default Characters;
