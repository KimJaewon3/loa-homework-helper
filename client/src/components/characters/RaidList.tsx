import { useState } from "react";
import { BsX } from "react-icons/bs";
import styled from "styled-components";
import {
  deleteRaidList,
  reorderRaidList,
  updateRaidIsDone,
} from "../../redux/slice/characterSlice";
import { useAppDispatch } from "../../redux/store";
import { display } from "../../style/display";
import { makeRaidFullName } from "./Character";
import RaidListGold from "./RaidListGold";

import type { ContentsType } from "../../redux/slice/characterSlice";

type Props = {
  characterIdx: number;
  raidListIdx: number;
  content: ContentsType;
  raidListDragIdx: React.MutableRefObject<number>;
  raidListsRef: React.MutableRefObject<HTMLDivElement[]>;
};

const RaidList = ({
  characterIdx,
  raidListIdx,
  content,
  raidListDragIdx,
  raidListsRef,
}: Props) => {
  const dispatch = useAppDispatch();
  const [isRaidListDraggable, setIsRaidListDraggable] = useState(false);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const { dataTransfer } = e as React.DragEvent<HTMLDivElement>;
    if (dataTransfer) {
      const img = new Image();
      img.src = "";
      dataTransfer.setDragImage(img, 0, 0);
    }
    e.currentTarget.classList.add("drag-start");
    raidListDragIdx.current = raidListIdx;
  };

  const handleDragEnd = (
    e: React.DragEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
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

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isRaidListDraggable) return;
    for (let idx = 0; idx < raidListsRef.current.length; idx++) {
      const { top, height } = raidListsRef.current[idx].getBoundingClientRect();
      const { clientY } = e.targetTouches[0];
      if (
        clientY > top + height / 2 &&
        clientY < top + height &&
        idx !== raidListIdx
      ) {
        dispatch(
          reorderRaidList({
            characterIdx,
            fromIdx: raidListIdx,
            toIdx: idx,
          })
        );
        const slice = raidListsRef.current.splice(raidListIdx, 1);
        raidListsRef.current.splice(idx, 0, slice[0]);
        break;
      }
    }
  };

  return (
    <RaidListContainer>
      <div
        ref={(el) => {
          if (!el) return;
          raidListsRef.current[raidListIdx] = el;
        }}
        draggable={isRaidListDraggable}
        onDragStart={(e) => handleDragStart(e)}
        onDragEnd={(e) => handleDragEnd(e)}
        onDragOver={(e) => handleDragOver(e)}
        onTouchStart={(e) => handleDragStart(e)}
        onTouchMove={(e) => handleTouchMove(e)}
        onTouchEnd={(e) => handleDragEnd(e)}
      >
        <div className="raid-list-box">
          <div>
            <div
              className="raid-list-drag-icon"
              onMouseDown={() => setIsRaidListDraggable(true)}
              onMouseUp={() => setIsRaidListDraggable(false)}
              onTouchStart={() => setIsRaidListDraggable(true)}
              onTouchEnd={() => setIsRaidListDraggable(false)}
            >
              :::
            </div>
            <div className="raid-list-title">{makeRaidFullName(content)}</div>
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
  .raid-list-box {
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
  .raid-list-drag-icon {
    margin-right: 5px;
    touch-action: none;
  }
  @media ${display.mobile} {
    margin: 10px;
    font-size: large;
    .raid-list-title {
      width: 6em;
      white-space: nowrap;
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
`;

export default RaidList;
