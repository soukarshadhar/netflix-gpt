import { createSlice } from "@reduxjs/toolkit";
import { BROWSE_TAB } from "../utils/constants";

const activeBrowseTabSlice = createSlice({
  name: "activeBrowseTab",
  initialState: BROWSE_TAB.MOVIES,
  reducers: {
    setBrowseTab: (state, action) => {
      return action.payload;
    },
  },
});

export const { setBrowseTab } = activeBrowseTabSlice.actions;
export default activeBrowseTabSlice.reducer;
