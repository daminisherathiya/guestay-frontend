import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import dayjs from "dayjs";

import { allBookings } from "@/apis/multiCalendar/allBookingsApi/allBookingsApi.types";
import { useMulticalendarContext } from "@/hooks/useMulticalendar";
import { useToggle } from "@/hooks/useToggle";
import { getUserInitial } from "@/utils/common";

import {
  determineGuestBookingStatusProps,
  formatBookingDateRangeProps,
} from "./useReservationWithConfirmationCode.types";

export function useReservationWithConfirmationCode() {
  const { confirmationCode }: { confirmationCode: string } = useParams();

  const { toggle: toggleIsBreakdownShow, value: isBreakdownShow } = useToggle({
    initialValue: false,
  });

  const [selectedBookingDetails, setSelectedBookingDetails] =
    useState<allBookings>();
  const [formattedBookingDateRange, setFormattedBookingDateRange] =
    useState<string>("");
  const [guestBookingStatus, setGuestBookingStatus] = useState<string>();
  const [guestNameInitialLater, setGuestNameInitialLater] = useState<string>();

  const {
    allBookingsApiData,
    allBookingsApiIsFirstLoading,
    allBookingsApiIsSuccess,
  } = useMulticalendarContext();

  const formatBookingDateRange = ({
    checkin,
    checkout,
  }: formatBookingDateRangeProps) => {
    const startDate = dayjs(checkin);
    const endDate = dayjs(checkout);
    const nights = endDate.diff(startDate, "day");

    return `${startDate.format("D MMM")} - ${endDate.format("D MMM")} (${nights} ${nights === 1 ? "night" : "nights"})`;
  };

  const determineGuestBookingStatus = ({
    bookingStatus,
    checkin,
    checkout,
  }: determineGuestBookingStatusProps) => {
    const now = dayjs();
    const checkInDate = dayjs(checkin);
    const checkOutDate = dayjs(checkout);

    if (now.isBefore(checkInDate)) {
      return bookingStatus === "booked" ? "Confirmed" : bookingStatus;
    } else if (now.isAfter(checkOutDate)) {
      return "Past guest";
    } else {
      return "Currently hosting";
    }
  };

  useEffect(() => {
    if (allBookingsApiIsSuccess) {
      const bookingDetails = allBookingsApiData?.data?.allBookings?.find(
        (booking) => booking.id === confirmationCode,
      );
      setSelectedBookingDetails(bookingDetails);

      if (bookingDetails) {
        const dateRange = formatBookingDateRange({
          checkin: bookingDetails.checkin,
          checkout: bookingDetails.checkout,
        });
        setFormattedBookingDateRange(dateRange);

        const status = determineGuestBookingStatus({
          bookingStatus: bookingDetails.status,
          checkin: bookingDetails.checkin,
          checkout: bookingDetails.checkout,
        });
        setGuestBookingStatus(status);

        setGuestNameInitialLater(getUserInitial(bookingDetails.guest_name));
      }
    }
  }, [
    allBookingsApiIsSuccess,
    allBookingsApiData?.data?.allBookings,
    confirmationCode,
  ]);

  return {
    allBookingsApiIsFirstLoading,
    formattedBookingDateRange,
    guestBookingStatus,
    guestNameInitialLater,
    isBreakdownShow,
    selectedBookingDetails,
    toggleIsBreakdownShow,
  };
}
