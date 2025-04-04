import { axiosApi } from "@/axios/axios";

import { saveBlockOutDatesApiType } from "./saveBlockOutDatesApi.types";

export const saveBlockOutDatesApi = async ({
  data,
}: saveBlockOutDatesApiType) => {
  return await axiosApi({
    data: {
      end_date: data.endDate,
      id: data.id,
      note: data.note,
      property_id: data.propertyId,
      start_date: data.startDate,
      type: data.type,
      user_id: data.userId,
    },
    method: "post",
    url: "/property/save_block_out_dates",
  });
};
