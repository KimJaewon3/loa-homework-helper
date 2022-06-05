import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { raidLevel } from '../../data/raidLevel';
import { RootState } from '../store';

interface ContentsState {
  contents: {
    name: string;
    content: {
      [key: string]: boolean;
    }[];
  }[];
}

const initialState: ContentsState = {
  contents: [
    {
      name: '공통',
      content: [
        { '도비스': false },
        { '도가토': false },
        { '유령선': false },
        { '로웬주간퀘': false },
      ]
    },
  ]
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

export const contentsSlice = createSlice({
  name: 'contents',
  initialState,
  reducers: {
    updateContent: (state, action: PayloadAction<UpdateContents>) => {
      const sliced = state.contents.slice();
      const target = sliced[action.payload.characterIdx].content[action.payload.raidIdx];
      const key = Object.keys(target)[0];
      target[key] = action.payload.check;
      state.contents = sliced;
    },
    addCharacter: (state, action: PayloadAction<AddCharacter>) => {
      const sliced = state.contents.slice();
      const abledRaid: {[key: string]: boolean}[] = [];

      raidLevel.map(el => {
        const [raidName, levelLimit] = Object.entries(el)[0];
        if (typeof levelLimit === 'number') {
          if (levelLimit <= action.payload.level) {
            abledRaid.push({ [raidName]: false });
          }
        }
        if (typeof levelLimit === 'object') {
          const limitArr = Object.entries(levelLimit);
          let result = {
            difficulty: '',
            level: 0,
          };
          limitArr.map(el => {
            const [difficulty, level] = el;
            if (level <= action.payload.level) {
              if (result.level < level) {
                result = {
                  ...result,
                  difficulty,
                  level,
                }
              }
            }
          });
          if (result.difficulty !== '' && result.level !== 0) { 
            abledRaid.push({
              [`[${result.difficulty}]${raidName}`]: false
            });
          }
        }
      });

      sliced.push({
        name: action.payload.name,
        content: abledRaid
      });
      state.contents = sliced;
    },
    addList: (state, action: PayloadAction<AddList>) => {
      const sliced = state.contents.slice();
      sliced[action.payload.characterIdx].content.push({ [action.payload.raidName]: false });
      state.contents = sliced;
    },
    deleteCharacter: (state, action: PayloadAction<DeleteCharacter>) => {
      state.contents = state.contents.filter((el, idx) => idx !== action.payload.idx);
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
        const InitialContent = character.content.map(el => {
          const key = Object.keys(el)[0];
          return { [key]: false };
        });
        return { 
          name: character.name,
          content: InitialContent,
        }
      });
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
} = contentsSlice.actions;
export const selectContents = (state: RootState) => state.contentsReducer.contents;
export default contentsSlice.reducer;
