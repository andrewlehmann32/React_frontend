// Imports:
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Redux } from "../../types";

const initialState: Redux.TUserState = {
  user: null,
  isAuth: false,
  isLoading: true,
  isError: false,
  isSuccess: false,
  message: "",
};

export const userSlice = createSlice({
  name: "user-reducer",
  initialState,
  reducers: {
    signInWithGoogle: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isAuth = true;
    },

    signInWithGoogleFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },

    registerUser: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
    },

    loginUser: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isSuccess = true;
      state.isAuth = true;
    },

    loginUserFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },

    registerUserFailure: (state, action: PayloadAction<string>) => {
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
  },
});

export const {
  signInWithGoogle,
  signInWithGoogleFailure,
  loginUser,
  loginUserFailure,
  registerUser,
  registerUserFailure,
  clearError,
  clearMessage,
} = userSlice.actions;
