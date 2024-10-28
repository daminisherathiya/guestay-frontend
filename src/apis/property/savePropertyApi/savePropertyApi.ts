/* eslint-disable sort-keys */
import { axiosApi } from "@/axios/axios";

import { type SavePropertyApiType } from "./savePropertyApi.types";

export const savePropertyApi = async ({ data }: SavePropertyApiType) => {
  return await axiosApi({
    data: {
      user_id: data.userId,
      property_id: data.propertyId,
      listing_step: data.listingStep,
      type: data.type,
      location: data.location,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      bedrooms_info: data.bedroomsInfo,
      no_of_couples: data.noOfCouples,
      no_of_children: data.noOfChildren,
      num_of_people: data.numOfPeople,
      bedroom: data.bedroom,
      beds: data.beds,
      baths: data.baths,
      cribs: data.cribs,
      amenities: data.amenities,
      images: data.images,
      title: data.title,
      description: data.description,
      weekdays_price: data.weekdaysPrice,
      discount_days: data.discountDays,
      discount_rate: data.discountRate,
    },
    method: "post",
    url: "/property/save/",
  });
};
