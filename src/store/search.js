import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    text: "",
    list: [],
  },
  reducers: {
    setSearchText: (state, action) => {
      state.text = action.payload;
    },
    setSearchList: (state, action) => {
      state.list = action.payload;
    },
    clearSearch: () => {
      return {
        text: "",
        list: [],
      };
    },
  },
});

export const { setSearchText, setSearchList, clearSearch } =
  searchSlice.actions;
export default searchSlice.reducer;
