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
  const [ percentArr, setPersentArr ] = useState<number[]>([]);
  const contents = useAppSelector((state => state.contentsReducer.contents));

  useEffect(() => {
    setPersentArr(contents.map(character => {
      const contents = Object.entries(character.content);
      const done = contents.filter(content => content[1]).length;
      const percent = done / contents.length * 100;
      return percent;
    }))
  }, [contents]);

  return (
    <Monitor>
      <span>전체 현황</span>

      <div className='monitor-progress'>
        <div>
          <Status percent={(percentArr.reduce((acc, percent) => acc += percent, 0)) / percentArr.length}></Status>
          <span>전체</span>
        </div>

        {percentArr.map((percent, idx) => {
          return (
            <div key={idx}>
              <Status percent={percent}></Status>
              <span>{contents[idx].name}</span>
            </div>
          )
        })}
      </div>
    </Monitor>
  )
}
