import { axiosApi } from "@/axios/axios";

import { getBlockOutDatesApiType } from "./getBlockOutDatesApi.types";

export const getBlockOutDatesApi = async ({
  data,
}: getBlockOutDatesApiType) => {
  return await axiosApi({
    data: {
      end_date: data.endDate,
      property_id: data.propertyId,
      start_date: data.startDate,
      user_id: data.userId,
    },
    method: "post",
    url: "/property/get_block_out_dates",
  });
};
