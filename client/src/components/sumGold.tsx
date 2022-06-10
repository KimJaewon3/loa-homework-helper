import React from 'react';
import { RaidList } from '../redux/slice/contentsSlice';
import { GrMoney } from "react-icons/gr";
import styled from 'styled-components';

type SumGoldProps = {
  contents: RaidList;
}

const SumGoldDiv = styled.div`
  .sum-gold-notice {
    font-size: 0.7em;
    opacity: 0.7;
  }
`

export default function SumGold({ contents }: SumGoldProps) {
  let allSum = 0;
  let ingSum = 0;
  contents.forEach(el => {
    const key = Object.keys(el)[0];
    allSum += el[key].rewardGold;
    if (el[key].isDone) {
      ingSum += el[key].rewardGold;
    }
  });

  return (
    <SumGoldDiv>
      <div className='sum-gold-notice'>
        <span>* </span>
        <GrMoney size={13}/>
        <span>를 클릭해 골드를 변경할 수 있습니다.</span>
      </div>
      <div>전체 골드: {allSum}</div>
      <div>획득 골드: {ingSum}</div>
    </SumGoldDiv>
  )
}
