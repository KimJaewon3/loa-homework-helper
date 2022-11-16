import { useState } from "react";
import styled from "styled-components";
import { addCharacter } from "../../redux/slice/characterSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const AddCharacter = () => {
  const dispatch = useAppDispatch();
  const { characters } = useAppSelector((state) => state.characterReducer);
  const [isAddCharacterOpen, setIsAddCharacterOpen] = useState(false);
  const [addCharacterAlert, setAddCharacterAlert] = useState("");
  const [addCharacterInput, setAddCharacterInput] = useState({
    name: "",
    level: "",
  });

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 12) return;
    setAddCharacterAlert("");
    setAddCharacterInput({
      ...addCharacterInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddBtn = () => {
    setIsAddCharacterOpen(!isAddCharacterOpen);
    setAddCharacterAlert("");
    setAddCharacterInput({
      name: "",
      level: "",
    });
  };

  const submitAddCharacter = () => {
    const { name, level } = addCharacterInput;
    if (level.length === 0 || name.length === 0) {
      setAddCharacterAlert(" * 캐릭터명 또는 레벨을 입력해주세요 * ");
      return;
    }
    if (characters.filter((ch) => ch.name === name).length !== 0) {
      setAddCharacterAlert(" * 이미 존재하는 캐릭터입니다 * ");
      return;
    }
    dispatch(addCharacter({ name, level: Number(level) }));
    setAddCharacterInput({
      name: "",
      level: "",
    });
  };

  return (
    <AddCharacterContainer>
      <button onClick={handleAddBtn}>+ 캐릭터 추가하기</button>
      {addCharacterAlert && (
        <span className="character-add-alert">{addCharacterAlert}</span>
      )}
      {isAddCharacterOpen && (
        <div>
          <div className="character-add-input-box">
            <input
              name="name"
              placeholder="캐릭터명"
              onChange={(e) => handleInputValue(e)}
              value={addCharacterInput.name}
            />
            <input
              name="level"
              type="number"
              placeholder="레벨"
              onChange={(e) => handleInputValue(e)}
              value={addCharacterInput.level}
            />
            <button onClick={submitAddCharacter}>추가하기</button>
          </div>
        </div>
      )}
    </AddCharacterContainer>
  );
};

const AddCharacterContainer = styled.div`
  button {
    border-radius: 5px;
    border: none;
    padding: 5px;
  }
  .character-add-alert {
    color: ${({ theme }) => theme.color.fontColor};
  }
  .character-add-input-box {
    display: flex;
    align-items: center;
    > * {
      margin: 10px 10px 0 0;
    }
    input {
      height: 24px;
    }
    button {
      height: 30px;
    }
  }
`;

export default AddCharacter;
