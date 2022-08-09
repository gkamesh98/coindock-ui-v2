import { baseApi } from "./api";
import { getUserId } from "helper/functions";

const signup = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postRegister: build.mutation({
      query: ({
        firstName,
        lastName,
        dateOfBirth,
        email,
        country,
        password,
        reEnterPassword,
        ...data
      }) => ({
        url: "/v1/users",
        method: "post",
        data: {
          first_name: firstName,
          last_name: lastName,
          date_of_birth: dateOfBirth,
          email: email,
          country: country,
          password: password,
          re_enter_password: reEnterPassword,
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
