import { useParams } from "next/navigation";

import { managePropertyPricingApi } from "@/apis/multiCalendar/managePropertyPricingApi";
import { useMulticalendarContext } from "@/hooks/useMulticalendar";
import { useMutation } from "@/hooks/useMutation";
import { getUserDetails } from "@/utils/localStorage/localStorage";

export function useCalendarPricingTab() {
  const { propertyId }: { propertyId: string } = useParams();

  const {
    isPropertyPricingInfoApiIsLoading,
    propertyPricingInfoApiRefetch,
    weekdayPrice,
    weekendPrice,
  } = useMulticalendarContext();

  const {
    mutate: managePropertyPricingApiMutate,
    isPending: managePropertyPricingApiIsPending,
  } = useMutation({
    mutationFn: managePropertyPricingApi,
    mutationKey: ["manage_property_pricing"],
  });

  const handleRemoveWeekendPrice = () => {
    managePropertyPricingApiMutate(
      {
        data: {
          propertyId: propertyId,
          userId: getUserDetails().id,
          weekdaysPrice: weekdayPrice,
          weekendPrice: "1",
        },
      },
      {
        onSuccess: () => {
          propertyPricingInfoApiRefetch();
        },
      },
    );
  };

  return {
    handleRemoveWeekendPrice,
    hasWeekendPrice: Number(weekendPrice) > 1,
    isPropertyPricingInfoApiIsLoading,
    managePropertyPricingApiIsPending,
    weekdayPrice,
    weekendPrice,
  };
}
