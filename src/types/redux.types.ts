// Imports:
import { ProjectsType, User } from "./generics.types";

export type TUserState = {
  user: User | null;
  activeProject: ProjectsType | null;
  isLoading: boolean;
  isAuth: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  message?: string;
};
