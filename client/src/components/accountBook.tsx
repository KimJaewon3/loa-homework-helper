import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { addAccountBookList, updateAccountBookList } from '../redux/slice/accountBookSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import AccountBookList, { accGold } from './accountBookList';

const AccountBookDiv = styled.div`
  background-color: white;
  li {
    display: flex;
  }
`;

export default function AccountBook() {
  const dispatch = useAppDispatch();
  const contents = useAppSelector(state => state.contentsReducer.contents);
  const accountBook = useAppSelector(state => state.accountBookReducer.accountBook);
  const [inputValue, setInputValue] = useState({
    depositHistory: '',
    depositGold: '0',
    withdrawHistory: '',
    withdrawGold: '0',
  });

  useEffect(() => {
    contents.map((character, characterIdx) => {
      let goldSum = 0;
      if (character.abledReward) {
        character.content.map(el => {
          const key = Object.keys(el)[0];
          if (el[key].isDone) {
            goldSum += el[key].rewardGold;
          }
        });
      }
      
      dispatch(updateAccountBookList({
        history: character.name,
        gold: goldSum,
        type: 'character',
        idx: characterIdx,
      }));
    });
  }, [contents]);

  function handleInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  }

  function handleAddAccountList(type: 'deposit' | 'withdraw') {
    if (type === 'deposit') {
      dispatch(addAccountBookList({
        history: inputValue.depositHistory,
        gold: Number(inputValue.depositGold),
        type: 'etc',
      }));
      setInputValue({
        ...inputValue,
        depositHistory: '',
        depositGold: '0',
      });
    } else {
      dispatch(addAccountBookList({
        history: inputValue.withdrawHistory,
        gold: Number(inputValue.withdrawGold) * -1,
        type: 'etc',
      }));
      setInputValue({
        ...inputValue,
        withdrawHistory: '',
        withdrawGold: '0',
      });
    }
  }

  return (
    <AccountBookDiv>
      <div>골드 현황 가계부</div>

      <AccountBookList type='character'/>
      <AccountBookList type='etc'/>
     
      <div>
        <span>전체 합계: </span>
        <span>{accGold(accountBook.character) + accGold(accountBook.etc)}</span>
      </div>
      
      <div>
        <div>입금 : </div>
        <input name='depositHistory' type='text' placeholder='항목' onChange={e=>handleInputValue(e)} value={inputValue.depositHistory}></input>
        <input name='depositGold' type='number' placeholder='금액' onChange={e=>handleInputValue(e)} value={inputValue.depositGold}></input>
        <button onClick={()=>handleAddAccountList('deposit')}>확인</button>
      </div>

      <div>
        <div>출금 : </div>
        <input name='withdrawHistory' type='text' placeholder='항목' onChange={e=>handleInputValue(e)} value={inputValue.withdrawHistory}></input>
        <input name='withdrawGold' type='number' placeholder='금액' onChange={e=>handleInputValue(e)} value={inputValue.withdrawGold}></input>
        <button onClick={()=>handleAddAccountList('withdraw')}>확인</button>
      </div>
    </AccountBookDiv>
  )
}
