import { useCallback, useEffect } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { saveBlockOutDatesApi } from "@/apis/multiCalendar/saveBlockOutDatesApi";
import {
  saveBlockOutDatesApiResponseType,
  saveBlockOutDatesApiType,
} from "@/apis/multiCalendar/saveBlockOutDatesApi/saveBlockOutDatesApi.types";
import { useMulticalendarContext } from "@/hooks/useMulticalendar";
import { useMutation } from "@/hooks/useMutation";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { onSubmitType } from "./BlockOutDates.types";

export function useBlockOutDates() {
  const {
    selectedPropertyValue,
    getConsecutiveDateRanges,
    getBlockOutDatesApiRefetch,
  } = useMulticalendarContext();

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm<onSubmitType>({
    defaultValues: {
      note: "",
      type: "checkin",
    },
    mode: "onChange",
  });

  const router = useRouter();

  const {
    mutate: saveBlockOutDatesApiMutate,
    isPending: saveBlockOutDatesApiIsPending,
    isSuccess: saveBlockOutDatesApiIsSuccess,
  } = useMutation<
    saveBlockOutDatesApiResponseType,
    Error,
    saveBlockOutDatesApiType
  >({
    mutationFn: saveBlockOutDatesApi,
    mutationKey: ["save-block-out-dates"],
  });

  useEffect(() => {
    if (!saveBlockOutDatesApiIsPending && saveBlockOutDatesApiIsSuccess) {
      getBlockOutDatesApiRefetch();
      router.push(`/multicalendar/${selectedPropertyValue}/pricing-settings`);
    }
  }, [
    saveBlockOutDatesApiIsPending,
    saveBlockOutDatesApiIsSuccess,
    getBlockOutDatesApiRefetch,
    router,
    selectedPropertyValue,
  ]);

  // useEffect(() => {
  //   if (!selectedCells || selectedCells.length === 0) {
  //     router.push("./pricing-settings");
  //   }
  // }, [router, selectedCells]);

  const onSubmit = useCallback(
    (data: onSubmitType) => {
      const startDates = getConsecutiveDateRanges().startDates;
      const endDates = getConsecutiveDateRanges().endDates;
      saveBlockOutDatesApiMutate({
        data: {
          endDate: endDates,
          id: Array(startDates.length).fill(0),
          note: Array(startDates.length).fill(data.note),
          propertyId: Array(startDates.length).fill(
            String(selectedPropertyValue),
          ),
          startDate: startDates,
          type: Array(startDates.length).fill(data.type),
          userId: getUserDetails().id,
        },
      });
    },
    [
      getConsecutiveDateRanges,
      saveBlockOutDatesApiMutate,
      selectedPropertyValue,
    ],
  );

  return {
    control,
    handleSubmit,
    isValid,
    onSubmit,
    saveBlockOutDatesApiIsPending,
  };
}
