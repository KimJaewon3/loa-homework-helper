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
        const [key, val] = Object.entries(el)[0];
        if (val <= action.payload.level) {
          abledRaid.push({ [key]: false });
        }
      });
      sliced.push({
        name: action.payload.name,
        content: abledRaid
      });
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
    }
  }
});

export const { updateContent, addCharacter, deleteCharacter, deleteList } = contentsSlice.actions;
export const selectContents = (state: RootState) => state.contentsReducer.contents;
export default contentsSlice.reducer;
