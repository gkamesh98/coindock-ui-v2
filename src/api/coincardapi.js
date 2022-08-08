import { getUserId } from "helper/functions";
import { baseApi } from "./api";

baseApi.enhanceEndpoints({
  addTagTypes: ["coincard"],
});
const coincardapi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    coincard: build.query({
      query: () => {
        console.log("in the coin card", getUserId());
        return {
          url: `/v1/users/${getUserId()}/coin-cards/`,
          method: "get",
        };
      },
      transformResponse: (response) => response?.data?.results,
      providesTags: ["coincard"],
    }),

    getData: build.mutation({
      query: ({ ...data }) => ({
        url: `/v1/coin-cards`,
        method: "get",
        data,
      }),
    }),
  }),
});

export default coincardapi;
export const { useCoincardQuery: useCoinCard, useGetDataMutation: useData } = coincardapi;
