import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { authToken, getUserId } from "helper/functions";
import auth from "api/auth";
import signup from "api/signup";

const reducer = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    token: null,
    signupInfo: {},
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
    build.addMatcher(signup.endpoints.signupsteps.matchFulfilled, (state, action) => {
      return {
        ...state,
        signupInfo: action?.payload?.stepDetails,
      };
    });
  },
});

export const { reducer: authReducer } = reducer;

export default { authReducer };
