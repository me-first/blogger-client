import { createSlice } from "@reduxjs/toolkit";

const initialFormState = {
  inputIsValid: true,
  emailIsValid: true,
  aboutIsValid: true,
  passwordIsValid: true,
};

export const formSlice = createSlice({
  name: "form",
  initialState: initialFormState,
  reducers: {
    validName(state, action) {
      if (action.payload !== "") state.inputIsValid = true;
      else state.inputIsValid = false;
    },
    validAbout(state, action) {
      if (action.payload !== "") state.aboutIsValid = true;
      else state.aboutIsValid = false;
    },
    validEmail(state, action) {
      if (action.payload !== "" && action.payload.trim().includes("@"))
        state.emailIsValid = true;
      else state.emailIsValid = false;
    },
    validPassword(state, action) {
      if (action.payload !== "" && action.payload.trim().length >= 8)
        state.passwordIsValid = true;
      else state.passwordIsValid = false;
    },
  },
});

export const formActions = formSlice.actions;
