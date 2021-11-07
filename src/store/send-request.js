import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

const API_URL = "https://bloggerserver.herokuapp.com";

const cookies = new Cookies();

const intitialRequestState = {
  isLoading: false,
  data: [],
  error: null,
};

export const requestSlice = createSlice({
  name: "request",
  initialState: intitialRequestState,
  reducers: {
    requestSend(state) {
      state.isLoading = true;
    },
    dataArrived(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    },
    checkError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const requestActions = requestSlice.actions;

export const sendRequest = (method, url, data = {}) => {
  const token = cookies.get("jwt");
  return async (dispatch) => {
    dispatch(requestActions.requestSend());
    try {
      const response = await axios({
        method: method,
        url: API_URL + url,
        data: data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      // console.log(response);
      dispatch(requestActions.dataArrived(response.data));
    } catch (error) {
      console.log(error.response.data);
      dispatch(requestActions.checkError(error.response.data.message));
    }
  };
};
