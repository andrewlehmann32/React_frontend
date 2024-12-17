// Imports:
import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/user-api";
import { userSlice } from "./reducer/user-reducer";

const store = configureStore({
  reducer: {
    // API:
    [userAPI.reducerPath]: userAPI.reducer,

    // Reducer:
    [userSlice.name]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAPI.middleware),
  devTools: import.meta.env.MODE !== "production",
});

type TRootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// Exports:
export { store };
export type { AppDispatch, TRootState };
