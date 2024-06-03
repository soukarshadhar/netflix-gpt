import { createSlice } from "@reduxjs/toolkit";
import { BROWSE_TAB } from "../utils/constants";

const activeBrowseTabSlice = createSlice({
  name: "activeBrowseTab",
  initialState: BROWSE_TAB.movies,
  reducers: {
    setBrowseTab: (state, action) => {
      return action.payload;
    },
    resetBrowseTab: () => {
      return BROWSE_TAB.movies;
    },
  },
});

export const { setBrowseTab, resetBrowseTab } = activeBrowseTabSlice.actions;
export default activeBrowseTabSlice.reducer;
