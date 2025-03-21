import { axiosApi } from "@/axios/axios";

import { globalPricesApiType } from "./globalPricesApi.types";

export const globalPricesApi = async ({ data }: globalPricesApiType) => {
  return await axiosApi({
    data: {
      user_id: data.userId,
    },
    method: "post",
    url: "/property/get_global_prices/",
  });
};
