import { useMemo, useState } from "react";
import { BsX } from "react-icons/bs";
import {
  addRaidList,
  CharacterType,
  deleteCharacter,
  updateSixTimeLimit,
} from "../../redux/slice/FcharacterSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { RaidList } from "./FRaidList";

type Props = {
  character: CharacterType;
  characterIdx: number;
};

const Character = ({ character, characterIdx }: Props) => {
  const dispatch = useAppDispatch();
  const { name, isLimitedSixTime, contents } = character;
  const [raidListInput, setRaidListInput] = useState("");

  const goldCounter = useMemo(() => {
    let allSum = 0;
    let currentSum = 0;

    character.contents.forEach((raid) => {
      allSum += raid.raidData.reward;
      if (raid.isDone) {
        currentSum += raid.raidData.reward;
      }
    });

    return {
      allSum,
      currentSum,
    };
  }, [character]);

  const submitRaidList = () => {
    dispatch(addRaidList({ characterIdx, raidName: raidListInput }));
    setRaidListInput("");
  };

  return (
    <li>
      <div className="wrap">
        <div className="title-box">
          <input
            type="checkbox"
            checked={isLimitedSixTime}
            onChange={() => dispatch(updateSixTimeLimit({ characterIdx }))}
          />
          <div>{name}</div>
          <BsX
            size={30}
            onClick={() => dispatch(deleteCharacter({ characterName: name }))}
          />
        </div>

        <div className="raid-list">
          <RaidList characterIdx={characterIdx} contents={contents} />
        </div>

        <div className="gold-counter">
          <div>전체 골드: {goldCounter.allSum}</div>
          <div>획득 골드: {goldCounter.currentSum}</div>
        </div>

        <div className="add-raid-list">
          <input
            placeholder=" + 리스트 추가하기"
            value={raidListInput}
            onChange={(e) => {
              setRaidListInput(e.target.value);
            }}
            onKeyDown={(e) => e.key === "Enter" && submitRaidList()}
          />
          <button onClick={submitRaidList}>+</button>
        </div>
      </div>
    </li>
  );
};

export { Character };
