import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: null,
  isLoggedIn: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = !!state.token;
      state.user = action.payload.user;
    },
    logout(state, action) {
      state.token = false;
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;
