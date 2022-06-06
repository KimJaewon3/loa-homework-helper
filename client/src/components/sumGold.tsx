import React from 'react';
import { RaidList } from '../redux/slice/contentsSlice';

type SumGoldProps = {
  contents: RaidList;
}

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
    <div>
      <div>전체 골드: {allSum}</div>
      <div>획득 골드: {ingSum}</div>
    </div>
  )
}
