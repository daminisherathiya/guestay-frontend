import { axiosApi } from "@/axios/axios";

import { propertyApiType } from "./propertyApi.type";

export const propertyApi = async ({ data }: propertyApiType) => {
  return await axiosApi({
    data: {
      // property_id: ,
      user_id: data.userId,
    },
    method: "post",
    url: "/property/get_property/",
  });
};
