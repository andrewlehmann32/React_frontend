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
  impersonationToken: null,
  impersonatedUser: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    // Register user actions
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

    // Load user actions
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
      state.activeProject = action.payload.projects.length > 0 ? action.payload.projects[0] : null;
    },
    loadUserFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },

    // Clear error and message
    clearError: (state) => {
      state.isError = false;
    },
    clearMessage: (state) => {
      state.message = "";
    },

    // Logout user
    logout: () => {
      return initialState;
    },

    // Set active project
    setActiveProject: (state, action: PayloadAction<ProjectsType>) => {
      return {
        ...state,
        activeProject: action.payload,
      };
    },

    // Set user projects
    setUserProjects: (state, action: PayloadAction<ProjectsType[]>) => {
      if (state.user) {
        state.user.projects = action.payload;
      }
    },

    // Impersonation actions
    setImpersonationToken: (state, action: PayloadAction<string>) => {
      state.impersonationToken = action.payload;
    },
    clearImpersonationToken: (state) => {
      state.impersonationToken = null;
      state.impersonatedUser = null;
    },
    setImpersonatedUser: (state, action: PayloadAction<User>) => {
      state.impersonatedUser = action.payload;
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
  setImpersonationToken,
  clearImpersonationToken,
  setImpersonatedUser,
} = userSlice.actions;

export default userSlice.reducer;
