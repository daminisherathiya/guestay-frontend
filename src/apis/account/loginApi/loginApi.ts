import { axiosApi } from "@/axios/axios";

import { type LogInApiType } from "./loginApi.types";

export const logInApi = async ({ data }: LogInApiType) => {
  return await axiosApi({
    data: {
      email: data.email,
      password: data.password,
    },
    method: "post",
    url: "/account/login/",
  });
};
