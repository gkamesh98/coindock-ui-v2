import { getUserId } from "helper/functions";
import { baseApi } from "./api";

const wallet = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addWallet: build.mutation({
      query: ({
        coinValue,
        walletName,
        walletAddress,
        // ...data
      }) => ({
        url: `/v1/users/${getUserId()}/add-wallet`,
        method: "post",
        data: {
          coin: coinValue,
          name: walletName,
          walletId: walletAddress,
        },
      }),
      invalidatesTags: [
        "linechart",
        "filter",
        "coinfilter",
        "coinshortname",
        "pie",
        "piefilter",
        "total",
        "primarycurrency",
        "topperformer",
        "lowperformer",
        "coincard",
      ],
      transformResponse: (response) => response?.data?.results,
    }),
    coins: build.query({
      query: () => ({
        url: `/v1/coins/accepted-crypto`,
        method: "get",
      }),
      transformResponse: (response) => response?.data?.results,
      providesTags: ["coins"],
    }),
  }),
});

export default wallet;

export const { useAddWalletMutation, useCoinsQuery: useCoins } = wallet;
export const { usePrefetch: useWalletPrefetch } = wallet;
