import { useState } from "react";
import { RiQuestionFill } from "react-icons/ri";
import DescWindow from "../../modals/descWindow";
import { addCharacter } from "../../redux/slice/FcharacterSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Character } from "./FCharacter";

const CharacterStatus = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(
    (state) => state.characterReducer.characters
  );
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const [isAddCharacterOpen, setIsAddCharacterOpen] = useState(false);
  const [addCharacterInput, setAddCharacterInput] = useState({
    name: "",
    level: "",
  });
  const [addCharacterAlert, setAddCharacterAlert] = useState("");

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 12) return;
    setAddCharacterAlert("");
    setAddCharacterInput({
      ...addCharacterInput,
      [e.target.name]: e.target.value,
    });
  };

  const submitAddCharacter = () => {
    const { name, level } = addCharacterInput;
    if (level.length === 0 || name.length === 0) {
      setAddCharacterAlert("캐릭터명 또는 레벨을 입력해주세요");
      return;
    }
    if (characters.filter((ch) => ch.name === name).length !== 0) {
      setAddCharacterAlert("이미 존재하는 캐릭터입니다");
      return;
    }
    dispatch(addCharacter({ name, level: Number(level) }));
    setAddCharacterInput({
      name: "",
      level: "",
    });
  };

  return (
    <div>
      <div className="title">
        <h2>캐릭터 현황</h2>
        <RiQuestionFill
          size={18}
          onMouseEnter={() => setIsInfoWindowOpen(true)}
          onMouseLeave={() => setIsInfoWindowOpen(false)}
        />
        {isInfoWindowOpen && <DescWindow />}
      </div>

      <div className="add-character">
        <button onClick={() => setIsAddCharacterOpen(true)}>
          + 캐릭터 추가하기
        </button>
        {isAddCharacterOpen && (
          <div>
            <div>
              <input
                name="name"
                placeholder="캐릭터명"
                onChange={(e) => handleInputValue(e)}
              />
              <input
                name="level"
                type="number"
                placeholder="레벨"
                onChange={(e) => handleInputValue(e)}
              />
              <button onClick={submitAddCharacter}>추가하기</button>
            </div>
            {addCharacterAlert && <div>{addCharacterAlert}</div>}
          </div>
        )}
      </div>

      {characters.map((character, characterIdx) => (
        <Character
          character={character}
          characterIdx={characterIdx}
          key={character.name}
        />
      ))}
    </div>
  );
};

export { CharacterStatus };
