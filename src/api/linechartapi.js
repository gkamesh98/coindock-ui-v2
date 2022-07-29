import { getUserId } from "helper/functions";
import { baseApi } from "./api";

baseApi.enhanceEndpoints({
  addTagTypes: ["linechart", "filter", "coinfilter", "coinshortname"],
});
const linechartapi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    line: build.query({
      query: (params) => ({
        url: `/v1/users/${getUserId()}/graph`,
        params: { ...params },
        method: "get",
      }),
      transformResponse: (response) => response?.data?.results,
      providesTags: ["linechart"],
    }),
    filter: build.query({
      query: () => ({
        url: `/v1/users/${getUserId()}/graph/filter`,
        method: "get",
      }),
      transformResponse: (response) => response?.data?.results,
      providesTags: ["filter"],
    }),

    coinfilter: build.query({
      query: () => ({
        url: `/v1/users/${getUserId()}/graph/coins`,
        method: "get",
      }),
      transformResponse: (response) => response?.data?.results,
      providesTags: ["coinfilter"],
    }),
    coinshortname: build.query({
      query: () => ({
        url: `/v1/coins/coin-shortname`,
        method: "get",
      }),
      transformResponse: (response) => response?.data?.results,
      providesTags: ["coinshortname"],
    }),

    getData: build.mutation({
      query: ({ ...data }) => ({
        url: `/v1/graph`,
        method: "get",
        data,
      }),
    }),
  }),
});

export default linechartapi;
export const {
  useLineQuery: useLineChart,
  useFilterQuery: useLineFilter,
  useCoinshortnameQuery: useCoinShortName,
  useCoinfilterQuery: useCoinFilter,
  useGetDataMutation: useData,
} = linechartapi;
