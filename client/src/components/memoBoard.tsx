import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { updateMemo } from '../redux/slice/memoBoardSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';

const MemoBoardDiv = styled.div`
  border: 2px solid black;
  background-color: white;
`;

export default function MemoBoard() {
  const dispatch = useAppDispatch();
  const memoBoard = useAppSelector(state => state.memoBoardReducer.memo);

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    dispatch(updateMemo({ value: e.target.value }));
  }

  return (
    <MemoBoardDiv>
      <textarea onChange={e=>handleTextChange(e)} value={memoBoard}></textarea>
    </MemoBoardDiv>
  )
}
