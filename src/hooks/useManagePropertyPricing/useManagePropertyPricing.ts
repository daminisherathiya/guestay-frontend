import { managePropertyPricingApi } from "@/apis/multiCalendar/managePropertyPricingApi/managePropertyPricingApi";
import {
  managePropertyPricingApiResponseType,
  managePropertyPricingApiType,
} from "@/apis/multiCalendar/managePropertyPricingApi/managePropertyPricingApi.types";

import { useMutation } from "../useMutation";

export function useManagePropertyPricing() {
  const {
    mutate: managePropertyPricingApiMutate,
    isPending: managePropertyPricingApiIsPending,
    isSuccess: managePropertyPricingApiIsSuccess,
  } = useMutation<
    managePropertyPricingApiResponseType,
    Error,
    managePropertyPricingApiType
  >({
    mutationFn: managePropertyPricingApi,
    mutationKey: ["save-property"],
  });
  return {
    managePropertyPricingApiIsPending,
    managePropertyPricingApiIsSuccess,
    managePropertyPricingApiMutate,
  };
}
