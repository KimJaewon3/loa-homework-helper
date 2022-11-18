import React from "react";
import styled from "styled-components";
import { updateMemo } from "../redux/slice/memoBoardSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { ModalBack } from "../style/styled";

type Props = {
  setIsMemoBoardOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MemoBoard = ({ setIsMemoBoardOpen }: Props) => {
  const dispatch = useAppDispatch();
  const memoBoard = useAppSelector((state) => state.memoBoardReducer.memo);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateMemo({ value: e.target.value }));
  };

  return (
    <MemoBoardContainer>
      <div className="memo-modal">
        <textarea
          onChange={(e) => handleTextChange(e)}
          value={memoBoard}
          placeholder="...memo"
        ></textarea>
      </div>
      <ModalBack onClick={() => setIsMemoBoardOpen(false)} />
    </MemoBoardContainer>
  );
};

const MemoBoardContainer = styled.div`
  .memo-modal {
    position: fixed;
    display: flex;
    z-index: 11;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
  }
`;

export default MemoBoard;
