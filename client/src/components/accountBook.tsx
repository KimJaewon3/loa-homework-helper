import React, { forwardRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { addAccountBookList, updateAccountBookList } from '../redux/slice/accountBookSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import AccountBookList, { accGold } from './accountBookList';

const AccountBookDiv = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    margin: 1em;
  }
  .account-book-title {
    font-size: 1.5em;
    color: white;
    margin-left: 0;
  }
  .account-book-container {
    width: fit-content;
    background-color: rgb(240, 248, 255, 0.8);
    border-radius: 10px;
    padding: 0.5em;
    > * {
      padding: 0.5em;
    }
    .account-book-total-sum {
      font-size: 1.1em;
      font-weight: bold;
      text-align: right;
    }
    .deposit-withdraw-container {
      display: flex;
      align-items: center;
      input {
        height: 20px;
        margin: 0 10px 0 10px;
      }
      button {
        height: 26px;
      }
    }
  }
`;

const AccountBook = forwardRef<HTMLDivElement>(function AccountBook(props, ref) {
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
    <AccountBookDiv ref={ref}>
      <span className='account-book-title'>골드 현황</span>

      <div className='account-book-container'>
        <AccountBookList type='character'/>
        <AccountBookList type='etc'/>
      
        <div className='account-book-total-sum'>
          <span>전체 합계: </span>
          <span>{accGold(accountBook.character) + accGold(accountBook.etc)}</span>
        </div>
      
        <div className='deposit-withdraw-container'>
          <span>입금 : </span>
          <input name='depositHistory' type='text' placeholder='항목' onChange={e=>handleInputValue(e)} value={inputValue.depositHistory}></input>
          <input name='depositGold' type='number' placeholder='금액' onChange={e=>handleInputValue(e)} value={inputValue.depositGold}></input>
          <button onClick={()=>handleAddAccountList('deposit')}>확인</button>
        </div>

        <div className='deposit-withdraw-container'>
          <span>출금 : </span>
          <input name='withdrawHistory' type='text' placeholder='항목' onChange={e=>handleInputValue(e)} value={inputValue.withdrawHistory}></input>
          <input name='withdrawGold' type='number' placeholder='금액' onChange={e=>handleInputValue(e)} value={inputValue.withdrawGold}></input>
          <button onClick={()=>handleAddAccountList('withdraw')}>확인</button>
        </div>
      </div>
    </AccountBookDiv>
  )
})

export default AccountBook;
