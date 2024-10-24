import axios, { type AxiosRequestConfig } from "axios";

import { getAuthenticationToken } from "@/utils/localStorage";

const axiosInstance = axios.create({
  baseURL: "https://guestay.webarysites.com/api_owner/",
  headers: {
    Authorization: "GuesTayOwnerPortal2K24",
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

const convertToFormData = (
  data: Record<string, string | Blob | File>,
): FormData => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  return formData;
};

export const axiosApi = async ({
  data,
  headers,
  method,
  params,
  url,
  isFormData = true,
  ...others
}: AxiosRequestConfig & { isFormData?: boolean }) => {
  try {
    let requestData = data;
    if (isFormData && data && typeof data === "object") {
      requestData = convertToFormData(data);
    }

    const contentType = isFormData ? "multipart/form-data" : "application/json";

    const response = await axiosInstance({
      data: requestData,
      headers: {
        ...headers,
        "Content-Type": contentType,
      },
      method,
      params,
      url,
      ...others,
    });

    // Handle success but failed response (API returns success: 0)
    if (response.status === 200 && response.data.success === 0) {
      const errorMessage = response.data.errorMessage || "An error occurred";
      throw new Error(
        `API Error: ${errorMessage} (Error Code: ${response.data.errorCode})`,
      );
    }

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
