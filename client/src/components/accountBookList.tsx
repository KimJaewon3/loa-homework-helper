import React from 'react';
import styled from 'styled-components';
import { bookItem, deleteAccountBookList } from '../redux/slice/accountBookSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { BsX } from "react-icons/bs";

const AccountBookListDiv = styled.div`
  
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
        <div>
          <span>추가사항</span>
          <button onClick={initialBookEtcItem}>추가사항 초기화</button>
        </div>
      )}
      <ul>
        {accountBook[type].map((el, idx) => {
          return (
            <li key={idx}>
              {type === 'etc' && (
                <BsX size={20} onClick={()=>deleteBookEtcItem(idx)}/>
              )}
              <div>{el.history}</div>
              <div>{el.gold}</div>
            </li>
          )
        })}
      </ul>
      <div>
        <span>합계: </span>
        <span>{accGold(accountBook[type])}</span>
      </div>
    </AccountBookListDiv>  
  )
}
