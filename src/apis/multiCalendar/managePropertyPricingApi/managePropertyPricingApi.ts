import { axiosApi } from "@/axios/axios";

import { managePropertyPricingApiType } from "./managePropertyPricingApi.types";

export const managePropertyPricingApi = async ({
  data,
}: managePropertyPricingApiType) => {
  const getHolidaysData = () => {
    if (
      data.holidayEndAt !== undefined &&
      data.holidayId !== undefined &&
      data.holidayOrder !== undefined &&
      data.holidayPrice !== undefined &&
      data.holidayStartAt !== undefined
    ) {
      return {
        holiday_end_at: data.holidayEndAt,
        holiday_id: data.holidayId,
        holiday_order: data.holidayOrder,
        holiday_price: data.holidayPrice,
        holiday_start_at: data.holidayStartAt,
      };
    }
    return {};
  };

  const getSeasonsData = () => {
    if (
      data.seasonEndAt !== undefined &&
      data.seasonId !== undefined &&
      data.seasonPrice !== undefined &&
      data.seasonStartAt !== undefined &&
      data.seasonWeekendPrice !== undefined &&
      data.seasonalOrder !== undefined
    ) {
      return {
        season_end_at: data.seasonEndAt,
        season_id: data.seasonId,
        season_price: data.seasonPrice,
        season_start_at: data.seasonStartAt,
        season_weekend_price: data.seasonWeekendPrice,
        seasonal_order: data.seasonalOrder,
      };
    }
    return {};
  };

  const requestData = {
    ...getHolidaysData(),
    ...getSeasonsData(),
    property_id: data.propertyId,
    user_id: data.userId,
    weekdays_price: data.weekdaysPrice,
    weekend_price: data.weekendPrice,
  };

  return await axiosApi({
    data: requestData,
    method: "post",
    url: "/property/manage_property_pricing/",
  });
};
