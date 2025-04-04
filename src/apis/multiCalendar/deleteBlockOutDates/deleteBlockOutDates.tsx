import { axiosApi } from "@/axios/axios";

import { deleteBlockOutDatesApiType } from "./deleteBlockOutDates.types";

export const deleteBlockOutDatesApi = async ({
  data,
}: deleteBlockOutDatesApiType) => {
  return await axiosApi({
    data: {
      id: data.id,
      user_id: data.userId,
    },
    method: "post",
    url: "/property/delete_block_out_dates",
  });
};
