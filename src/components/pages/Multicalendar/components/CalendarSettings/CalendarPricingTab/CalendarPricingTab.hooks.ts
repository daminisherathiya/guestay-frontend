import { useParams } from "next/navigation";

import { managePropertyPricingApi } from "@/apis/multiCalendar/managePropertyPricingApi";
import { useMulticalendarContext } from "@/hooks/useMulticalendar";
import { useMutation } from "@/hooks/useMutation";
import { getUserDetails } from "@/utils/localStorage/localStorage";

export function useCalendarPricingTab() {
  const { propertyId }: { propertyId: string } = useParams();

  const {
    propertyPricingInfoApiIsFirstLoading,
    weekdaysPrice,
    weekendPrice,
    setWeekendPrice,
  } = useMulticalendarContext();

  const {
    mutate: managePropertyPricingApiMutate,
    isPending: managePropertyPricingApiIsPending,
  } = useMutation({
    mutationFn: managePropertyPricingApi,
    mutationKey: ["save-property"],
  });

  const handleRemoveWeekendPrice = () => {
    managePropertyPricingApiMutate(
      {
        data: {
          propertyId: propertyId,
          userId: getUserDetails().id,
          weekdaysPrice: weekdaysPrice.toString(),
          weekendPrice: "1",
        },
      },
      {
        onSuccess: () => {
          setWeekendPrice(1);
        },
      },
    );
  };

  return {
    handleRemoveWeekendPrice,
    managePropertyPricingApiIsPending,
    propertyPricingInfoApiIsFirstLoading,
    weekdaysPrice,
    weekendPrice,
  };
}
