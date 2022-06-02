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
  contents: []
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
    }
  }
});

export const { updateContent, addCharacter } = contentsSlice.actions;
export const selectContents = (state: RootState) => state.contentsReducer.contents;
export default contentsSlice.reducer;
