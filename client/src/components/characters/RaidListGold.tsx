import { useState } from "react";
import { GrMoney } from "react-icons/gr";
import styled from "styled-components";
import { updateReward } from "../../redux/slice/FcharacterSlice";
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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 5) return;
    setInputValue(e.target.value);
  };

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
    <RaidListGoldContainer>
      {isEditing ? (
        <div>
          <input
            type="number"
            max="99999"
            value={inputValue}
            onChange={handleInput}
          />
          <div onClick={handleSubmit} style={{ color: "green" }}>
            v
          </div>
          <div onClick={cancleSubmit} style={{ color: "red" }}>
            x
          </div>
        </div>
      ) : (
        <div onClick={() => setIsEditing(true)}>
          <div>{reward}</div>
          <div className="svg-wrap">
            <GrMoney size={14} />
          </div>
        </div>
      )}
    </RaidListGoldContainer>
  );
};

const RaidListGoldContainer = styled.div`
  > * {
    display: flex;
    > * {
      margin: 0 5px 0 5px;
    }
    > input {
      width: 6em;
    }
  }
`;

export default RaidListGold;
