import { useMemo, useRef, useState } from "react";
import { BsX } from "react-icons/bs";
import styled from "styled-components";
import {
  addRaidList,
  deleteCharacter,
  reorderCharacter,
  updateSixTimeLimit,
} from "../../redux/slice/characterSlice";
import { useAppDispatch } from "../../redux/store";
import { display } from "../../style/display";
import RaidList from "./RaidList";

import type {
  CharacterType,
  ContentsType,
} from "../../redux/slice/characterSlice";
import type { CharacterDragInfo } from "../CharacterStatus";

const makeRaidFullName = (content: ContentsType) => {
  let fullName = content.raidName;
  if (content.raidData.difficulty) {
    fullName = `[${content.raidData.difficulty}]${fullName}`;
  }
  return fullName;
};

type Props = {
  character: CharacterType;
  characterIdx: number;
  charactersRef: React.MutableRefObject<HTMLDivElement[]>;
  characterDragInfo: CharacterDragInfo;
  setCharacterDragInfo: React.Dispatch<React.SetStateAction<CharacterDragInfo>>;
};

const Character = ({
  character,
  characterIdx,
  charactersRef,
  characterDragInfo,
  setCharacterDragInfo,
}: Props) => {
  const dispatch = useAppDispatch();
  const [isCharacterDraggable, setIsCharacterDraggable] = useState(false);
  const { name, isLimitedSixTime, contents } = character;
  const [raidListInput, setRaidListInput] = useState("");
  const raidListDragIdx = useRef(0);
  const raidListsRef = useRef<HTMLDivElement[]>([]);

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
    const isNewRaid = contents.findIndex(
      (raid) => raid.raidName === raidListInput
    );
    if (isNewRaid) {
      dispatch(addRaidList({ characterIdx, raidName: raidListInput }));
    }
    setRaidListInput("");
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    charactersRef.current.map((el, idx) => {
      el.classList.add("mute-pointer");
      if (idx === characterIdx) {
        el.classList.add("drag-start");
      }
    });
    setCharacterDragInfo({
      ...characterDragInfo,
      fromIdx: characterIdx,
      isDragging: true,
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) return;
    if (characterDragInfo.fromIdx === characterIdx) return;
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const xpos = e.clientX;
    let move: "before" | "after" = xpos < left + width / 2 ? "before" : "after";
    e.currentTarget.classList.remove(`drag-move-${characterDragInfo.move}`);
    e.currentTarget.classList.add(`drag-move-${move}`);
    setCharacterDragInfo({ ...characterDragInfo, move });
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    charactersRef.current.map((el, idx) => {
      if (idx !== characterIdx) {
        el.classList.remove(`drag-move-${characterDragInfo.move}`);
      }
    });
    setCharacterDragInfo({ ...characterDragInfo, toIdx: characterIdx });
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    charactersRef.current.map((el) => {
      el.classList.remove(
        "mute-pointer",
        `drag-move-${characterDragInfo.move}`,
        "drag-start"
      );
    });
    dispatch(reorderCharacter({ ...characterDragInfo }));
    setIsCharacterDraggable(false);
  };

  return (
    <CharacterContainer>
      <div
        draggable={isCharacterDraggable}
        onDragStart={(e) => handleDragStart(e)}
        onDragEnd={(e) => handleDragEnd(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragEnter={(e) => handleDragEnter(e)}
        ref={(el) => {
          if (el !== null) {
            charactersRef.current[characterIdx] = el;
          }
        }}
      >
        <div className="character-box">
          <div
            className="character-title-box"
            onMouseDown={() => setIsCharacterDraggable(true)}
            onMouseUp={() => setIsCharacterDraggable(false)}
          >
            <div>
              <input
                type="checkbox"
                checked={isLimitedSixTime}
                onChange={() => dispatch(updateSixTimeLimit({ characterIdx }))}
              />
              <span>{name}</span>
            </div>
            <BsX
              size={30}
              onClick={() => dispatch(deleteCharacter({ characterName: name }))}
            />
          </div>

          <ul onDragEnter={(e) => e.preventDefault()}>
            {contents.map((content, raidListIdx) => (
              <RaidList
                key={makeRaidFullName(content)}
                characterIdx={characterIdx}
                raidListIdx={raidListIdx}
                content={content}
                raidListDragIdx={raidListDragIdx}
                raidListsRef={raidListsRef}
              />
            ))}
          </ul>

          <div className="character-gold-box">
            <div>
              <div>전체 골드: {goldCounter.allSum}</div>
              <div>획득 골드: {goldCounter.currentSum}</div>
            </div>
          </div>

          <div className="character-add-raid-list">
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
      </div>
    </CharacterContainer>
  );
};

const CharacterContainer = styled.li`
  list-style: none;
  margin: 0 1em 1em 0;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  .character-box {
    border: 2px solid ${({ theme }) => theme.color.borderColor};
    border-radius: 10px;
    background-color: rgb(240, 248, 255, 0.8);
    > * {
      padding: 5px;
    }
    > ul {
      padding: 0;
      margin: 1em 0 1em 0;
    }
  }
  .character-title-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid ${({ theme }) => theme.color.borderColor};
    background-color: ${({ theme }) => theme.color.titleColor};
    border-radius: 7px 7px 0 0;
    span {
      font-size: 1.2em;
    }
  }
  .character-gold-box {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    > * {
      margin: 10px;
    }
  }
  .character-add-raid-list {
    display: flex;
    width: auto;
    > * {
      padding: 5px;
    }
    > input {
      width: 14em;
      width: -webkit-fill-available;
    }
    > button {
      width: 2.5em;
    }
  }
  .drag-move-before {
    transform: translateX(10px);
    > div {
      box-shadow: -7px 0 9px -4px ${({ theme }) => theme.color.fontColor};
    }
  }
  .drag-move-after {
    transform: translateX(-10px);
    > div {
      box-shadow: 7px 0 9px -4px ${({ theme }) => theme.color.fontColor};
    }
  }
  .mute-pointer * {
    pointer-events: none;
  }
  @media ${display.mobile} {
    width: 100%;
    margin: 1em 0 1em 0;
  }
`;

export { makeRaidFullName };
export default Character;
