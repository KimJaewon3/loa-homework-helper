import React, { useState } from 'react';
import { addCharacter, updateContent } from '../redux/slice/contentsSlice';
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
    }))
    setIsAddCharacterModalOpen(false);
  }

  function changeInputChecked(e: React.ChangeEvent<HTMLInputElement>, characterName: string, raidName: string) {
    dispatch(updateContent({
      name: characterName,
      target: raidName,
      check: e.target.checked
    }));
  }

  return (
    <div>
      <span>상세 현황</span>

      <div>
        {contetnts.map(charater => {
          return (
            <div key={charater.name} >
              <span>{charater.name}</span>
              <div>
                <ul>
                  {Object.entries(charater.content).map((raidInfo, idx) => {
                    return (
                      <li key={idx}>
                        <label>{raidInfo[0]}</label>
                        <input type="checkbox" checked={raidInfo[1]} onChange={e=>changeInputChecked(e, charater.name, raidInfo[0])}></input>
                      </li>
                    )
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
