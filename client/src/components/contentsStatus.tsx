import React, { forwardRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ContentsState } from '../redux/slice/contentsSlice';
import { useAppSelector } from '../redux/store';

const ContentsStatusDiv = styled.div`
  background-color: white;
`;

const CharacterLi = styled.li<{ isDone: boolean}>`
  > span {
    color: ${(props) => props.isDone ? 'green' : 'black'};
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
      <span>컨텐츠 현황</span>
      <div>
        {contentsFilter?.map((el, idx) => {
          return (
            <div key={idx}>
              <span>{el.category}</span>
              <ul>
                {el.total.map((character, cidx) => {
                  return (
                    <CharacterLi isDone={el.done.includes(character)}>
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
