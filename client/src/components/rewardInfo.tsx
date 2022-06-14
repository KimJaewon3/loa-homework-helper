import React, { useState } from 'react';
import styled from 'styled-components';
import { rewardImgs } from '../img/rewardImg';
import RewardInfoModal from './rewardInfoModal';

const RewardInfoDiv = styled.div`
  position: absolute;
  background-color: white;
  top: 1.1em;
  padding-top: 1em;
  z-index: 4;
  width: 89%;
  border: 2px solid black;
  border-radius: 0 0 10px 10px;
  .reward-info-menu-list{
    margin: 5px 0 5px 0;
    padding-left: 5px; 
  }
  .reward-info-menu-list:not(:last-of-type) {
    border-bottom: 2px solid black;
  }
`;

export default function RewardInfo() {
  const [isRewardInfoClicked, setIsRewardInfoClicked] = useState(false);
  const [imgSrc, setImgsrc] = useState('');

  function handleRewardInfoClick(src: string) {
    setIsRewardInfoClicked(true);
    setImgsrc(src);
  }

  return (
    <RewardInfoDiv>
      {isRewardInfoClicked && <RewardInfoModal src={imgSrc}/>}
      {rewardImgs.map((imgInfo, idx) => {
        return (
          <div className='reward-info-menu-list' key={idx} onClick={()=>handleRewardInfoClick(imgInfo.src)}>
            <span>{imgInfo.name}</span>
          </div>
        );
      })}
    </RewardInfoDiv>
  );
}
