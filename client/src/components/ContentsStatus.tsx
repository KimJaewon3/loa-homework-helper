import React, { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../redux/store";
import { makeRaidFullName } from "./characters/Character";

type ContentsFilter = {
  raidName: string;
  characters: {
    name: string;
    isDone: boolean;
  }[];
};

const ContentsStatus = forwardRef<HTMLDivElement>((props, ref) => {
  const { characters } = useAppSelector((state) => state.characterReducer);
  const [contentsFilter, setContentsFilter] = useState<ContentsFilter[]>([]);
  const [searchInputValue, setSearchInputValue] = useState("");

  useEffect(() => {
    const filtered: ContentsFilter[] = [];

    characters.forEach((ch) => {
      ch.contents.forEach((c) => {
        const fullName = makeRaidFullName(c);
        const info = {
          name: ch.name,
          isDone: c.isDone,
        };
        let raidIdx = filtered.findIndex((el) => el.raidName === fullName);

        if (raidIdx === -1) {
          filtered.push({
            raidName: fullName,
            characters: [{ ...info }],
          });
        } else {
          filtered[raidIdx].characters.push({ ...info });
        }
      });
    });

    setContentsFilter(filtered);
  }, [characters]);

  return (
    <ContentsStatusContainer ref={ref}>
      <div className="contents-status-title-box">
        <span>컨텐츠 현황</span>
        <span className="contents-status-noti">
          * 해당 컨텐츠를 진행한 캐릭터는 흐리게 표시됩니다.
        </span>
      </div>
      <div className="contents-status-search-bar">
        <input
          placeholder="컨텐츠 검색..."
          onChange={(e) => setSearchInputValue(e.target.value)}
        />
      </div>
      <div className="contents-status-characters-container">
        {contentsFilter
          .filter((c) => {
            if (searchInputValue === "") {
              return true;
            } else {
              return c.raidName.includes(searchInputValue);
            }
          })
          .map((c) => (
            <div className="contents-status-characters-box" key={c.raidName}>
              <div className="contents-status-characters-title">
                <div>{c.raidName}</div>
              </div>
              <ul>
                {c.characters.map((ch) => (
                  <CharacterLi key={ch.name} isDone={ch.isDone}>
                    <span>{ch.name}</span>
                  </CharacterLi>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </ContentsStatusContainer>
  );
});

const ContentsStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    margin: 1em;
  }
  .contents-status-title-box {
    display: flex;
    align-items: center;
    font-size: 1.5em;
    color: ${({ theme }) => theme.color.fontColor};
    margin-left: 0;
    .contents-status-noti {
      font-size: 0.5em;
      margin-left: 1em;
    }
  }
  .contents-status-search-bar {
    > input {
      padding: 5px;
      margin-left: 0.5em;
    }
  }
  .contents-status-characters-container {
    border-radius: 10px;
    padding: 0.5em;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    .contents-status-characters-box {
      display: flex;
      border: 2px solid ${({ theme }) => theme.color.borderColor};
      border-radius: 10px;
      background-color: rgb(240, 248, 255, 0.8);
      margin: 0 1em 1em 0;
      > * {
        padding: 0.5em;
      }
      .contents-status-characters-title {
        border-right: 2px solid ${({ theme }) => theme.color.borderColor};
        background-color: ${({ theme }) => theme.color.titleColor};
        border-radius: 7px 0px 0 7px;
        display: flex;
        align-items: center;
      }
      ul {
        padding: 0;
        display: flex;
        align-items: center;
        margin: 5px 0 5px 0;
      }
    }
  }
`;

const CharacterLi = styled.li<{ isDone: boolean }>`
  margin: 0 10px 0 10px;
  list-style: none;
  > span {
    color: ${(props) => (props.isDone ? "#9f9f9f" : "black")};
  }
`;

export default ContentsStatus;
