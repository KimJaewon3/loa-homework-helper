import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../redux/store';
import Status from './status';

const Monitor = styled.div`
  > * {
    margin: 30px;
  }
  > span {
    font-size: 30px;
  }
  .monitor-progress {
    display: flex;
  }
`;


export default function Monitoring() {
  const [ percentArr, setPersentArr ] = useState<{ name: string, percent: number }[]>([]);
  const contents = useAppSelector((state => state.contentsReducer.contents));

  useEffect(() => {
    setPersentArr(() => {
      return contents.map(character => {
        const done = character.content.filter(el => {
          const key = Object.keys(el)[0];
          return el[key];
        });
        const percent = done.length / character.content.length * 100;
        return { name: character.name, percent };
      });
    })
  }, [contents]);

  return (
    <Monitor>
      <span>전체 현황</span>

      <div className='monitor-progress'>
        <div>
          <Status 
            percent={
              percentArr.length === 0 ? (
                0
              ) : (
                (percentArr.reduce((acc, el) => acc += el.percent, 0)) / percentArr.length
              )
            }
          ></Status>
          <span>전체</span>
        </div>

        {percentArr.map((el, idx) => {
          return (
            <div key={idx}>
              <Status percent={el.percent}></Status>
              <span>{el.name}</span>
            </div>
          )
        })}
      </div>
    </Monitor>
  )
}
