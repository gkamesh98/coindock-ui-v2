import { baseApi } from "./api";
import { getUserId } from "helper/functions";

export const recoveryCodes = baseApi.injectEndpoints({
  endpoints: (build) => ({
    postRecoveryCodes: build.query({
      query: () => ({
        url: `/v1/users/${getUserId()}/recovery-codes`,
        method: "post",
      }),
      transformResponse: (response) => {
        return response?.data?.results.recoveryCode.recoveryCodes;
      },
      providesTags: ["recover-codes"],
    }),

    getRecoveryCodesDownload: build.mutation({
      query: () => ({
        url: `/v1/users/${getUserId()}/recovery-codes/download`,
        method: "get",
        responseType: "blob",
      }),
      transformResponse: (response) => {
        const { data } = response;
        const url = window.URL.createObjectURL(data);
        const link = document.createElement("a");
        link.href = url;
        window.open(url);
        link.setAttribute(
          "download",
          response.headers["content-disposition"].split("filename=")[1].replaceAll('"', "")
        );
        document.body.appendChild(link);
        link.click();
        return data;
      },
    }),

    putRecoveryCodes: build.mutation({
      query: ({ keyResponse }) => {
        return {
          url: `/v1/users/${getUserId()}/recovery-codes/activate`,
          method: "put",
          data: { keyResponse },
        };
      },
      transformResponse: (response) => {
        return response;
      },
    }),

    getRandomRecoveryCodes: build.query({
      query: () => ({
        url: `/v1/users/${getUserId()}/recovery-codes/random`,
        method: "get",
      }),
      transformResponse: (response) => {
        return response.data?.results;
      },
    }),
  }),
});

export const {
  usePutRecoveryCodesMutation,
  usePostRecoveryCodesQuery,
  useGetRandomRecoveryCodesQuery,
  useGetRecoveryCodesDownloadMutation,
} = recoveryCodes;
