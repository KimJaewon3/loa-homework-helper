import React, { useState } from 'react';
import styled from 'styled-components';

const MemoBoardDiv = styled.div`
  border: 2px solid black;
  background-color: white;
`;

export default function MemoBoard() {

  return (
    <MemoBoardDiv>
      메모장 준비중
    </MemoBoardDiv>
  )
}
