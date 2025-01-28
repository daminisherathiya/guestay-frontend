import { axiosApi } from "@/axios/axios";

import { allBookingsApiType } from "./allBookingsApi.types";

export const allBookingsApi = async ({ data }: allBookingsApiType) => {
  return await axiosApi({
    data: {
      end_date: data.endDate,
      only_my_bookings: 0,
      property_id: data.propertyId,
      start_date: data.startDate,
      user_id: data.userId,
    },
    method: "post",
    url: "/booking/get_all",
  });
};
