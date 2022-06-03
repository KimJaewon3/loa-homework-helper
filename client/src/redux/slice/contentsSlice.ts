import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { raidLevel } from '../../data/raidLevel';
import { RootState } from '../store';

interface ContentsState {
  contents: {
    name: string;
    content: {
      [key: string]: boolean;
    }
  }[];
}

const initialState: ContentsState = {
  contents: [{
    name: '공통',
    content: {
      '도비스': false,
      '도가토': false,
      '유령선': false,
      '로웬주간퀘': false,
    }
  }]
};

type UpdatePayloadType = {
  name: string;
  target: string;
  check: boolean;
};

type AddPayloadType = {
  name: string;
  level: number;
}

type DeletePayloadType = {
  idx: number;
}

export const contentsSlice = createSlice({
  name: 'contents',
  initialState,
  reducers: {
    updateContent: (state, action: PayloadAction<UpdatePayloadType>) => {
      state.contents = state.contents.map(el => {
        if (el.name === action.payload.name) {
          return {
            name: el.name,
            content: Object.assign({}, el.content, {[action.payload.target]: action.payload.check})
          }
        }
        return el;
      })
    },
    addCharacter: (state, action: PayloadAction<AddPayloadType>) => {
      const sliced = state.contents.slice();
      let abledRaid = {};
      raidLevel.map(el => {
        const [key, val] = Object.entries(el)[0];
        if (val <= action.payload.level) {
          abledRaid = {
            ...abledRaid,
            [key]: false,
          }
        }
      });
      sliced.push({
        name: action.payload.name,
        content: abledRaid
      });
      state.contents = sliced;
    },
    deleteCharacter: (state, action: PayloadAction<DeletePayloadType>) => {
      state.contents = state.contents.filter((el, idx) => idx !== action.payload.idx);
    }
  }
});

export const { updateContent, addCharacter, deleteCharacter } = contentsSlice.actions;
export const selectContents = (state: RootState) => state.contentsReducer.contents;
export default contentsSlice.reducer;
