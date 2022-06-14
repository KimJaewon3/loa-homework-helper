import React, { forwardRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../redux/store';

const ContentsStatusDiv = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    margin: 1em;
  }
  .contents-status-title {
    font-size: 1.5em;
    color: white;
    margin-left: 0;
  }
  .contents-status-characters-container {
    border-radius: 10px;
    padding: 0.5em;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    .contents-status-characters-box {
      border: 2px solid #ffffff;
      border-radius: 10px;
      background-color: rgb(240, 248, 255, 0.8);
      margin: 0 1em 1em 0;
      > * {
        padding: 0.5em;
      }
      .contents-status-characters-title {
        border-bottom: 2px solid #ffffff;
        background-color: rgb(108 184 86);
        border-radius: 10px 10px 0 0;
        > span {
          font-weight: bold;
        }
      }
      ul {
        padding: 0;
      }
      li {
        list-style: none;
      }
    }
  }
`;

const CharacterLi = styled.li<{ isDone: boolean}>`
  > span {
    color: ${(props) => props.isDone ? '#21aa21' : 'black'};
    padding: 0.5em;
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

  return (
    <ContentsStatusDiv ref={ref}>
      <span className='contents-status-title'>컨텐츠 현황</span>
      <div className='contents-status-characters-container'>
        {contentsFilter?.map((el, idx) => {
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
