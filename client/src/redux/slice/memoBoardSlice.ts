import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

type MemoInitialState = {
  memo: string;
};

const initialState: MemoInitialState = {
  memo: "",
};

type UpdateMemo = {
  value: string;
};

const memoBoardSlice = createSlice({
  name: "memoBoard",
  initialState,
  reducers: {
    updateMemo: (state, action: PayloadAction<UpdateMemo>) => {
      state.memo = action.payload.value;
    },
  },
});

export type { MemoInitialState };
export { initialState, memoBoardSlice };
export const { updateMemo } = memoBoardSlice.actions;
export default memoBoardSlice.reducer;
