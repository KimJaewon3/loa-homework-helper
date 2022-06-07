import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

export type bookItem = {
  history: string;
  gold: number;
}

interface AccountBookState {
  accountBook: {
    [key: string]: bookItem[];
    character: bookItem[];
    etc: bookItem[];
  }
}

const initialState: AccountBookState = {
  accountBook: {
    character: [],
    etc: [],
  },
};

type AddBookList = {
  history: string;
  gold: number;
  type: 'character' | 'etc',
}

type UpdateBookList = {
  history: string;
  gold: number;
  idx: number;
  type: 'character' | 'etc',
}

type DeleteBookList = {
  type: 'character' | 'etc',
  targetIdx: number;
}

export const accountBookSlice = createSlice({
  name: 'accountBook',
  initialState,
  reducers: {
    addAccountBookList: (state, action: PayloadAction<AddBookList>) => {
      const sliced = Object.assign({}, state.accountBook);
      sliced[action.payload.type].push({
        history: action.payload.history,
        gold: action.payload.gold,
      });
      state.accountBook = sliced;
    },
    updateAccountBookList: (state, action: PayloadAction<UpdateBookList>) => {
      const sliced = Object.assign({}, state.accountBook);
      sliced[action.payload.type][action.payload.idx] = {
        history: action.payload.history,
        gold: action.payload.gold,
      }
      state.accountBook = sliced;
    },
    deleteAccountBookList: (state, action: PayloadAction<DeleteBookList>) => {
      const sliced = Object.assign({}, state.accountBook);
      sliced[action.payload.type] = sliced[action.payload.type].filter(((_, idx) => {
        return idx !== action.payload.targetIdx;
      }));
      state.accountBook = sliced;
    },
  }
});

export const {
  addAccountBookList,
  updateAccountBookList,
  deleteAccountBookList,
} = accountBookSlice.actions;
export const selectAccountBook = (state: RootState) => state.accountBookReducer.accountBook;
export default accountBookSlice.reducer;