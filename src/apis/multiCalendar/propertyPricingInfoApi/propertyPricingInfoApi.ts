import { axiosApi } from "@/axios/axios";

import { propertyPricingInfoApiType } from "./propertyPricingInfoApi.types";

export const propertyPricingInfoApi = async ({
  data,
}: propertyPricingInfoApiType) => {
  return await axiosApi({
    data: {
      property_id: data.propertyId,
      user_id: data.userId,
    },
    method: "post",
    url: "/property/property_pricing_info/",
  });
};
