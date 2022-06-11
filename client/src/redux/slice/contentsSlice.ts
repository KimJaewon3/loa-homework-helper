import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { raidLevel } from '../../data/raidLevel';
import { RootState } from '../store';

export type RaidList = {
  [key: string]: {
    isDone: boolean;
    rewardGold: number;
  }
}[];

export interface ContentsState {
  contents: {
    name: string;
    abledReward: boolean;
    content: RaidList;
  }[];
}

const initialState: ContentsState = {
  contents: [],
};

type UpdateContents = {
  characterIdx: number;
  raidIdx: number;
  check: boolean;
};

type AddCharacter = {
  name: string;
  level: number;
}

type AddList = {
  characterIdx: number;
  raidName: string;
}

type DeleteCharacter = {
  idx: number;
}

type DeleteList = {
  characterIdx: number;
  raidIdx: number;
}

type UpdateRewardGold = {
  characterIdx: number;
  raidIdx: number;
  gold: number;
}

type UpdateSixTimesLimit = {
  characterIdx: number;
}

export const contentsSlice = createSlice({
  name: 'contents',
  initialState,
  reducers: {
    updateContent: (state, action: PayloadAction<UpdateContents>) => {
      const sliced = state.contents.slice();
      const target = sliced[action.payload.characterIdx].content[action.payload.raidIdx];
      const key = Object.keys(target)[0];
      target[key].isDone = action.payload.check;
      state.contents = sliced;
    },
    addCharacter: (state, action: PayloadAction<AddCharacter>) => {
      const sliced = state.contents.slice();
      const abledRaid: RaidList = [];
      const abledRewardCnt = state.contents.filter(el => {
        return el.abledReward;
      }).length;

      raidLevel.map(el => {
        const [raidName, raidInfo] = Object.entries(el)[0];

        if (!Array.isArray(raidInfo)) {
          if (raidInfo.leastLevel <= action.payload.level) {
            let goldReward = raidInfo.reward;
            if (raidInfo.maximumLevel) {
              goldReward = raidInfo.maximumLevel <= action.payload.level ? 0 : raidInfo.reward;
            }

            abledRaid.push({
              [raidName]: {
                isDone: false,
                rewardGold: goldReward,
              }
            });
          }
        } else {
          const result: {
            difficulty: string;
            leastLevel: number;
            rewardGold: number;
          } = {
            difficulty: '',
            leastLevel: 0,
            rewardGold: 0,
          };

          raidInfo.map(el => {
            const [difficulty, info] = Object.entries(el)[0];
            if (action.payload.level >= info.leastLevel) {
              if (info.leastLevel > result.leastLevel) {
                result.leastLevel = info.leastLevel;
                result.difficulty = difficulty;
                result.rewardGold = info.reward;
              }
            }
          });

          if (result.difficulty !== '') {
            abledRaid.push({
              [`[${result.difficulty}]${raidName}`]: {
                isDone: false,
                rewardGold: result.rewardGold,
              }
            });
          }
        }
      });

      sliced.push({
        name: action.payload.name,
        abledReward: abledRewardCnt < 6 ? true : false,
        content: abledRaid,
      });
      state.contents = sliced;
    },
    addList: (state, action: PayloadAction<AddList>) => {
      const sliced = state.contents.slice();
      sliced[action.payload.characterIdx].content.push({ 
        [action.payload.raidName]: {
          isDone: false,
          rewardGold: 0,
        }
      });
      state.contents = sliced;
    },
    deleteCharacter: (state, action: PayloadAction<DeleteCharacter>) => {
      state.contents = state.contents.filter((_, idx) => idx !== action.payload.idx);
    },
    deleteList: (state, action: PayloadAction<DeleteList>) => {
      const sliced = state.contents.slice();
      const deleted = sliced[action.payload.characterIdx].content.filter((_, idx) => {
        return idx !== action.payload.raidIdx;
      });
      sliced[action.payload.characterIdx].content = deleted;
      state.contents = sliced;
    },
    initList: (state) => {
      const sliced = state.contents.slice();
      state.contents = sliced.map(character => {
        const InitialContent: RaidList = character.content.map(el => {
          const key = Object.keys(el)[0];
          return { 
            [key]: {
              isDone: false,
              rewardGold: el[key].rewardGold,
            }
          };
        });

        return {
          ...character,
          content: InitialContent,
        }
      });
    },
    updateGoldReward: (state, action: PayloadAction<UpdateRewardGold>) => {
      const sliced = state.contents.slice();
      const target = sliced[action.payload.characterIdx].content[action.payload.raidIdx];
      const key = Object.keys(target)[0];
      target[key].rewardGold = action.payload.gold;
      state.contents = sliced;
    },
    updateSixTimesLimit: (state, action: PayloadAction<UpdateSixTimesLimit>) => {
      const sliced = state.contents.slice();
      const CheckedIdxArr: number[] = [];
      sliced.map((el, idx) => {
        if (el.abledReward) {
          CheckedIdxArr.push(idx);
        }
      });

      if (CheckedIdxArr.length === 6 && !CheckedIdxArr.includes(action.payload.characterIdx)) {
        return;
      }

      sliced.map((el, idx) => {
        if (idx === action.payload.characterIdx) {
          el.abledReward = !el.abledReward;
        }
      });
      state.contents = sliced;
    },
  }
});

export const { 
  updateContent,
  addCharacter, 
  deleteCharacter, 
  deleteList,
  addList,
  initList,
  updateGoldReward,
  updateSixTimesLimit,
} = contentsSlice.actions;
export const selectContents = (state: RootState) => state.contentsReducer.contents;
export default contentsSlice.reducer;
