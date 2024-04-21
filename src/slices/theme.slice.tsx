import { createSlice } from "@reduxjs/toolkit";

type ThemeState = {
  theme: "light" | "dark";
};

const initialState = {
  theme: "light",
} as ThemeState;


const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkTheme: (state, action) => {
      state.theme = action.payload
    }
  },
});

export const { setDarkTheme } = themeSlice.actions;

export default themeSlice.reducer;