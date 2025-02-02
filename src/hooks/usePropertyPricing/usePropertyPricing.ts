import { useCallback, useEffect, useMemo, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import dayjs from "dayjs";

import { managePropertyPricingApi } from "@/apis/multiCalendar/managePropertyPricingApi";
import {
  managePropertyPricingApiResponseType,
  managePropertyPricingApiType,
} from "@/apis/multiCalendar/managePropertyPricingApi/managePropertyPricingApi.types";
import { DEFAULT_PRICE } from "@/components/pages/Price/Price.consts";
import { useGlobalPrices } from "@/hooks/useGlobalPrices";
import { useMulticalendarContext } from "@/hooks/useMulticalendar";
import { formatNumberWithCommas, numericValue } from "@/utils/common";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { useMutation } from "../useMutation";

import {
  getInitialPriceProps,
  onSubmitProps,
  usePropertyPricingProps,
} from "./usePropertyPricing.types";

export function usePropertyPricing({ pricing }: usePropertyPricingProps) {
  const { propertyId }: { propertyId: string } = useParams();

  const {
    isPropertyPricingInfoApiIsLoading,
    getSelectedDaysType,
    minMaxSelectedDatePrice,
    propertyPricingInfoApiData,
    propertyPricingInfoApiIsSuccess,
    propertyPricingInfoApiRefetch,
    weekdayPrice,
    weekendPrice,
  } = useMulticalendarContext();

  const getInitialPrice = ({ pricing }: getInitialPriceProps) => {
    if (pricing === "seasonal") {
      const priceRange = minMaxSelectedDatePrice();
      return priceRange.maxPrice === priceRange.minPrice
        ? String(priceRange.maxPrice)
        : "0";
    }
    return DEFAULT_PRICE;
  };

  const [price, setPrice] = useState<string>(getInitialPrice({ pricing }));
  const [propertyCommissionRate, setPropertyCommissionRate] =
    useState<string>("0");

  useEffect(() => {
    if (propertyPricingInfoApiData && propertyPricingInfoApiIsSuccess) {
      if (pricing !== "seasonal") {
        const selectedPrice =
          pricing === "weekday"
            ? propertyPricingInfoApiData.data.weekdays_price
            : propertyPricingInfoApiData.data.weekend_price;

        setPrice(formatNumberWithCommas(String(parseInt(selectedPrice))));
      }

      setPropertyCommissionRate(
        propertyPricingInfoApiData.data.commission_rate,
      );
    }
  }, [propertyPricingInfoApiData, propertyPricingInfoApiIsSuccess, pricing]);

  const {
    commissionPrice,
    globalPricesApiIsFirstLoading,
    handleInput,
    insurancePolicyPrice,
    priceError,
  } = useGlobalPrices({
    price,
    propertyCommissionRate,
    setPrice,
  });

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
    mutationKey: ["manage-property-pricing"],
  });

  const { selectedCells } = useMulticalendarContext();

  const getConsecutiveDateRanges = useCallback((dates: string[]) => {
    const sortedDates = [...dates].sort();
    const selectedCellsDateRanges: { endDate: string; startDate: string }[] =
      [];

    if (sortedDates.length === 0) return { endDates: [], startDates: [] };

    let rangeStart = sortedDates[0];
    let prevDate = sortedDates[0];

    for (let i = 1; i <= sortedDates.length; i++) {
      const currentDate = sortedDates[i];

      if (
        i === sortedDates.length ||
        dayjs(currentDate).diff(dayjs(prevDate), "day") > 1
      ) {
        selectedCellsDateRanges.push({
          endDate: prevDate,
          startDate: rangeStart,
        });

        if (i < sortedDates.length) {
          rangeStart = currentDate;
        }
      }

      prevDate = currentDate;
    }

    const startDates = selectedCellsDateRanges.map((range) => range.startDate);
    const endDates = selectedCellsDateRanges.map((range) => range.endDate);

    return {
      endDates,
      startDates,
    };
  }, []);

  const { endDates, startDates } = useMemo(
    () =>
      pricing === "seasonal"
        ? getConsecutiveDateRanges(selectedCells)
        : { endDates: undefined, startDates: undefined },
    [getConsecutiveDateRanges, pricing, selectedCells],
  );

  const onSubmit = useCallback(
    ({ seasonalWeekdayPrice, seasonalWeekendPrice }: onSubmitProps) => {
      const holidayData = propertyPricingInfoApiData?.data?.holiday || [];
      const existingHolidays = holidayData.map((holiday, index) => ({
        endAt: holiday.end_at,
        id: holiday.id,
        order: String(index + 1),
        price: parseInt(holiday.price),
        startAt: holiday.start_at,
        weekendPrice: parseInt(holiday.price),
      }));

      const seasonalData = propertyPricingInfoApiData?.data?.seasonal || [];
      const existingSeasons = seasonalData.map((season, index) => ({
        endAt: season.end_at,
        id: season.id,
        order: String(index + 1 + existingHolidays.length),
        price: parseInt(season.price),
        startAt: season.start_at,
        weekendPrice: parseInt(season.weekend_price),
      }));

      const newSeasonsCount = startDates?.length || 0;

      const newSeasonOrders = Array.from({ length: newSeasonsCount }, (_, i) =>
        String(i + 1 + existingHolidays.length + existingSeasons.length),
      );

      managePropertyPricingApiMutate({
        data: {
          propertyId,
          seasonalOrder: [
            ...existingHolidays.map((existingHoliday) => existingHoliday.order),
            ...existingSeasons.map((existingSeason) => existingSeason.order),
            ...(pricing === "seasonal" ? newSeasonOrders : []),
          ],
          seasonEndAt: [
            ...existingHolidays.map((existingHoliday) => existingHoliday.endAt),
            ...existingSeasons.map((existingSeason) => existingSeason.endAt),
            ...(pricing === "seasonal" ? endDates || [] : []),
          ],
          seasonId: [
            ...existingHolidays.map(() => 0),
            ...existingSeasons.map((existingSeason) => existingSeason.id),
            ...(pricing === "seasonal" ? Array(newSeasonsCount).fill(0) : []),
          ],
          seasonPrice: [
            ...existingHolidays.map((existingHoliday) => existingHoliday.price),
            ...existingSeasons.map((existingSeason) => existingSeason.price),
            ...(pricing === "seasonal"
              ? Array(newSeasonsCount).fill(numericValue(seasonalWeekdayPrice!))
              : []),
          ],
          seasonStartAt: [
            ...existingHolidays.map(
              (existingHoliday) => existingHoliday.startAt,
            ),
            ...existingSeasons.map((existingSeason) => existingSeason.startAt),
            ...(pricing === "seasonal" ? startDates || [] : []),
          ],
          seasonWeekendPrice: [
            ...existingHolidays.map(
              (existingHoliday) => existingHoliday.weekendPrice,
            ),
            ...existingSeasons.map(
              (existingSeason) => existingSeason.weekendPrice,
            ),
            ...(pricing === "seasonal"
              ? Array(newSeasonsCount).fill(numericValue(seasonalWeekendPrice!))
              : []),
          ],
          userId: getUserDetails().id,
          weekdaysPrice:
            pricing === "weekday" ? numericValue(price) : weekdayPrice,
          weekendPrice:
            pricing === "weekend" ? numericValue(price) : weekendPrice,
        },
      });
    },
    [
      endDates,
      managePropertyPricingApiMutate,
      price,
      pricing,
      propertyId,
      propertyPricingInfoApiData,
      startDates,
      weekdayPrice,
      weekendPrice,
    ],
  );

  const router = useRouter();

  useEffect(() => {
    if (
      !managePropertyPricingApiIsPending &&
      managePropertyPricingApiIsSuccess
    ) {
      propertyPricingInfoApiRefetch();
      if (pricing === "seasonal") {
        router.push(`/multicalendar/${propertyId}/edit-selected-dates`);
      } else {
        router.push(`/multicalendar/${propertyId}/pricing-settings`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [managePropertyPricingApiIsPending, managePropertyPricingApiIsSuccess]);

  const isDisabled =
    priceError != "" ||
    managePropertyPricingApiIsPending ||
    globalPricesApiIsFirstLoading ||
    isPropertyPricingInfoApiIsLoading ||
    !propertyPricingInfoApiIsSuccess;

  const isLoading =
    globalPricesApiIsFirstLoading || managePropertyPricingApiIsPending;

  return {
    commissionPrice,
    getSelectedDaysType: getSelectedDaysType(),
    globalPricesApiIsFirstLoading,
    handleInput,
    hasWeekendPrice: Number(weekendPrice) > 1,
    insurancePolicyPrice,
    isDisabled,
    isLoading,
    isPropertyPricingInfoApiIsLoading,
    managePropertyPricingApiIsPending,
    onSubmit,
    price,
    priceError,
    setPrice,
    weekdayPrice,
    weekendPrice,
  };
}
