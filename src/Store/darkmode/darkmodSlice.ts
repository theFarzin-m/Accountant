import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkmode: false,
};

const DarkModeSlice = createSlice({
  name: "darkmode",
  initialState,
  reducers: {
    toggleDarkmode(state) {
      state.darkmode = !state.darkmode
    },
  },
});

export default DarkModeSlice.reducer;
export const { toggleDarkmode } = DarkModeSlice.actions;
