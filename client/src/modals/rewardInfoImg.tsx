import React from "react";
import styled from "styled-components";
import { display } from "../style/display";
import { ModalBack } from "../style/styled";

type Props = {
  src: string;
  setIsRewardInfoClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

const RewardInfoModal = ({ src, setIsRewardInfoClicked }: Props) => {
  return (
    <RewardInfoModalContainer onClick={() => setIsRewardInfoClicked(false)}>
      <div className="reward-info-img-box">
        <img src={src} />
      </div>
      <ModalBack />
    </RewardInfoModalContainer>
  );
};

const RewardInfoModalContainer = styled.div`
  top: 1.5em;
  left: -634px;
  border: 2px solid black;
  border-radius: 10px;
  padding: 15px 10px 15px 15px;
  background-color: #429497;
  max-height: 800px;
  .reward-info-img-box {
    position: fixed;
    background-color: ${({ theme }) => theme.color.titleColor};
    z-index: 11;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    padding: 1em;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-thumb {
      height: 30%;
      background-color: #ffffff;
      border-radius: 10px;
    }
  }
  img {
    width: 600px;
  }
  @media ${display.mobile} {
    touch-action: none;
    .reward-info-img-box {
      width: 100%;
      max-height: 80%;
      img {
        width: 100%;
      }
    }
  }
`;

export default RewardInfoModal;
