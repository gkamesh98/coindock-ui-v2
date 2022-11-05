import { getUserId } from "helper/functions";
import { baseApi } from "./api";

baseApi.enhanceEndpoints({ addTagTypes: ["accountDetails"] });

const accapi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    account: build.query({
      query: () => ({
        url: `/v1/users/${getUserId()}`,
        method: "get",
      }),
      transformResponse: (response) => {
        return response.data?.results;
      },
      providesTags: ["accountDetails"],
    }),

    currencyfilter: build.query({
      query: () => ({
        url: `/v1/coins/currency-conversions`,
        method: "get",
      }),
      transformResponse: (response) => {
        return response.data?.results?.coins;
      },
      provideTags: ["accountDetails"],
    }),

    countryfilter: build.query({
      query: () => ({
        url: `/v1/countries`,
        method: "get",
      }),
      transformResponse: (response) => {
        return response.data?.results;
      },
      provideTags: ["account"],
    }),

    putAccountData: build.mutation({
      query: ({ ...data }) => ({
        url: `/v1/users/${getUserId()}/accounts/profile`,
        method: "put",
        data,
      }),
      transformResponse: (response) => {
        return response.data?.results;
      },
      invalidatesTags: ["accountDetails"],
    }),
  }),
});

export default accapi;

export const {
  useAccountQuery: useAccount,
  usePutAccountDataMutation: useAccountData,
  useCountryfilterQuery: useCountry,
  useCurrencyfilterQuery: useCurrency,
} = accapi;
