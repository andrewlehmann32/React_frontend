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
import { userSlice } from "./reducer/userSlice";
import { renderDetailsSlice } from "./reducer/resourcesReducer";


const persistConfig = {
  key: "root",
  storage,
  whitelist: [userSlice.name],
};

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  renderDetails: renderDetailsSlice.reducer,
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

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
