import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

type AccountType = Readonly<"characters" | "etc">;

type AccountItem = {
  history: string;
  gold: number;
  accountType: AccountType;
};

type AccountInitialState = {
  accountList: {
    characters: AccountItem[];
    etc: AccountItem[];
  };
};

interface UpdateAccount extends AccountItem {
  idx: number;
}

type DeleteAccount = {
  idx: number;
  accountType: AccountType;
};

const initialState: AccountInitialState = {
  accountList: {
    characters: [],
    etc: [],
  },
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    addAccount: (state, action: PayloadAction<AccountItem>) => {
      const { history, gold, accountType } = action.payload;
      state.accountList[accountType].push({ history, gold, accountType });
    },
    updateCharacterAccount: (state, action: PayloadAction<AccountItem[]>) => {
      const characters = action.payload;
      state.accountList = {
        ...state.accountList,
        characters,
      };
    },
    updateAccount: (state, action: PayloadAction<UpdateAccount>) => {
      const { history, gold, accountType, idx } = action.payload;
      state.accountList[accountType][idx] = {
        ...state.accountList[accountType][idx],
        history,
        gold,
      };
    },
    deleteAccount: (state, action: PayloadAction<DeleteAccount>) => {
      const { accountType, idx } = action.payload;
      state.accountList[accountType].splice(idx, 1);
    },
    initAccountEtc: (state, action: PayloadAction) => {
      state.accountList.etc = [];
    },
  },
});

export type { AccountType, AccountItem, AccountInitialState, DeleteAccount };
export { initialState, accountSlice };
export const {
  addAccount,
  updateAccount,
  updateCharacterAccount,
  deleteAccount,
  initAccountEtc,
} = accountSlice.actions;
export default accountSlice.reducer;
