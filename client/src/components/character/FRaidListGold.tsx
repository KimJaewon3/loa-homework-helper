import { useState } from "react";
import { GrMoney } from "react-icons/gr";
import { ContentsType, updateReward } from "../../redux/slice/FcharacterSlice";
import { useAppDispatch } from "../../redux/store";

type Props = {
  characterIdx: number;
  raidListIdx: number;
  reward: number;
};

const RaidListGold = ({ characterIdx, raidListIdx, reward }: Props) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(`${reward}`);

  const handleSubmit = () => {
    dispatch(
      updateReward({ characterIdx, raidListIdx, gold: Number(inputValue) })
    );
    setIsEditing(false);
  };

  const cancleSubmit = () => {
    setInputValue(`${reward}`);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div onClick={handleSubmit}>v</div>
          <div onClick={cancleSubmit}>x</div>
        </div>
      ) : (
        <div onClick={() => setIsEditing(true)}>
          <div>{reward}</div>
          <GrMoney size={14} />
        </div>
      )}
    </div>
  );
};

export { RaidListGold };
