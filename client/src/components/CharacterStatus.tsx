import { forwardRef, useRef, useState } from "react";
import { RiQuestionFill } from "react-icons/ri";
import styled from "styled-components";
import DescWindow from "../modals/descWindow";
import { ReorderCharacter } from "../redux/slice/FcharacterSlice";
import { useAppSelector } from "../redux/store";
import AddCharacter from "./characters/AddCharacter";
import Character from "./characters/Character";

export interface CharacterDragInfo extends ReorderCharacter {
  isDragging: boolean;
}

const CharacterStatus = forwardRef<HTMLDivElement>((props, ref) => {
  const { characters } = useAppSelector((state) => state.characterReducer);
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const charactersRef = useRef<HTMLDivElement[]>([]);
  const [characterDragInfo, setCharacterDragInfo] = useState<CharacterDragInfo>(
    {
      isDragging: false,
      fromIdx: 0,
      toIdx: 0,
      move: "before",
    }
  );

  return (
    <CharacterStatusContainer ref={ref}>
      <div className="character-title">
        <span>캐릭터 현황</span>
        <RiQuestionFill
          size={18}
          onMouseEnter={() => setIsInfoWindowOpen(true)}
          onMouseLeave={() => setIsInfoWindowOpen(false)}
        />
        {isInfoWindowOpen && <DescWindow />}
      </div>

      <AddCharacter />

      <ul>
        {characters.map((character, characterIdx) => (
          <Character
            character={character}
            characterIdx={characterIdx}
            key={character.name}
            charactersRef={charactersRef}
            characterDragInfo={characterDragInfo}
            setCharacterDragInfo={setCharacterDragInfo}
          />
        ))}
      </ul>
    </CharacterStatusContainer>
  );
});

const CharacterStatusContainer = styled.div`
  > * {
    margin: 1em;
  }
  .character-title {
    font-size: 1.5em;
    color: ${({ theme }) => theme.color.fontColor};
    margin-left: 0;
    display: flex;
    align-items: baseline;
    > span {
      margin-right: 0.5em;
    }
  }
  > ul {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
  }
`;

export default CharacterStatus;
