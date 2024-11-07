import { axiosApi } from "@/axios/axios";

import { locationsApiType } from "./locationsApi.types";

export const locationsApi = async ({ data }: locationsApiType) => {
  return await axiosApi({
    data: {
      user_id: data.userId,
    },
    method: "post",
    url: "/property/get_locations",
  });
};
