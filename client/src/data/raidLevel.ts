const dummy = [
  { '오레하': 1325 },
  { '아르고스': 1370 },
  { '[노말]발탄': 1415 },
  { '[노말]비아': 1430 },
  { '[하드]발탄': 1445 },
  { '[하드]비아': 1460 },
  { '[노말]쿠크': 1475 },
  { '[노말]아브12': 1490 },
  { '[노말]아브34': 1500 },
  { '[노말]아브56': 1520 },
  { '[하드]아브12': 1540 },
  { '[하드]아브34': 1550 },
  { '[하드]아브56': 1560 },
  { '[노말]카양겔': 1475 },
  { '[하드1]카양겔': 1520 },
  { '[하드2]카양겔': 1560 },
  { '[하드3]카양겔': 1580 },
];

type RaidLevel = {
  [key: string]: number | {
    [key: string]: number
  }
}[];

export const raidLevel: RaidLevel = [
  { 
    '오레하': 1325
  },
  {
    '아르고스': 1370
  },
  { 
    '발탄': {
      '노말': 1415,
      '하드': 1445,
    }
  },
  {
    '비아': {
      '노말': 1430,
      '하드': 1460, 
    }
  },
  {
    '쿠크': 1475
  },
  {
    '아브12': {
      '노말': 1490,
      '하드': 1540,
    }
  },
  {
    '아브34': {
      '노말': 1500,
      '하드': 1550,
    }
  },
  {
    '아브56': {
      '노말': 1520,
      '하드': 1560,
    }
  },
  {
    '카양겔': {
      '노말': 1475,
      '하드1': 1520,
      '하드2': 1560,
      '하드3': 1580
    }
  }
]