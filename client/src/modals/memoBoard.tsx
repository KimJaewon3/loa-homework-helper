import React from "react";
import styled from "styled-components";
import { updateMemo } from "../redux/slice/memoBoardSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { display } from "../style/display";
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
    border: 2px solid black;
    background-color: white;
    height: 500px;
    textarea {
      margin: 1em;
      resize: none;
      border: none;
      margin: 1em;
      overflow-y: scroll;
      width: 100%;
    }
    textarea:focus {
      outline: none;
    }
  }
  @media ${display.desktop} {
    .memo-modal {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 370px;
    }
  }
  @media ${display.mobile} {
    .memo-modal {
      margin: 2em 0 2em 0;
      top: 70px;
      left: 0;
      width: 100%;
      border: none;
    }
  }
`;

export default MemoBoard;
