import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { themeInfo, ThemeInfo } from "../../style/theme";

type UpdateTheme = {
  themeIdx: number;
};

type InitialState = {
  themeInfo: ThemeInfo;
};

const initialState: InitialState = {
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
