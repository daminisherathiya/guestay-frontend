import { axiosApi } from "@/axios/axios";

import { managePropertyPricingApiType } from "./managePropertyPricingApi.types";

export const managePropertyPricingApi = async ({
  data,
}: managePropertyPricingApiType) => {
  return await axiosApi({
    data: {
      holiday_end_at: data.holidayEndAt,
      holiday_id: data.holidayId,
      holiday_order: data.holidayOrder,
      holiday_price: data.holidayPrice,
      holiday_start_at: data.holidayStartAt,
      property_id: data.propertyId,
      season_end_at: data.seasonEndAt,
      season_id: data.seasonId,
      season_price: data.seasonPrice,
      season_start_at: data.seasonStartAt,
      season_weekend_price: data.seasonWeekendPrice,
      seasonal_order: data.seasonalOrder,
      user_id: data.userId,
      weekdays_price: data.weekdaysPrice,
      weekend_price: data.weekendPrice,
    },
    method: "post",
    url: "/property/manage_property_pricing/",
  });
};
