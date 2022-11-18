import { useEffect, useState } from "react";
import { BsX } from "react-icons/bs";
import styled from "styled-components";
import {
  ContentsType,
  deleteRaidList,
  reorderRaidList,
  updateRaidIsDone,
} from "../../redux/slice/characterSlice";
import { useAppDispatch } from "../../redux/store";
import { display } from "../../style/display";
import { makeRaidFullName } from "./Character";
import RaidListGold from "./RaidListGold";

type Props = {
  characterIdx: number;
  raidListIdx: number;
  content: ContentsType;
  raidListDragIdx: React.MutableRefObject<number>;
};

const RaidList = ({
  characterIdx,
  raidListIdx,
  content,
  raidListDragIdx,
}: Props) => {
  const dispatch = useAppDispatch();
  const [isRaidListDraggable, setIsRaidListDraggable] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const img = new Image();
    img.src = "";
    e.dataTransfer.setDragImage(img, 0, 0);
    e.currentTarget.classList.add("drag-start");
    raidListDragIdx.current = raidListIdx;
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("drag-start");
    setIsRaidListDraggable(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (raidListDragIdx.current === raidListIdx) return;
    const { top, height } = e.currentTarget.getBoundingClientRect();
    const ypos = e.clientY;

    if (ypos > top + height / 2) {
      dispatch(
        reorderRaidList({
          characterIdx,
          fromIdx: raidListDragIdx.current,
          toIdx: raidListIdx,
        })
      );
      raidListDragIdx.current = raidListIdx;
    }
  };

  return (
    <RaidListContainer>
      <div
        draggable={isRaidListDraggable}
        onDragStart={(e) => handleDragStart(e)}
        onDragEnd={(e) => handleDragEnd(e)}
        onDragOver={(e) => handleDragOver(e)}
      >
        <div className="chracter-raid-list-wrap">
          <div>
            <div
              className="chracter-raid-list-drag-icon"
              onMouseDown={() => setIsRaidListDraggable(true)}
              onMouseUp={() => setIsRaidListDraggable(false)}
            >
              :::
            </div>
            <div className="character-raid-list-name">
              {makeRaidFullName(content)}
            </div>
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

          <div>
            <RaidListGold
              characterIdx={characterIdx}
              raidListIdx={raidListIdx}
              reward={content.raidData.reward}
            />
            <BsX
              onClick={() =>
                dispatch(deleteRaidList({ characterIdx, raidListIdx }))
              }
            />
          </div>
        </div>
      </div>
    </RaidListContainer>
  );
};

const RaidListContainer = styled.li`
  margin: 5px;
  list-style: none;
  .chracter-raid-list-wrap {
    border-bottom: 1px solid #8c8c8c;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    justify-content: space-between;
    > * {
      margin: 0 10px 5px 0;
      display: flex;
      align-items: center;
    }
  }
  .chracter-raid-list-drag-icon {
    margin-right: 5px;
  }
  .drag-start {
    opacity: 0.5;
  }
  @media ${display.mobile} {
    margin: 10px;
    font-size: large;
    .character-raid-list-name {
      width: 6em;
      white-space: nowrap;
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
`;

export default RaidList;
