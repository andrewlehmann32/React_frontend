// store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userAPI } from "./api/user-api";
import { userSlice } from "./reducer/user-reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [userSlice.name],
};

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(userAPI.middleware),
});

export const persistor = persistStore(store);

export type TRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
