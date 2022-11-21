import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ModalBack } from "../style/styled";

type Props = {
  setIsLootCalculatorOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LootCalculator = ({ setIsLootCalculatorOpen }: Props) => {
  const people = [4, 8];
  const [peopleSelect, setPeopleSelect] = useState(4); // 분배인원
  const [accountInput, setAccountInput] = useState("0"); // 입찰금액
  const [maximumAccount, setMaximumAccount] = useState(0); // 최대적정금액
  const [isNumber, setIsNumber] = useState(true);

  useEffect(() => {
    if (/^[0-9]+$/.test(accountInput) || accountInput === "") {
      setIsNumber(true);
      runCalculator(Number(accountInput), peopleSelect);
    } else {
      setIsNumber(false);
    }
  }, [peopleSelect, accountInput]);

  const runCalculator = (money: number, count: number) => {
    const account = Math.floor((money * 0.95 * (count - 1)) / count);
    setMaximumAccount(account);
  };

  const handleRadioValue = (targetValue: number) => {
    setPeopleSelect(targetValue);
  };

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountInput(e.target.value);
  };

  return (
    <LootCalculatorContainer>
      <div className="loot-calculator-modal">
        <div>* 입찰 계산기 *</div>
        <div className="loot-calculator-select-box">
          {people.map((person, idx) => (
            <label key={idx}>
              {person}인
              <input
                type="radio"
                name="people"
                checked={person === peopleSelect}
                onChange={() => handleRadioValue(person)}
              />
            </label>
          ))}
        </div>
        <input
          onChange={(e) => handleInputValue(e)}
          className={`${
            !isNumber ? "is-not-number" : ""
          } loot-calculator-account-input`}
        ></input>
        <div>공평분배 : {maximumAccount} 원</div>
        <div>극한이득 : {Math.floor(maximumAccount / 1.1)} 원</div>
      </div>
      <ModalBack onClick={() => setIsLootCalculatorOpen(false)} />
    </LootCalculatorContainer>
  );
};

const LootCalculatorContainer = styled.div`
  .loot-calculator-modal {
    position: fixed;
    background-color: ${({ theme }) => theme.color.titleColor};
    display: flex;
    flex-direction: column;
    z-index: 11;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    padding: 1em;
    > * {
      margin: 10px 0;
    }
    .loot-calculator-select-box {
      > label {
        margin-right: 1em;
      }
    }
  }
  .loot-calculator-account-input {
    border: 3px solid green;
  }
  .loot-calculator-account-input:focus {
    outline: none;
  }
  .is-not-number {
    border: 3px solid red;
  }
`;

export default LootCalculator;
