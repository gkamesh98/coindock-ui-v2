import { baseApi } from "./api";
import { getUserId } from "helper/functions";

const signup = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postRegister: build.mutation({
      query: (data) => ({
        url: "/v1/users",
        method: "post",
        data: {
          ...data,
        },
      }),
    }),
    signupsteps: build.query({
      query: (params) => {
        return {
          url: `/v1/users/${getUserId()}/signup/info`,
          method: "get",
        };
      },
      providesTags: ["signupsteps"],
    }),
  }),
});

export default signup;

export const { usePostRegisterMutation } = signup;
export const { usePrefetch: useSignupPrefetch, useSignupstepsQuery: useSignupSteps } = signup;
