import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { updateMemo } from "../redux/slice/memoBoardSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

const MemoBoard = () => {
  const dispatch = useAppDispatch();
  const memoBoard = useAppSelector((state) => state.memoBoardReducer.memo);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateMemo({ value: e.target.value }));
  };

  return (
    <MemoBoardContainer>
      <textarea
        onChange={(e) => handleTextChange(e)}
        value={memoBoard}
        placeholder="...memo"
      ></textarea>
    </MemoBoardContainer>
  );
};

const MemoBoardContainer = styled.div`
  position: absolute;
  top: 0;
  left: -380px;
  border: 2px solid black;
  background-color: white;
  width: 370px;
  height: 500px;
  textarea {
    resize: none;
    border: none;
    margin: 1em;
    width: 350px;
    height: 450px;
  }
  textarea:focus {
    outline: none;
  }
`;

export default MemoBoard;
