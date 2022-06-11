import React from 'react';
import styled from 'styled-components';
import { bookItem, deleteAccountBookList } from '../redux/slice/accountBookSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { BsX } from "react-icons/bs";

const AccountBookListDiv = styled.div`
  position: relative;
  > ul {
    border: 3px solid black;
    padding: 2em 1em;
    > li {
      display: flex;
      margin: 10px 0 10px 0;
      justify-content: space-between;
      border-bottom: 1px solid gray;
      .account-book-list-history {
        display: flex;
        margin-right: 1em;
      }
    }
  }
  .account-book-list-title {
    position: absolute;
    background-color: #c8d2e1;
    left: 1em;
    top: 0.5em;
    padding: 0 1em 0 1em;
    font-size: 1.1em;
    font-weight: bold;
    > button {
      margin-left: 1em;
      border: none;
      border-radius: 10px;
      background-color: #949494;
    }
  }
  .account-book-list-sum {
    display: flex;
    justify-content: space-between;
    margin: 0 1em 0 0;
  }
`;

type AccountBookListProps = {
  type: 'character' | 'etc';
}

export function accGold(bookItem: bookItem[]) {
  return bookItem.reduce((acc, el) => {
    return acc + el.gold;
  }, 0);
}

export default function AccountBookList({ type }: AccountBookListProps) {
  const dispatch = useAppDispatch();
  const accountBook = useAppSelector(state => state.accountBookReducer.accountBook);
  
  function deleteBookEtcItem(idx: number) {
    dispatch(deleteAccountBookList({
      type: 'etc',
      targetIdx: idx,
    }));
  }

  function initialBookEtcItem() {
    for (let i = accountBook.etc.length - 1; i >= 0; i--) {
      deleteBookEtcItem(i);
    }
  }

  return (
    <AccountBookListDiv>
      {type === 'etc' && (
        <div className='account-book-list-title'>
          <span>추가사항</span>
          <button onClick={initialBookEtcItem}>초기화</button>
        </div>
      )}
      {type === 'character' && (
        <span className='account-book-list-title'>캐릭터</span>
      )}
      <ul>
        {accountBook[type].map((el, idx) => {
          return (
            <li key={idx}>
              <div className='account-book-list-history'>
                {type === 'etc' && (
                  <BsX size={20} color='#bf0d0d' onClick={()=>deleteBookEtcItem(idx)}/>
                )}
                <div>{el.history}</div>
              </div>
              <div>{el.gold}</div>
            </li>
          )
        })}
      </ul>
      <div className='account-book-list-sum'>
        <span>합계: </span>
        <span>{accGold(accountBook[type])}</span>
      </div>
    </AccountBookListDiv>  
  )
}
