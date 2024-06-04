import { createSlice } from "@reduxjs/toolkit";
import { FORM_FIELD_TYPE } from "../utils/constants";

const formSlice = createSlice({
  name: "form",
  initialState: {
    [FORM_FIELD_TYPE.name]: { value: "", error: null },
    [FORM_FIELD_TYPE.email]: { value: "", error: null },
    [FORM_FIELD_TYPE.password]: { value: "", error: null },
  },
  reducers: {
    updateFormValue: (state, action) => {
      state[action.payload.id].value = action.payload.value;
    },
    updateFormError: (state, action) => {
      state[action.payload.id].error = action.payload.value;
    },
    clearForm: () => {
      return {
        [FORM_FIELD_TYPE.name]: { value: "", error: null },
        [FORM_FIELD_TYPE.email]: { value: "", error: null },
        [FORM_FIELD_TYPE.password]: { value: "", error: null },
      };
    },
  },
});

export const { updateFormValue, updateFormError, clearForm } =
  formSlice.actions;
export default formSlice.reducer;
