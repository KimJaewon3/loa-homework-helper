import { createSlice } from "@reduxjs/toolkit";
import { themeInfo } from "../../style/theme";

import type { PayloadAction } from "@reduxjs/toolkit";
import type { ThemeInfo } from "../../style/theme";

type UpdateTheme = {
  themeIdx: number;
};

type ThemeInitialState = {
  themeInfo: ThemeInfo;
};

const initialState: ThemeInitialState = {
  themeInfo: themeInfo[0],
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateTheme: (state, action: PayloadAction<UpdateTheme>) => {
      state.themeInfo = themeInfo[action.payload.themeIdx];
    },
  },
});

export type { ThemeInitialState };
export { initialState, themeSlice };
export const { updateTheme } = themeSlice.actions;
export default themeSlice.reducer;
