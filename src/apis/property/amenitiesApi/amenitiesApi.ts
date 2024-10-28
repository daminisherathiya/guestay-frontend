import { axiosApi } from "@/axios/axios";

import { amenitiesApiType } from "./amenitiesApi.type";

export const amenitiesApi = async ({ data }: amenitiesApiType) => {
  return await axiosApi({
    data: {
      user_id: data.userId,
    },
    method: "post",
    url: "/property/get_amenities/",
  });
};
