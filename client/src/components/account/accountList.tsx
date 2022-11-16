import { useMemo } from "react";
import { BsX } from "react-icons/bs";
import styled from "styled-components";
import {
  AccountType,
  deleteAccount,
  initAccountEtc,
} from "../../redux/slice/accountSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { sumGold } from "../AccoutStatus";

type Props = {
  type: AccountType;
};

const AccountList = ({ type }: Props) => {
  const dispatch = useAppDispatch();
  const { accountList } = useAppSelector((state) => state.accountReducer);
  const { characters } = useAppSelector((state) => state.characterReducer);

  const deleteAccountEtc = (idx: number) => {
    dispatch(deleteAccount({ accountType: "etc", idx }));
  };

  const allSumCharactersGold = useMemo(() => {
    return characters.reduce((allSum, ch) => {
      if (!ch.isLimitedSixTime) {
        return allSum;
      }
      return (allSum += ch.contents.reduce((acc, c) => {
        return (acc += c.raidData.reward);
      }, 0));
    }, 0);
  }, [characters]);

  return (
    <AccountListContainer>
      <div>
        {type === "characters" ? (
          <div className="account-list-title">
            <span>캐릭터</span>
          </div>
        ) : (
          <div className="account-list-title">
            <span>추가사항 (더보기, 기타획득골드 등)</span>
            <button onClick={() => dispatch(initAccountEtc())}>초기화</button>
          </div>
        )}
      </div>

      <ul>
        {accountList[type].map((el, idx) => (
          <li key={idx}>
            <div className="account-list-history">
              {type === "etc" && (
                <BsX
                  size={20}
                  color="#bf0d0d"
                  onClick={() => deleteAccountEtc(idx)}
                />
              )}
              <div>{el.history}</div>
            </div>
            <div>{el.gold}</div>
          </li>
        ))}
      </ul>

      <div className="account-list-sum">
        {type === "characters" && (
          <div>
            <span>{`예상 총합: ${allSumCharactersGold}`}</span>
          </div>
        )}
        <div>
          <span>합계: </span>
          <span>{sumGold(accountList[type])}</span>
        </div>
      </div>
    </AccountListContainer>
  );
};

const AccountListContainer = styled.div`
  position: relative;
  > ul {
    border: 3px solid black;
    padding: 2em 1em;
    > li {
      display: flex;
      margin: 10px 0 10px 0;
      justify-content: space-between;
      border-bottom: 1px solid gray;
      .account-list-history {
        display: flex;
        margin-right: 1em;
      }
    }
  }
  .account-list-title {
    background-color: ${({ theme }) => theme.color.goldBoxTitleColor};
    position: absolute;
    left: 1em;
    top: 0.5em;
    padding: 5px 1em;
    font-size: 1.1em;
    font-weight: bold;
    border-radius: 5px;
    > button {
      margin-left: 1em;
      border: none;
      border-radius: 10px;
      background-color: #acacac;
    }
  }
  .account-list-sum > div {
    display: flex;
    justify-content: space-between;
    margin: 0 1em 0 0;
  }
`;

export default AccountList;
