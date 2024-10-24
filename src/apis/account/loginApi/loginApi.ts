import { axiosApi } from "@/axios/axios";

import { type LoginApiType } from "./loginApi.types";

export const loginApi = async ({ data }: LoginApiType) => {
  return await axiosApi({
    data: {
      email: data.email,
      password: data.password,
    },
    method: "post",
    url: "/account/login/",
  });
};
