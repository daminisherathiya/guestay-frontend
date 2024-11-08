import { axiosApi } from "@/axios/axios";

import { listingPropertiesApiType } from "./listingPropertiesApi.types";

export const listingPropertiesApi = async ({
  data,
}: listingPropertiesApiType) => {
  return await axiosApi({
    data: {
      user_id: data.userId,
    },
    method: "post",
    url: "/property/get_listing_properties",
  });
};
