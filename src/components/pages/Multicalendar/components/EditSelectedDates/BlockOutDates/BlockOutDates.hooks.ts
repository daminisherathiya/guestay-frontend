import { useCallback, useEffect, useMemo, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useForm } from "react-hook-form";

import { deleteBlockOutDatesApi } from "@/apis/multiCalendar/deleteBlockOutDates";
import {
  deleteBlockOutDatesApiResponseType,
  deleteBlockOutDatesApiType,
} from "@/apis/multiCalendar/deleteBlockOutDates/deleteBlockOutDates.types";
import { getBlockOutDatesType } from "@/apis/multiCalendar/getBlockOutDatesApi/getBlockOutDatesApi.types";
import { saveBlockOutDatesApi } from "@/apis/multiCalendar/saveBlockOutDatesApi";
import {
  saveBlockOutDatesApiResponseType,
  saveBlockOutDatesApiType,
} from "@/apis/multiCalendar/saveBlockOutDatesApi/saveBlockOutDatesApi.types";
import { useMulticalendarContext } from "@/hooks/useMulticalendar";
import { useMutation } from "@/hooks/useMutation";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { onSubmitType } from "./BlockOutDates.types";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export function useBlockOutDates() {
  const router = useRouter();
  const { blockedId }: { blockedId: string } = useParams();
  const [selectedCellsOrEventCells, setSelectedCellsOrEventCells] = useState<
    string[]
  >([]);
  const [selectedBlockedDatesDetails, setSelectedBlockedDatesDetails] =
    useState<getBlockOutDatesType | undefined>();

  const {
    events,
    getBlockOutDatesApiData,
    getBlockOutDatesApiIsLoading,
    getBlockOutDatesApiIsSuccess,
    getBlockOutDatesApiRefetch,
    getConsecutiveDateRanges,
    selectedCells,
    selectedPropertyValue,
  } = useMulticalendarContext();

  useEffect(() => {
    setSelectedCellsOrEventCells(selectedCells);
  }, [selectedCells]);

  useEffect(() => {
    if (blockedId && !getBlockOutDatesApiIsLoading && getBlockOutDatesApiIsSuccess) {
      const blockedDatesDetails = getBlockOutDatesApiData?.data?.find(
        (blockedDate) => blockedDate.id === blockedId,
      );
      setSelectedBlockedDatesDetails(blockedDatesDetails);
      const selectedCells = [];
      for (
        let i = dayjs(blockedDatesDetails?.start_date);
        i <= dayjs(blockedDatesDetails?.end_date);
        i = i.add(1, "day")
      ) {
        selectedCells.push(i.format("YYYY-MM-DD"));
      }
      setSelectedCellsOrEventCells(selectedCells);
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
    mutationKey: ["delete-block-out-dates", blockedId],
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
      router.push(`/multicalendar/${selectedPropertyValue}/pricing-settings`);
      setTimeout(() => {
        getBlockOutDatesApiRefetch();
      }, 1000);
    }
  }, [
    deleteBlockOutDatesApiIsPending,
    deleteBlockOutDatesApiIsSuccess,
    getBlockOutDatesApiRefetch,
    router,
    selectedPropertyValue,
  ]);

  const overlappingEventTypes = useMemo(() => {
    const selectedDates = getConsecutiveDateRanges({
      passedDates: selectedCellsOrEventCells,
    });
    const overlappingEvents = events.filter((event) => {
      if (
        (event.type === "checkin" || event.type === "checkout") &&
        event.id === blockedId
      ) {
        // While editing, it should not consider itself as an overlapping event
        return false;
      }

      const eventDates = {
        end: dayjs(event.end || event.start).subtract(1, "day"),
        start: dayjs(event.start),
      };

      return selectedDates.startDates.some((_, index) => {
        const selectedStart = selectedDates.startDates[index];
        const selectedEnd = selectedDates.endDates[index];
        const eventStart = dayjs(eventDates.start);
        const eventEnd = dayjs(eventDates.end);

        const eventContainsSelected =
          eventStart.isSameOrBefore(selectedStart) &&
          eventEnd.isSameOrAfter(selectedEnd);

        const selectedContainsEvent =
          dayjs(selectedStart).isSameOrBefore(eventStart) &&
          dayjs(selectedEnd).isSameOrAfter(eventEnd);

        const eventStartsBeforeAndOverlaps =
          eventStart.isBefore(selectedStart) &&
          eventEnd.isSameOrAfter(selectedStart);

        const selectedStartsBeforeAndOverlaps =
          dayjs(selectedStart).isBefore(eventStart) &&
          dayjs(selectedEnd).isSameOrAfter(eventStart);

        return (
          eventContainsSelected ||
          selectedContainsEvent ||
          eventStartsBeforeAndOverlaps ||
          selectedStartsBeforeAndOverlaps
        );
      });
    });

    return overlappingEvents.map((event) => event.type);
  }, [blockedId, events, getConsecutiveDateRanges, selectedCellsOrEventCells]);
  console.log(
    "🚀 ~ overlappingEventTypes ~ overlappingEventTypes:",
    overlappingEventTypes,
  );

  const overlappingCheckInEventIsPresent = useMemo(() => {
    return overlappingEventTypes.includes("checkin");
  }, [overlappingEventTypes]);

  const overlappingCheckOutEventIsPresent = useMemo(() => {
    return overlappingEventTypes.includes("checkout");
  }, [overlappingEventTypes]);

  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
    setValue,
  } = useForm<onSubmitType>({
    defaultValues: {
      note: selectedBlockedDatesDetails?.note || "",
      type:
        selectedBlockedDatesDetails?.type ||
        (overlappingEventTypes.includes("checkout") &&
        overlappingEventTypes.includes("checkin")
          ? undefined
          : overlappingEventTypes.includes("checkin")
            ? "checkout"
            : "checkin"),
    },
    mode: "onChange",
  });

  useEffect(() => {
    setValue("note", selectedBlockedDatesDetails?.note || "");
    setValue(
      "type",
      selectedBlockedDatesDetails?.type ||
        (overlappingEventTypes.includes("checkout") &&
        overlappingEventTypes.includes("checkin")
          ? undefined
          : overlappingEventTypes.includes("checkin") ? "checkout" : "checkin"),
    );
  }, [overlappingEventTypes, selectedBlockedDatesDetails]);

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
    mutationKey: ["save-block-out-dates", blockedId],
  });

  useEffect(() => {
    if (!saveBlockOutDatesApiIsPending && saveBlockOutDatesApiIsSuccess) {
      router.push(`/multicalendar/${selectedPropertyValue}/pricing-settings`);
      setTimeout(() => {
        getBlockOutDatesApiRefetch();
      }, 1000);
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
      const consecutiveDates = getConsecutiveDateRanges({
        passedDates: selectedCellsOrEventCells,
      });
      const startDates = consecutiveDates.startDates;
      const endDates = consecutiveDates.endDates;
      saveBlockOutDatesApiMutate({
        data: {
          endDate: endDates,
          id: Array(startDates.length).fill(blockedId || 0),
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
      blockedId,
      getConsecutiveDateRanges,
      saveBlockOutDatesApiMutate,
      selectedCellsOrEventCells,
      selectedPropertyValue,
    ],
  );

  return {
    blockedId,
    control,
    deleteBlockOutDatesApiIsPending,
    getBlockOutDatesApiIsLoading,
    handleSubmit,
    isValid,
    onDeleteBlockOutDates,
    onSubmit,
    overlappingCheckInEventIsPresent,
    overlappingCheckOutEventIsPresent,
    saveBlockOutDatesApiIsPending,
    selectedBlockedDatesDetails,
    selectedCellsOrEventCells,
  };
}
