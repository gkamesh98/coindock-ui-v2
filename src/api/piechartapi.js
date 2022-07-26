import { getUserId } from "helper/functions";
import { baseApi } from "./api";

baseApi.enhanceEndpoints({
  addTagTypes: ["pie", "piefilter"],
});

const piechartapi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    pie: build.query({
      query: (filter_by) => ({
        url: `/v1/users/${getUserId()}/pie-chart/`,
        params: { filter_by },
        method: "get",
      }),
      transformResponse: (response) => response?.data?.results,
      providesTags: ["pie"],
    }),
    piefilter: build.query({
      query: () => ({
        url: `/v1/users/${getUserId()}/pie-chart/filter`,
        method: "get",
      }),
      transformResponse: (response) => response?.data?.results,
      providesTags: ["piefilter"],
    }),

    getData: build.mutation({
      query: ({ ...data }) => ({
        url: `/v1/pie-chart`,
        method: "post",
        data,
      }),
    }),
  }),
});

export default piechartapi;

export const {
  usePieQuery: usePieChart,
  usePiefilterQuery: usePieFilter,

  useGetDataMutation: useData,
} = piechartapi;
