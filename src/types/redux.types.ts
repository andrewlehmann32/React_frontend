// Imports:
import { Entities } from "../../../server/types";

export type TUserState = {
  user: Partial<Entities.IUser> | null;
  isLoading: boolean;
  isAuth: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  message?: string;
};
