import { axiosApi } from "@/axios/axios";

import { type LogOutApiType } from "./logOutApi.types";

export const logOutApi = async ({ data }: LogOutApiType) => {
  return await axiosApi({
    data: {
      user_id: data.userId,
    },
    method: "post",
    url: "/account/logout/",
  });
};
