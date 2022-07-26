// eslint-disable-next-line import/no-unresolved
import { getUserId } from "helper/functions";
import baseApi from "./api";

const signup = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postRegister: build.mutation({
      query: ({
        firstname,
        lastname,
        date,
        email,
        country,
        password,
        reenterpassword,
        // ...data
      }) => ({
        url: "/v1/users",
        method: "post",
        data: {
          first_name: firstname,
          last_name: lastname,
          date_of_birth: date,
          email,
          country,
          password,
          re_enter_password: reenterpassword,
        },
      }),
      transformResponse: (response) => response,
    }),
    signupsteps: build.query({
      query: () => ({
        url: `/v1/users/${getUserId()}/signup/info`,
        method: "get",
      }),
      providesTags: ["signupsteps"],
    }),
  }),
});

export default signup;

export const { usePostRegisterMutation } = signup;
export const { usePrefetch: useSignupPrefetch, useSignupstepsQuery: useSignupSteps } = signup;
