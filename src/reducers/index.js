import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import thunk from "redux-thunk";
import { logger } from "redux-logger";
import { baseApi } from "api/api";
import { authReducer } from "./auth";
import { wallet } from "reducers/wallet";

const reducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  wallet: wallet,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET") {
    return reducer(undefined, action);
  }
  return reducer(state, action);
};

export const store = configureStore({
  initialState: {},
  reducer: rootReducer,

  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: false,
    }).concat([thunk, baseApi.middleware]),
});

setupListeners(store.dispatch);

export default store;
