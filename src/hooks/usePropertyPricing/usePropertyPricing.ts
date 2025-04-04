import { useCallback, useEffect, useMemo, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { managePropertyPricingApi } from "@/apis/multiCalendar/managePropertyPricingApi";
import {
  managePropertyPricingApiResponseType,
  managePropertyPricingApiType,
} from "@/apis/multiCalendar/managePropertyPricingApi/managePropertyPricingApi.types";
import { DEFAULT_PRICE } from "@/components/pages/Price/Price.consts";
import { useGlobalPrices } from "@/hooks/useGlobalPrices";
import { useMulticalendarContext } from "@/hooks/useMulticalendar";
import { WEEKEND_PRICE_NOT_SET_PLACEHOLDER_VALUE } from "@/providers/MulticalendarProvider/MulticalendarProvider.consts";
import { formatNumberWithCommas, numericValue } from "@/utils/common";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { useMutation } from "../useMutation";

import {
  onSubmitProps,
  usePropertyPricingProps,
} from "./usePropertyPricing.types";

export function usePropertyPricing({ pricing }: usePropertyPricingProps) {
  const { propertyId }: { propertyId: string } = useParams();

  const {
    getConsecutiveDateRanges,
    propertyPricingInfoApiIsLoading,
    minMaxSelectedDatePrice,
    propertyPricingInfoApiData,
    propertyPricingInfoApiIsSuccess,
    propertyPricingInfoApiRefetch,
    selectedDaysType,
    weekdayPrice,
    weekendPrice,
  } = useMulticalendarContext();

  const isSeasonalPricing = useMemo(
    () => pricing === "seasonal_weekday" || pricing === "seasonal_weekend",
    [pricing],
  );

  const getInitialPrice = useCallback(() => {
    if (isSeasonalPricing) {
      const priceRange = minMaxSelectedDatePrice();
      return priceRange.maxPrice === priceRange.minPrice
        ? String(priceRange.maxPrice)
        : "0";
    }
    return DEFAULT_PRICE;
  }, [isSeasonalPricing, minMaxSelectedDatePrice]);

  const [price, setPrice] = useState<string>(getInitialPrice());
  const [propertyCommissionRate, setPropertyCommissionRate] =
    useState<string>("0");

  useEffect(() => {
    if (propertyPricingInfoApiData && propertyPricingInfoApiIsSuccess) {
      let selectedPrice;

      if (isSeasonalPricing) {
        if (selectedDaysType === "weekday" && pricing === "seasonal_weekend") {
          selectedPrice = propertyPricingInfoApiData.data.weekend_price;
        } else if (
          selectedDaysType === "weekend" &&
          pricing === "seasonal_weekday"
        ) {
          selectedPrice = propertyPricingInfoApiData.data.weekdays_price;
        }
      } else {
        selectedPrice =
          pricing === "weekday"
            ? propertyPricingInfoApiData.data.weekdays_price
            : propertyPricingInfoApiData.data.weekend_price;
      }
      if (selectedPrice) {
        setPrice(formatNumberWithCommas(String(parseInt(selectedPrice))));
      }

      setPropertyCommissionRate(
        propertyPricingInfoApiData.data.commission_rate,
      );
    }
  }, [
    isSeasonalPricing,
    propertyPricingInfoApiData,
    propertyPricingInfoApiIsSuccess,
    pricing,
    selectedDaysType,
  ]);

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

  const { endDates, startDates } = useMemo(
    () =>
      isSeasonalPricing
        ? getConsecutiveDateRanges()
        : { endDates: undefined, startDates: undefined },
    [getConsecutiveDateRanges, isSeasonalPricing],
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
            ...(isSeasonalPricing ? newSeasonOrders : []),
          ],
          seasonEndAt: [
            ...existingHolidays.map((existingHoliday) => existingHoliday.endAt),
            ...existingSeasons.map((existingSeason) => existingSeason.endAt),
            ...(isSeasonalPricing ? endDates || [] : []),
          ],
          seasonId: [
            ...existingHolidays.map(() => 0),
            ...existingSeasons.map((existingSeason) => existingSeason.id),
            ...(isSeasonalPricing ? Array(newSeasonsCount).fill(0) : []),
          ],
          seasonPrice: [
            ...existingHolidays.map((existingHoliday) => existingHoliday.price),
            ...existingSeasons.map((existingSeason) => existingSeason.price),
            ...(isSeasonalPricing
              ? Array(newSeasonsCount).fill(numericValue(seasonalWeekdayPrice!))
              : []),
          ],
          seasonStartAt: [
            ...existingHolidays.map(
              (existingHoliday) => existingHoliday.startAt,
            ),
            ...existingSeasons.map((existingSeason) => existingSeason.startAt),
            ...(isSeasonalPricing ? startDates || [] : []),
          ],
          seasonWeekendPrice: [
            ...existingHolidays.map(
              (existingHoliday) => existingHoliday.weekendPrice,
            ),
            ...existingSeasons.map(
              (existingSeason) => existingSeason.weekendPrice,
            ),
            ...(isSeasonalPricing
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
      isSeasonalPricing,
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
      if (isSeasonalPricing) {
        router.push(`/multicalendar/${propertyId}/edit-selected-dates`);
      } else {
        router.push(`/multicalendar/${propertyId}/pricing-settings`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isSeasonalPricing,
    managePropertyPricingApiIsPending,
    managePropertyPricingApiIsSuccess,
  ]);

  const isDisabled = useMemo(
    () =>
      priceError != "" ||
      managePropertyPricingApiIsPending ||
      globalPricesApiIsFirstLoading ||
      propertyPricingInfoApiIsLoading ||
      !propertyPricingInfoApiIsSuccess,
    [
      priceError,
      managePropertyPricingApiIsPending,
      globalPricesApiIsFirstLoading,
      propertyPricingInfoApiIsLoading,
      propertyPricingInfoApiIsSuccess,
    ],
  );

  const isLoading = useMemo(
    () => globalPricesApiIsFirstLoading || managePropertyPricingApiIsPending,
    [globalPricesApiIsFirstLoading, managePropertyPricingApiIsPending],
  );

  const hasWeekendPrice = useMemo(
    () =>
      Number(weekendPrice) > Number(WEEKEND_PRICE_NOT_SET_PLACEHOLDER_VALUE),
    [weekendPrice],
  );

  return {
    commissionPrice,
    globalPricesApiIsFirstLoading,
    handleInput,
    hasWeekendPrice: hasWeekendPrice,
    insurancePolicyPrice,
    isDisabled,
    isLoading,
    managePropertyPricingApiIsPending,
    onSubmit,
    price,
    priceError,
    propertyPricingInfoApiIsLoading,
    selectedDaysType,
    setPrice,
    weekdayPrice,
    weekendPrice,
  };
}
