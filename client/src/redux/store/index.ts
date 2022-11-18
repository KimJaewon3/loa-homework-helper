import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { migrate, VERSION } from "./migration";

import memoBoardReducer from "../slice/memoBoardSlice";
import themeReducer from "../slice/themeSlice";
import characterReducer from "../slice/characterSlice";
import accountReducer from "../slice/accountSlice";

const persistConfig = {
  key: "root",
  version: VERSION,
  storage,
  whitelist: [
    "memoBoardReducer",
    "themeReducer",
    "characterReducer",
    "accountReducer",
  ],
  migrate,
};

const rootReducer = combineReducers({
  memoBoardReducer,
  themeReducer,
  characterReducer,
  accountReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
export default store;
