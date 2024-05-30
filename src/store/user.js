import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    deleteUser: () => {
      return null;
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
