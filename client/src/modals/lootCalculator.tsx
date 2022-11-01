import React, { useEffect, useState } from "react";
import styled from "styled-components";

const LootCalculatorDiv = styled.div`
  .loot-calculator-modal-back {
    position: fixed;
    background-color: #000000;
    opacity: 0.7;
    width: 100%;
    height: 100%;
    z-index: 10;
    top: 0;
    left: 0;
  }
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
    .loot-calculator-people-container {
      > label {
        margin-right: 1em;
      }
    }
  }
  .loot-calculator-input {
    border: 3px solid green;
  }
  .loot-calculator-input:focus {
    outline: none;
  }
  .input-is-not-number {
    border: 3px solid red;
  }
`;

type Props = {
  handleLootCalculatorBtnClick: () => void;
};

export default function LootCalculator({
  handleLootCalculatorBtnClick,
}: Props) {
  const people = [4, 8];
  const [selectValue, setSelectValue] = useState(4); // 분배인원
  const [inputValue, setInputValue] = useState("0"); // 입찰금액
  const [maximumAccount, setMaximumAccount] = useState(0); // 최대적정금액
  const [isNumber, setIsNumber] = useState(true);

  useEffect(() => {
    if (/^[0-9]+$/.test(inputValue) || inputValue === "") {
      setIsNumber(true);
      runCalculator(Number(inputValue), selectValue);
    } else {
      setIsNumber(false);
    }
  }, [selectValue, inputValue]);

  function runCalculator(money: number, count: number) {
    const account = Math.floor((money * 0.95 * (count - 1)) / count);
    setMaximumAccount(account);
  }

  function handleRadioValue(targetValue: number) {
    setSelectValue(targetValue);
  }

  function handleInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  return (
    <LootCalculatorDiv>
      <div className="loot-calculator-modal">
        <div>* 입찰 계산기 *</div>
        <div className="loot-calculator-people-container">
          {people.map((el, idx) => {
            return (
              <label key={idx}>
                {el}인
                <input
                  type="radio"
                  name="people"
                  checked={el === selectValue}
                  onChange={() => handleRadioValue(el)}
                />
              </label>
            );
          })}
        </div>
        <input
          onChange={(e) => handleInputValue(e)}
          className={`${
            !isNumber ? "input-is-not-number" : ""
          } loot-calculator-input`}
        ></input>
        <div>공평분배 : {maximumAccount} 원</div>
        <div>극한이득 : {Math.floor(maximumAccount / 1.1)} 원</div>
      </div>
      <div
        className="loot-calculator-modal-back"
        onClick={() => handleLootCalculatorBtnClick()}
      ></div>
    </LootCalculatorDiv>
  );
}
