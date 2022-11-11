import { useRef, useState } from "react";
import { BsX } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";
import {
  ContentsType,
  deleteRaidList,
  updateRaidIsDone,
} from "../../redux/slice/FcharacterSlice";
import { useAppDispatch } from "../../redux/store";
import { RaidListGold } from "./FRaidListGold";

type Props = {
  characterIdx: number;
  contents: ContentsType[];
};

const RaidList = ({ characterIdx, contents }: Props) => {
  const dispatch = useAppDispatch();

  const makeRaidFullName = (content: ContentsType) => {
    let fullName = content.raidName;
    if (content.raidData.difficulty) {
      fullName = `[${content.raidData.difficulty}]${fullName}`;
    }
    return fullName;
  };

  return (
    <div>
      <ul>
        {contents.map((content, raidListIdx) => (
          <li key={raidListIdx}>
            <div>
              <div className="drag-icon">:::</div>

              <div className="raid-isdone-check">
                <div>{makeRaidFullName(content)}</div>
                <input
                  type="checkbox"
                  checked={content.isDone}
                  onChange={() =>
                    dispatch(
                      updateRaidIsDone({
                        characterIdx,
                        raidListIdx,
                        isDone: !content.isDone,
                      })
                    )
                  }
                />
              </div>

              <RaidListGold
                characterIdx={characterIdx}
                raidListIdx={raidListIdx}
                reward={content.raidData.reward}
              />

              <BsX
                className="delete-raid-list"
                onClick={() =>
                  dispatch(deleteRaidList({ characterIdx, raidListIdx }))
                }
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { RaidList };
