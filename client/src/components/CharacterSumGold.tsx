import React from 'react';
import { RaidList } from '../redux/slice/contentsSlice';
import { GrMoney } from "react-icons/gr";
import styled from 'styled-components';

type SumGoldProps = {
  contents: RaidList;
}

const SumGoldDiv = styled.div`
  > * {
    margin-left: 5px;
  }
`;

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
      <div>전체 골드: {allSum}</div>
      <div>획득 골드: {ingSum}</div>
    </SumGoldDiv>
  )
}
