import { createSlice } from "@reduxjs/toolkit";
import {
  FORM_EMAIL_ID,
  FORM_NAME_ID,
  FORM_PASSWORD_ID,
} from "../utils/constants";

const formSlice = createSlice({
  name: "form",
  initialState: {
    [FORM_NAME_ID]: "",
    [FORM_EMAIL_ID]: "",
    [FORM_PASSWORD_ID]: "",
  },
  reducers: {
    updateForm: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearForm: () => {
      return {
        [FORM_NAME_ID]: "",
        [FORM_EMAIL_ID]: "",
        [FORM_PASSWORD_ID]: "",
      };
    },
  },
});

export const { updateForm, clearForm } = formSlice.actions;
export default formSlice.reducer;
