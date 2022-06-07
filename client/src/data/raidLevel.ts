export type RaidInfo = {
  leastLevel: number;
  maximumLevel?: number;
  reward: number;
}

type RaidLevel = {
  [key: string]: RaidInfo | {
    [key: string]: RaidInfo;
  }[];
}[];

export const raidLevel: RaidLevel = [
  { 
    '오레하': { 
      leastLevel: 1325,
      maximumLevel: 1415,
      reward: 1300,
    }
  },
  {
    '아르고스': {
      leastLevel: 1370,
      maximumLevel: 1475,
      reward: 1600,
    }
  },
  { 
    '발탄': [
      {
        '노말': {
          leastLevel: 1415,
          reward: 2500,
        }
      },
      {
        '하드': {
          leastLevel: 1445,
          reward: 4500,
        }
      },
    ]
  },
  {
    '비아': [
      {
        '노말': {
          leastLevel: 1430,
          reward: 2500,
        },
      },
      {
        '하드': {
          leastLevel: 1460,
          reward: 4500,
        }
      },
    ]
  },
  {
    '쿠크': {
      leastLevel: 1475,
      reward: 4500,
    }
  },
  {
    '아브12': [
      {
        '노말': {
          leastLevel: 1490,
          reward: 4500,
        },
      },
      {
        '하드': {
          leastLevel: 1540,
          reward: 5500,
        }
      }
    ]
  },
  {
    '아브34': [
      {
        '노말': {
          leastLevel: 1500,
          reward: 1500,
        },
      },
      {
        '하드': {
          leastLevel: 1550,
          reward: 2000,
        }
      }
    ]
  },
  {
    '아브56': [
      {
        '노말': {
          leastLevel: 1490,
          reward: 2500,
        },
      },
      {
        '하드': {
          leastLevel: 1560,
          reward: 3000,
        }
      }
    ]
  },
  {
    '카양겔': [
      {
        '노말': {
          leastLevel: 1475,
          reward: 0,
        },
      },
      {
        '하드1': {
          leastLevel: 1520,
          reward: 0,
        },
      },
      {
        '하드2': {
          leastLevel: 1560,
          reward: 0,
        },
      },
      {
        '하드3': {
          leastLevel: 1580,
          reward: 0,
        }
      }
    ]
  }
]