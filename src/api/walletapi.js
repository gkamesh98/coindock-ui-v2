import { getUserId } from "helper/functions";
import baseApi from "./api";

const wallet = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addWallet: build.mutation({
      query: ({
        coin,
        walletname,
        wallet_id,
        // ...data
      }) => ({
        url: `/v1/users/${getUserId()}/add-wallet`,
        method: "post",
        data: {
          coin,
          name: walletname,
          wallet_id,
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
      transformResponse: (response) => response,
    }),
    coins: build.query({
      query: () => ({
        url: `/v1/coins/accepted-crypto`,
        method: "get",
      }),

      providesTags: ["coins"],
    }),
  }),
});

export default wallet;

export const { useAddWalletMutation, useCoinsQuery: useCoins } = wallet;
export const { usePrefetch: useWalletPrefetch } = wallet;
