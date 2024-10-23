import axios, { type AxiosRequestConfig } from "axios";

import { getAuthenticationToken } from "@/utils/localStorage";

const axiosInstance = axios.create({
  baseURL: "https://guestay.webarysites.com/api_owner/",
  headers: {
    Authorization: "GuesTayOwnerPortal2K24",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.data) {
      config.data = {};
    }

    if (typeof config.data === "object") {
      const authenticationToken = getAuthenticationToken();

      if (authenticationToken) {
        config.data = {
          ...config.data,
          auth_token: authenticationToken,
        };
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const axiosApi = async ({
  data,
  headers,
  method,
  params,
  url,
  ...others
}: AxiosRequestConfig) => {
  try {
    const response = await axiosInstance({
      data,
      headers,
      method,
      params,
      url,
      ...others,
    });

    return response.data;
  } catch (error) {
    console.log("🚀 ~ error:", error);

    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Handle known server responses
        let errorMessage = `Request failed with status code ${error.response.status}`;
        if (error.response.data && error.response.data.message) {
          errorMessage += `: ${error.response.data.message}`;
        }
        throw new Error(errorMessage);
      } else {
        // Handle client-side or network errors
        throw new Error(error.message);
      }
    } else if (error instanceof Error) {
      // Handle other generic errors
      throw new Error(error.message);
    } else {
      // Handle unknown errors
      throw new Error("An unknown error occurred");
    }
  }
};
