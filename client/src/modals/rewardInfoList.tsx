import React, { useState } from "react";
import { rewardImgs } from "../img/rewardImg";
import { OpenedHeaderMenu } from "../style/styled";
import RewardInfoModal from "./rewardInfoImg";

const RewardInfoList = () => {
  const [isRewardInfoClicked, setIsRewardInfoClicked] = useState(false);
  const [imgSrc, setImgsrc] = useState("");

  const handleRewardInfoClick = (src: string) => {
    setIsRewardInfoClicked(true);
    setImgsrc(src);
  };

  return (
    <OpenedHeaderMenu>
      {rewardImgs.map((imgInfo, idx) => (
        <div
          className="opened-list"
          key={idx}
          onClick={() => handleRewardInfoClick(imgInfo.src)}
        >
          <span>{imgInfo.name}</span>
        </div>
      ))}
      {isRewardInfoClicked && (
        <RewardInfoModal
          src={imgSrc}
          setIsRewardInfoClicked={setIsRewardInfoClicked}
        />
      )}
    </OpenedHeaderMenu>
  );
};

export default RewardInfoList;
