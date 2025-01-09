import { RootState } from "../store"; // Assuming this is where your root state is defined

export const selectUser = (state: RootState) => state.userSlice;
export const selectUserProjects = (state: RootState) =>
  state.userSlice.user?.projects;
