import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { themeInfo, ThemeInfo } from "../../style/theme";

type UpdateTheme = {
  themeIdx: number;
};

export type ThemeInitialState = {
  themeInfo: ThemeInfo;
};

export const initialState: ThemeInitialState = {
  themeInfo: themeInfo[0],
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateTheme: (state, action: PayloadAction<UpdateTheme>) => {
      state.themeInfo = themeInfo[action.payload.themeIdx];
    },
  },
});

export const { updateTheme } = themeSlice.actions;
export default themeSlice.reducer;
