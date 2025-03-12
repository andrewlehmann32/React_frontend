import { RootState } from "../store"; // Assuming this is where your root state is defined

export const selectUser = (state: RootState) => state.userSlice;
export const selectUserProjects = (state: RootState) =>
  state.userSlice.user?.projects;
export const selectActiveProject = (state: RootState) =>
  state.userSlice.activeProject;
export const selectImpersonationToken = (state: RootState) =>
  state.userSlice.impersonationToken;
export const selectImpersonatedUser = (state: RootState) =>
  state.userSlice.impersonatedUser
