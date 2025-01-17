// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Redux } from "../../types";
import { ProjectsType, User } from "../../types/generics.types";

const initialState: Redux.TUserState = {
  user: null,
  activeProject: null,
  isAuth: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    registerUserStart: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
    },
    registerUser: (state, action: PayloadAction<User>) => {
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
    loadUser: (state, action: PayloadAction<User>) => {
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

    logout: () => {
      return initialState;
    },
    setActiveProject: (state, action: PayloadAction<ProjectsType>) => {
      return {
        ...state,
        activeProject: action.payload,
      };
    },
    setUserProjects: (state, action: PayloadAction<ProjectsType[]>) => {
      if (state.user) {
        state.user.projects = action.payload;
      }
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
  setActiveProject,
  setUserProjects,
} = userSlice.actions;

export default userSlice.reducer;
