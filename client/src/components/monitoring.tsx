import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../redux/store';
import Status from './status';

const Monitor = styled.div`
  > * {
    margin: 30px;
  }
  > span {
    margin-left: 0;
    font-size: 30px;
    color: white;
  }
  .monitor-progress {
    display: flex;
    border: 2px solid #b5b2b2;
    border-radius: 10px;
    padding: 2em;
    flex-wrap: wrap;
    background-color: rgb(240, 248, 255, 0.8);
    > div {
      margin: 10px 20px 10px 20px;
      display: flex;
      flex-direction: column;
      > span {
      font-size: 20px;
      text-align: center;
      }
    }
  }
`;


export default function Monitoring() {
  const [ percentArr, setPersentArr ] = useState<{ name: string, percent: number }[]>([]);
  const contents = useAppSelector((state => state.contentsReducer.contents));

  useEffect(() => {
    setPersentArr(() => {
      return contents.map(character => {
        let percent = 100;
        if (character.content.length > 0) {
          const done = character.content.filter(el => {
            const key = Object.keys(el)[0];
            return el[key];
          }).length;
          percent = done / character.content.length * 100;
        }
        return { 
          name: character.name,
          percent,
        };
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
                100
              ) : (
                (percentArr.reduce((acc, el) => acc += el.percent, 0)) / percentArr.length
              )
            }
            overall={true}
          ></Status>
          <span>전체</span>
        </div>

        {percentArr.map((el, idx) => {
          return (
            <div key={idx}>
              <Status percent={el.percent} overall={false}></Status>
              <span>{el.name}</span>
            </div>
          )
        })}
      </div>
    </Monitor>
  )
}
