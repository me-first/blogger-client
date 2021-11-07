import { configureStore } from "@reduxjs/toolkit";
import { requestSlice } from "./send-request";
import { formSlice } from "./validate-form";
import { authSlice } from "./auth-token";

const store = configureStore({
  reducer: {
    request: requestSlice.reducer,
    form: formSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
