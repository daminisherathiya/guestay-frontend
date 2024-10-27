import { axiosApi } from "@/axios";

import { paswordResetApiType } from "./paswordResetApi.types";

export const paswordResetApi = async ({ data }: paswordResetApiType) => {
  return await axiosApi({
    data: {
      email: data.email,
    },
    method: "post",
    url: "/account/reset_password",
  });
};
