// import { store } from "reducers";
import { baseApi } from "./api";

const auth = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ ...data }) => ({
        url: "/v1/login",
        method: "post",
        data,
      }),
    }),

    logout: build.mutation({
      query: () => ({
        url: "/v1/logout",
        method: "get",
      }),
      onQueryStarted: async (data, { dispatch, queryFulfilled }) => {
        if (queryFulfilled) {
          localStorage.clear();
          dispatch({
            type: "RESET",
          });
        }
      },
      // transformResponse: (response, meta) => {
      //   localStorage.clear();
      //   // store.dispatch({
      //   //   type: "RESET",
      //   // });
      //   return response;
      // },
    }),

    refresh: build.mutation({
      query: () => ({
        url: "/v1/refresh",
        method: "post",
      }),
    }),
  }),
});

export default auth;
export const {
  useLoginMutation: useLogin,
  useLogoutMutation: useLogout,
  useRefreshMutation: useRefresh,
} = auth;
