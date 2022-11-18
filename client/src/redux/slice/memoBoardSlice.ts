import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type MemoInitialState = {
  memo: string;
};

const initialState: MemoInitialState = {
  memo: "",
};

type UpdateMemo = {
  value: string;
};

export const memoBoardSlice = createSlice({
  name: "memoBoard",
  initialState,
  reducers: {
    updateMemo: (state, action: PayloadAction<UpdateMemo>) => {
      state.memo = action.payload.value;
    },
  },
});

export const { updateMemo } = memoBoardSlice.actions;
export const selectMemoBoard = (state: RootState) =>
  state.memoBoardReducer.memo;
export default memoBoardSlice.reducer;
