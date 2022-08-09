import React, { useState } from 'react';
import styled from 'styled-components';
import { BsQuestionCircle } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";

const DescWindowDiv = styled.div`
  position: relative;
  .description-window {
    position: absolute;
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    margin-left: 1em;
    font-size: 0.5em;
    background-color: white;
    border: 1px solid black;
    border-radius: 5px;
    padding: 1em;
    top: -80px;
    svg path {
      stroke: ${({ theme }) => theme.color.fontColor};;
    }
  }
`;

export default function DescWindow() {

  return (
    <DescWindowDiv>
      <div className='description-window'>
        <span>
          <span>* </span>
          <GrMoney size={14} />
          <span>를 클릭해 골드를 변경할 수 있습니다.</span>
        </span>
        <span>* 드래그해 캐릭터의 순서를 변경할 수 있습니다.</span>
        <span>* 좌측상단의 체크박스를 통해 6회 제한을 설정할 수 있습니다.</span>
      </div>
    </DescWindowDiv>
  );
}
