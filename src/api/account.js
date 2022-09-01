import { baseApi } from "./api";

const accapi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    countryfilter: build.query({
      query: () => ({
        url: `/v1/countries`,
        method: "get",
      }),
      transformResponse: (response) => {
        return response?.data?.results?.countries;
      },
    }),
  }),
});
export const { useCountryfilterQuery: useCountry } = accapi;
