export type RaidData = {
  difficulty?: string;
  minLevel: number;
  maxLevel?: number;
  reward: number;
};

export type RaidInfo = {
  raidName: string;
  info: RaidData[];
};

export const raidInfos: RaidInfo[] = [
  {
    raidName: "오레하",
    info: [
      {
        minLevel: 1325,
        maxLevel: 1415,
        reward: 1300,
      },
    ],
  },
  {
    raidName: "아르고스",
    info: [
      {
        minLevel: 1370,
        maxLevel: 1475,
        reward: 1600,
      },
    ],
  },
  {
    raidName: "발탄",
    info: [
      {
        difficulty: "노말",
        minLevel: 1415,
        reward: 2500,
      },
      {
        difficulty: "하드",
        minLevel: 1445,
        reward: 4500,
      },
    ],
  },
  {
    raidName: "비아",
    info: [
      {
        difficulty: "노말",
        minLevel: 1430,
        reward: 2500,
      },
      {
        difficulty: "하드",
        minLevel: 1460,
        reward: 4500,
      },
    ],
  },
  {
    raidName: "쿠크",
    info: [
      {
        difficulty: "",
        minLevel: 1475,
        reward: 4500,
      },
    ],
  },
  {
    raidName: "아브12",
    info: [
      {
        difficulty: "노말",
        minLevel: 1490,
        reward: 4500,
      },
      {
        difficulty: "하드",
        minLevel: 1540,
        reward: 5500,
      },
    ],
  },
  {
    raidName: "아브34",
    info: [
      {
        difficulty: "노말",
        minLevel: 1500,
        reward: 1500,
      },
      {
        difficulty: "하드",
        minLevel: 1550,
        reward: 2000,
      },
    ],
  },
  {
    raidName: "아브56",
    info: [
      {
        difficulty: "노말",
        minLevel: 1520,
        reward: 2500,
      },
      {
        difficulty: "하드",
        minLevel: 1560,
        reward: 3000,
      },
    ],
  },
  {
    raidName: "일리아칸",
    info: [
      {
        difficulty: "노말",
        minLevel: 1580,
        reward: 5500,
      },
      {
        difficulty: "하드",
        minLevel: 1600,
        reward: 6500,
      },
    ],
  },
  {
    raidName: "카양겔",
    info: [
      {
        difficulty: "노말",
        minLevel: 1475,
        reward: 0,
      },
      {
        difficulty: "하드1",
        minLevel: 1520,
        reward: 0,
      },
      {
        difficulty: "하드2",
        minLevel: 1560,
        reward: 0,
      },
      {
        difficulty: "하드3",
        minLevel: 1580,
        reward: 0,
      },
    ],
  },
];
