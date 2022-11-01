import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeType } from "../../style/theme";
import { RootState } from "../store";

interface ThemeState {
  themeType: ThemeType;
}

const initialState: ThemeState = {
  themeType: "summer",
};

type UpdateTheme = {
  value: ThemeType;
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateTheme: (state, action: PayloadAction<UpdateTheme>) => {
      state.themeType = action.payload.value;
    },
  },
});

export const { updateTheme } = themeSlice.actions;
export const selectTheme = (state: RootState) => state.themeReducer.themeType;
export default themeSlice.reducer;
