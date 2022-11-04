import axios from "axios";
import { createApi } from "@reduxjs/toolkit/query/react";
import { convertObjectKeys } from "helper/functions";
import { camelCase, snakeCase } from "lodash";

const localStorageAccessToken = process.env.REACT_APP_ACCESS_TOKEN;
const localStorageRefreshToken = process.env.REACT_APP_REFRESH_TOKEN;

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => ({
    ...config,
    ...(config.method !== "get" ? { data: config.data } : {}),
    params: config.params,
  }),
  (error) => Promise.reject(error)
);

// Append headers based on localstorage tokens

axiosInstance.interceptors.request.use((config) => {
  const convertedConfig = config;
  const accessToken = localStorage.getItem(localStorageAccessToken);
  const refreshToken = localStorage.getItem(localStorageRefreshToken);

  if (accessToken) {
    convertedConfig.headers.Authorization = `Bearer ${accessToken}`;
  }
  if (refreshToken) {
    convertedConfig.headers["refresh-token"] = refreshToken;
  }
  if (config.data) {
    convertedConfig.data = convertObjectKeys(convertedConfig.data ?? {}, snakeCase);
  }
  if (config.params) {
    convertedConfig.params = convertObjectKeys(convertedConfig.params ?? {}, snakeCase);
  }
  return convertedConfig;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response)
);

axiosInstance.interceptors.response.use(
  (response) => {
    const accessToken = response.headers["access-token"];
    const refreshToken = response.headers["refresh-token"];
    if (accessToken) {
      localStorage.setItem(localStorageAccessToken, accessToken);
    }

    if (refreshToken) {
      localStorage.setItem(localStorageRefreshToken, refreshToken);
    }

    return {
      data: { ...convertObjectKeys(response ?? {}, camelCase) },
    };
  },
  (errorResponse) => ({
    error: {
      ...convertObjectKeys(errorResponse ?? {}, camelCase),
    },
  })
);

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  ({ method = "get", url, data = {}, params = {}, responseType = "json" }) =>
    axiosInstance({
      method,
      url: baseUrl + url,
      ...(method !== "get" ? { data } : {}),
      params,
      responseType,
    });

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery({ baseUrl: process.env.REACT_APP_API_DOMAIN }),
  endpoints: () => ({}),
});
