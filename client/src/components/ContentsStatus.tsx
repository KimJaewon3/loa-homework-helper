import React, { forwardRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../redux/store';

const ContentsStatusDiv = styled.div`
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
      li {
        list-style: none;
      }
    }
  }
`;

const CharacterLi = styled.li<{ isDone: boolean}>`
  margin:  0 10px 0 10px;
  > span {
    color: ${(props) => props.isDone ? '#9f9f9f' : 'black'};
  }
`;

type ContentsFilter = {
  category: string;
  done: string[];
  total: string[];
}[];

const ContentsStatus = forwardRef<HTMLDivElement>(function ContentsStatus(props, ref) {
  const contents = useAppSelector(state => state.contentsReducer.contents);
  const [contentsFilter, setContentsFilter] = useState<ContentsFilter>();
  const [searchInputValue, setSearchInputValue] = useState('');

  useEffect(() => {
    const filtered: ContentsFilter = [];

    contents.map(info => {
      info.content.map(c => {
        const key = Object.keys(c)[0];
        const categoryIdx = filtered.findIndex(el => {
          return el.category === key;
        });

        if (categoryIdx !== -1) {
          if (c[key].isDone) {
            filtered[categoryIdx].done.push(info.name);
          }
          filtered[categoryIdx].total.push(info.name);
        } else {
          filtered.push({
            category: key,
            done: c[key].isDone ? [info.name] : [],
            total: [info.name],
          });
        }
      });
    });

    setContentsFilter(filtered);
  }, [contents]);

  function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInputValue(e.target.value);
  }

  return (
    <ContentsStatusDiv ref={ref}>
      <div className='contents-status-title-box'>
        <span>컨텐츠 현황</span>
        <span className='contents-status-noti'>* 해당 컨텐츠를 진행한 캐릭터는 흐리게 표시됩니다.</span>
      </div>
      <div className='contents-status-search-bar'>
        <input placeholder='컨텐츠 검색...' onChange={e=>handleSearchInput(e)}></input>
      </div>
      <div className='contents-status-characters-container'>
        {contentsFilter?.map((el, idx) => {
          if (searchInputValue !== '' && !el.category.includes(searchInputValue)) return;
          return (
            <div key={idx} className='contents-status-characters-box'>
              <div className='contents-status-characters-title'>
                <span>{el.category}</span>
              </div>
              <ul>
                {el.total.map((character, cidx) => {
                  return (
                    <CharacterLi isDone={el.done.includes(character)} key={cidx}>
                      <span>{character}</span>
                      {cidx !== el.total.length -1 && (
                        <span>,</span>
                      )}
                    </CharacterLi>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </ContentsStatusDiv>
  );
});

export default ContentsStatus;
