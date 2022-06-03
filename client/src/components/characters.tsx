import React, { useState } from 'react';
import { addCharacter, deleteCharacter, deleteList, updateContent } from '../redux/slice/contentsSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';


export default function Characters() {
  const [isAddCharacterModalOpen, setIsAddCharacterModalOpen] = useState(false);
  const [inpuValue, setInputValue] = useState({
    name: '',
    level: 0,
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
    dispatch(addCharacter({
      name: inpuValue.name,
      level: inpuValue.level,
    }));
    setIsAddCharacterModalOpen(false);
  }

  function changeInputChecked(e: React.ChangeEvent<HTMLInputElement>, characterIdx: number, raidIdx: number) {
    dispatch(updateContent({
        characterIdx,
        raidIdx,
        check: e.target.checked,
    }));
  }

  function handleDeleteCharacter(idx: number) {
    dispatch(deleteCharacter({ idx }));
  }

  function handleDeleteList(characterIdx: number, raidIdx: number) {
    dispatch(deleteList({ characterIdx, raidIdx }));
  }

  return (
    <div>
      <span>상세 현황</span>

      <div>
        {contetnts.map((charater, characterIdx) => {
          return (
            <div key={charater.name} >
              <div>
                <span>{charater.name}</span>
                <div onClick={()=>handleDeleteCharacter(characterIdx)}>x</div>
              </div>
              <div>
                <ul>
                  {charater.content.map((raidInfo, raidIdx) => {
                    const key = Object.keys(raidInfo)[0];
                    return (
                      <li key={raidIdx}>
                        <div onClick={()=>handleDeleteList(characterIdx, raidIdx)}>x</div>
                        <label>{key}</label>
                        <input 
                          type="checkbox" checked={raidInfo[key]}
                          onChange={e=>changeInputChecked(e, characterIdx, raidIdx)}>
                        </input>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )
        })}
      </div>

      <div>
        <button onClick={()=>setIsAddCharacterModalOpen(!isAddCharacterModalOpen)}>+</button>
        {isAddCharacterModalOpen && (
          <div>
            <input name='name' placeholder='캐릭터명' onChange={e=>handleInputValue(e)}></input>
            <input name='level' placeholder='레벨' onChange={e=>handleInputValue(e)}></input>
            <button onClick={submitAddCharacter}>확인</button>
          </div>
        )}
      </div>
    </div>
  )
}
