import { axiosApi } from "@/axios/axios";

import { propertyApiType } from "./propertyApi.types";

export const propertyApi = async ({ data }: propertyApiType) => {
  return await axiosApi({
    data: {
      property_id: data.propertyId,
      user_id: data.userId,
    },
    method: "post",
    url: "/property/get_property/",
  });
};
