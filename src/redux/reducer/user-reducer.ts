// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Redux } from "../../types";

const initialState: Redux.TUserState = {
  user: null,
  isAuth: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const userSlice = createSlice({
  name: "user-reducer",
  initialState,
  reducers: {
    registerUserStart: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    },
    registerUser: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
      state.isAuth = true;
      state.isLoading = false;
      state.isSuccess = true;
    },

    registerUserFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },

    loadUserStart: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    loadUser: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
      state.isAuth = true;
      state.isLoading = false;
      state.isSuccess = true;
    },

    loadUserFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },

    clearError: (state) => {
      state.isError = false;
    },

    clearMessage: (state) => {
      state.message = "";
    },

    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
});

export const {
  registerUserStart,
  registerUser,
  registerUserFailure,
  loadUserStart,
  loadUser,
  loadUserFailure,
  clearError,
  clearMessage,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
