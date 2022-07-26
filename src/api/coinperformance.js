// eslint-disable-next-line import/no-unresolved
import { getUserId } from "helper/functions";
import baseApi from "./api";

baseApi.enhanceEndpoints({
  addTagTypes: ["total", "primarycurrency", "topperformer", "lowperformer"],
});
const coinperformanceapi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    total: build.query({
      query: () => ({
        url: `/v1/users/${getUserId()}/total-default`,
        method: "get",
      }),
      transformResponse: (response) => response?.data?.results,
      providesTags: ["total"],
    }),
    primary: build.query({
      query: () => ({
        url: `/v1/users/${getUserId()}/primary-currency`,
        method: "get",
      }),

      providesTags: ["primarycurrency"],
    }),
    top: build.query({
      query: () => ({
        url: `/v1/users/${getUserId()}/top-performer`,
        method: "get",
      }),

      providesTags: ["topperformer"],
    }),
    low: build.query({
      query: () => ({
        url: `/v1/users/${getUserId()}/low-performer`,
        method: "get",
      }),

      providesTags: ["lowperformer"],
    }),

    getData: build.mutation({
      query: ({ ...data }) => ({
        url: `/v1/low`,
        method: "get",
        data,
      }),
    }),
  }),
});

export default coinperformanceapi;
export const {
  useTopQuery: useTopperformer,
  usePrimaryQuery: usePrimaryCurrency,
  useLowQuery: useLowperformer,
  useTotalQuery: useTotalCurrency,
  useGetDataMutation: useData,
} = coinperformanceapi;
