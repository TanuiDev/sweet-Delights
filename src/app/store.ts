import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import userSlice from "../features/Auth/userSlice";
import userApi from "../features/Auth/userApi";
// import { useLocation } from "react-router-dom";
import loginApi from "../features/Auth/loginApi";
import orderApi from "../features/Auth/orderAPI";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user"], // Add the names of the slices you want to persist
};

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [loginApi.reducerPath]: loginApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(userApi.middleware)
      .concat(loginApi.middleware)
      .concat(orderApi.middleware),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
