import { axiosApi } from "@/axios/axios";

import { holidaysApiType } from "./holidaysApi.types";

export const holidaysApi = async ({ data }: holidaysApiType) => {
  return await axiosApi({
    data: {
      user_id: data.userId,
    },
    method: "post",
    url: "/property/get_holidays",
  });
};
