// Imports:
import { Entities } from "../../../server/types";
import { ProjectsType } from "./generics.types";

export type TUserState = {
  user: Partial<Entities.IUser> | null;
  activeProject: ProjectsType | null;
  isLoading: boolean;
  isAuth: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  message?: string;
};
