import { axiosApi } from "@/axios/axios";

import { bedTypesApiType } from "./bedTypesApi.types";

export const bedTypesApi = async ({ data }: bedTypesApiType) => {
  return await axiosApi({
    data: {
      user_id: data.userId,
    },
    method: "post",
    url: "/property/get_bed_types/",
  });
};
