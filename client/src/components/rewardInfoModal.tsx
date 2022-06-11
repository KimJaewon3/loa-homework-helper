import React from 'react';
import styled from 'styled-components';

type RewardInfoModalProps = {
  src: string;
}

const RewardInfoModalDiv = styled.div`
  position: absolute;
  top: 1.5em;
  left: -636px;
  border: 2px solid black;
  border-radius: 10px;
  padding: 1em;
  background-color: #429497;
  img {
    width: 600px;
  }
`;

export default function RewardInfoModal({ src }: RewardInfoModalProps) {

  return (
    <RewardInfoModalDiv>
      <img src={src}/>
    </RewardInfoModalDiv>
  );
}
