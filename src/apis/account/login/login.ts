import { axiosApi } from "@/axios/axios";

import { type LoginType } from "./login.types";

export const login = async ({ email, password }: LoginType) => {
  return await axiosApi({
    data: {
      email: email,
      password: password,
    },
    method: "post",
    url: "/account/login/",
  });
};
