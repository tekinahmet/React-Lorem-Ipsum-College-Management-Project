import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentOps: null,
  listRefreshToken: null,
  currentRecord: null,
};

const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setOps: (state, action) => {
      state.currentOps = action.payload;
    },
    refreshToken: (state) => {
      state.listRefreshToken = Math.random();
    },
    setCurrentRecord: (state, action) => {
      state.currentRecord = action.payload;
    },
  },
});

export const { setOps, refreshToken, setCurrentRecord } = miscSlice.actions;
export default miscSlice.reducer;
