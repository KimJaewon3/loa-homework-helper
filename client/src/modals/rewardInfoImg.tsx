import React from "react";
import styled from "styled-components";

type RewardInfoModalProps = {
  src: string;
};

const RewardInfoModalDiv = styled.div`
  position: absolute;
  top: 1.5em;
  left: -634px;
  border: 2px solid black;
  border-radius: 10px;
  padding: 15px 10px 15px 15px;
  background-color: #429497;
  max-height: 800px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    height: 30%;
    background-color: #ffffff;
    border-radius: 10px;
  }
  img {
    width: 600px;
  }
`;

export default function RewardInfoModal({ src }: RewardInfoModalProps) {
  return (
    <RewardInfoModalDiv>
      <img src={src} />
    </RewardInfoModalDiv>
  );
}
