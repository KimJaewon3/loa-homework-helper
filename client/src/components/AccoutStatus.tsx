import { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import {
  addAccount,
  updateCharacterAccount,
} from "../redux/slice/accountSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { display } from "../style/display";
import AccountList from "./account/accountList";

import type { AccountItem, AccountType } from "../redux/slice/accountSlice";

export const sumGold = (item: AccountItem[]) => {
  return item.reduce((acc, el) => {
    return acc + el.gold;
  }, 0);
};

export const InputTypes = ["deposit", "withdraw"] as const;

type InputType<T extends typeof InputTypes[number]> = {
  [key in T]: {
    history: "";
    gold: "";
  };
};

const AccountStatus = forwardRef<HTMLDivElement>((props, ref) => {
  const dispatch = useAppDispatch();
  const { characters } = useAppSelector((state) => state.characterReducer);
  const { accountList } = useAppSelector((state) => state.accountReducer);
  const [inputValue, setInputValue] = useState<
    InputType<typeof InputTypes[number]>
  >({
    deposit: {
      history: "",
      gold: "",
    },
    withdraw: {
      history: "",
      gold: "",
    },
  });

  useEffect(() => {
    const characterAccount = characters.map((ch) => {
      const gold = ch.contents.reduce((acc, c) => {
        if (ch.isLimitedSixTime && c.isDone) {
          acc += c.raidData.reward;
        }
        return acc;
      }, 0);
      return {
        history: ch.name,
        gold: ch.isLimitedSixTime ? gold : 0,
        accountType: "character" as AccountType,
      };
    });
    dispatch(updateCharacterAccount(characterAccount));
  }, [characters]);

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [type, name] = e.target.name.split("_") as [
      typeof InputTypes[number],
      string
    ];
    setInputValue({
      ...inputValue,
      [type]: {
        ...inputValue[type],
        [name]: e.target.value,
      },
    });
  };

  const handleAddAccountList = (type: typeof InputTypes[number]) => {
    const { history, gold } = inputValue[type];
    const accGold = type === "deposit" ? Number(gold) : Number(gold) * -1;
    dispatch(
      addAccount({
        history,
        gold: accGold,
        accountType: "etc",
      })
    );
    setInputValue({
      ...inputValue,
      [type]: {
        history: "",
        gold: "",
      },
    });
  };

  return (
    <AccountContainer ref={ref}>
      <span className="account-title">골드 현황</span>

      <div className="account-box">
        <AccountList type="characters" />
        <AccountList type="etc" />

        <div className="account-total">
          <span>전체 합계: </span>
          <span>
            {sumGold(accountList.characters) + sumGold(accountList.etc)}
          </span>
        </div>

        {InputTypes.map((type) => (
          <div key={type}>
            <div className="account-input-box">
              <span>{type === "deposit" ? "입금 :" : "출금 :"}</span>
              <input
                name={`${type}_history`}
                type="text"
                placeholder="항목"
                onChange={(e) => handleInputValue(e)}
                value={inputValue[type].history}
              />
              <input
                name={`${type}_gold`}
                type="number"
                placeholder="금액"
                onChange={(e) => handleInputValue(e)}
                value={inputValue[type].gold}
              />
              <div className="account-btn-box">
                <button onClick={() => handleAddAccountList(type)}>확인</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AccountContainer>
  );
});

const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    margin: 1em;
  }
  .account-title {
    font-size: 1.5em;
    color: ${({ theme }) => theme.color.fontColor};
    margin-left: 0;
  }
  .account-box {
    width: fit-content;
    background-color: rgb(240, 248, 255, 0.8);
    border: 2px solid ${({ theme }) => theme.color.borderColor};
    border-radius: 10px;
    padding: 0.5em;
    > * {
      padding: 0.5em;
    }
    .account-total {
      font-size: 1.1em;
      font-weight: bold;
      text-align: right;
    }
    .account-input-box {
      display: flex;
    }
  }
  @media ${display.desktop} {
    .account-input-box {
      align-items: center;
      input {
        height: 20px;
        margin: 0 10px 0 10px;
      }
      button {
        height: 26px;
      }
    }
  }
  @media ${display.mobile} {
    > * {
      margin: 1em 0 1em 0;
    }
    .account-box {
      width: auto;
    }
    .account-input-box {
      flex-direction: column;
      align-items: flex-start;
      input {
        margin-top: 5px;
      }
      .account-btn-box {
        display: flex;
        justify-content: end;
        width: 100%;
      }
    }
  }
`;

export default AccountStatus;
