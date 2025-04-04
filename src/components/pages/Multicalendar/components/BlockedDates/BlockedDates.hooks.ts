import { useCallback, useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { deleteBlockOutDatesApi } from "@/apis/multiCalendar/deleteBlockOutDates";
import {
  deleteBlockOutDatesApiResponseType,
  deleteBlockOutDatesApiType,
} from "@/apis/multiCalendar/deleteBlockOutDates/deleteBlockOutDates.types";
import { getBlockOutDatesType } from "@/apis/multiCalendar/getBlockOutDatesApi/getBlockOutDatesApi.types";
import { useMulticalendarContext } from "@/hooks/useMulticalendar/useMulticalendar";
import { useMutation } from "@/hooks/useMutation";
import { getUserDetails } from "@/utils/localStorage/localStorage";

export function useBlockedDates() {
  const [selectedBlockedDatesDetails, setSelectedBlockedDatesDetails] =
    useState<getBlockOutDatesType>();
  const { blockedId }: { blockedId: string } = useParams();
  const router = useRouter();

  const {
    getBlockOutDatesApiData,
    getBlockOutDatesApiIsLoading,
    getBlockOutDatesApiIsSuccess,
    getBlockOutDatesApiRefetch,
    selectedPropertyValue,
  } = useMulticalendarContext();

  useEffect(() => {
    if (getBlockOutDatesApiIsSuccess) {
      const blockedDatesDetails = getBlockOutDatesApiData?.data?.find(
        (blockedDate) => blockedDate.id === blockedId,
      );
      setSelectedBlockedDatesDetails(blockedDatesDetails);
    }
  }, [blockedId, getBlockOutDatesApiData, getBlockOutDatesApiIsSuccess]);

  const {
    mutate: deleteBlockOutDatesApiMutate,
    isPending: deleteBlockOutDatesApiIsPending,
    isSuccess: deleteBlockOutDatesApiIsSuccess,
  } = useMutation<
    deleteBlockOutDatesApiResponseType,
    Error,
    deleteBlockOutDatesApiType
  >({
    mutationFn: deleteBlockOutDatesApi,
    mutationKey: ["delete-block-out-dates"],
  });

  const onDeleteBlockOutDates = useCallback(() => {
    deleteBlockOutDatesApiMutate({
      data: {
        id: blockedId,
        userId: getUserDetails().id,
      },
    });
  }, [blockedId, deleteBlockOutDatesApiMutate]);

  useEffect(() => {
    if (!deleteBlockOutDatesApiIsPending && deleteBlockOutDatesApiIsSuccess) {
      getBlockOutDatesApiRefetch();
      router.push(`/multicalendar/${selectedPropertyValue}/pricing-settings`);
    }
  }, [
    deleteBlockOutDatesApiIsPending,
    deleteBlockOutDatesApiIsSuccess,
    getBlockOutDatesApiRefetch,
    router,
    selectedPropertyValue,
  ]);

  return {
    deleteBlockOutDatesApiIsPending,
    getBlockOutDatesApiIsLoading,
    onDeleteBlockOutDates,
    selectedBlockedDatesDetails,
  };
}
