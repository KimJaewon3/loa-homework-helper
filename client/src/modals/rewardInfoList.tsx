import React, { useState } from "react";
import { rewardImgs } from "../img/rewardImg";
import { OpenedHeaderMenu } from "../style/styled";
import RewardInfoModal from "./rewardInfoImg";

export default function RewardInfo() {
  const [isRewardInfoClicked, setIsRewardInfoClicked] = useState(false);
  const [imgSrc, setImgsrc] = useState("");

  function handleRewardInfoClick(src: string) {
    setIsRewardInfoClicked(true);
    setImgsrc(src);
  }

  return (
    <OpenedHeaderMenu>
      {isRewardInfoClicked && <RewardInfoModal src={imgSrc} />}
      {rewardImgs.map((imgInfo, idx) => {
        return (
          <div
            className="opened-list"
            key={idx}
            onClick={() => handleRewardInfoClick(imgInfo.src)}
          >
            <span>{imgInfo.name}</span>
          </div>
        );
      })}
    </OpenedHeaderMenu>
  );
}
