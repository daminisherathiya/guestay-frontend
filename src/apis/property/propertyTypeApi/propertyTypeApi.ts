import { axiosApi } from "@/axios/axios";

import { propertyTypeApiType } from "./propertyTypeApi.types";

export const propertyTypeApi = async ({ data }: propertyTypeApiType) => {
  return await axiosApi({
    data: {
      user_id: data.userId,
    },
    method: "post",
    url: "/property/get_property_type/",
  });
};
