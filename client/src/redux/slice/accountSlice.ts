import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AccountType = Readonly<"characters" | "etc">;

export type AccountItem = {
  history: string;
  gold: number;
  accountType: AccountType;
};

type InitialState = {
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

const initialState: InitialState = {
  accountList: {
    characters: [],
    etc: [],
  },
};

export const accountSlice = createSlice({
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

export const {
  addAccount,
  updateAccount,
  updateCharacterAccount,
  deleteAccount,
  initAccountEtc,
} = accountSlice.actions;
export default accountSlice.reducer;
