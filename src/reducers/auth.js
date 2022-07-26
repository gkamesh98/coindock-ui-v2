import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { authToken, getUserId } from "helper/functions";
import auth from "api/auth";

const reducer = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    token: null,
  },
  reducers: {},
  extraReducers: (build) => {
    build.addMatcher(
      isAnyOf(auth.endpoints.login.matchFulfilled, auth.endpoints.refresh.matchFulfilled),
      (state) => {
        const token = authToken();
        if (token) {
          return {
            ...state,
            userId: getUserId(),
            token: authToken(),
          };
        }
        return state;
      }
    );
  },
});

export const { reducer: authReducer } = reducer;

export default { authReducer };
