import { useCallback, useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import {
  DateSelectArg,
  DayCellContentArg,
  EventClickArg,
  EventContentArg,
  EventDropArg,
} from "@fullcalendar/core/index.js";
import { EventResizeDoneArg } from "@fullcalendar/interaction/index.js";
import FullCalendar from "@fullcalendar/react";
import dayjs from "dayjs";

import { holidaysApi } from "@/apis/multiCalendar/holidaysApi";
import { holidaysApiResponseType } from "@/apis/multiCalendar/holidaysApi/holidaysApi.types";
import { useMulticalendarContext } from "@/hooks/useMulticalendar";
import { useQuery } from "@/hooks/useQuery";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { CalendarEvent, useHostCalendarProps } from "./HostCalendar.types";

export function useHostCalendar({
  blockedDates,
  propertyId,
  setSelectedCells,
  selectedCells,
}: useHostCalendarProps) {
  const calendarContainerRef = useRef<FullCalendar | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const {
    allBookingsApiData,
    allBookingsApiIsSuccess,
    calendarEndMonth,
    calendarStartMonth,
    todaysDate,
  } = useMulticalendarContext();

  const { data: holidaysApiData, isSuccess: holidaysApiIsSuccess } = useQuery<
    holidaysApiResponseType,
    Error,
    holidaysApiResponseType
  >({
    queryFn: () => {
      return holidaysApi({
        data: {
          userId: getUserDetails().id,
        },
      });
    },
    queryKey: ["holidays"],
  });

  useEffect(() => {
    if (
      holidaysApiIsSuccess &&
      holidaysApiData?.data &&
      allBookingsApiIsSuccess &&
      allBookingsApiData?.data
    ) {
      const holidayEvents = holidaysApiData.data.map((holiday) => ({
        allDay: true,
        backgroundColor: "#9575CD",
        borderColor: "#7E57C2",
        description: holiday.name,
        editable: false,
        end: dayjs(holiday.end_at).add(1, "day").format("YYYY-MM-DD"),
        id: holiday.id,
        start: holiday.start_at,
        textColor: "#ffffff",
        title: holiday.name,
        type: "holiday",
      }));

      const allBookingsEvents = allBookingsApiData.data.allBookings.map(
        (booking) => ({
          allDay: true,
          backgroundColor: "#222222",
          borderColor: "#222222",
          description: booking.guest_name,
          editable: false,
          end: dayjs(booking.checkout).add(1, "day").format("YYYY-MM-DD"),
          id: booking.id,
          start: booking.checkin,
          textColor: "#ffffff",
          title: booking.guest_name,
          type: booking.status,
        }),
      );

      setEvents([...holidayEvents, ...allBookingsEvents]);
    }
  }, [
    allBookingsApiData,
    allBookingsApiIsSuccess,
    holidaysApiData,
    holidaysApiIsSuccess,
  ]);

  const renderEventContent = useCallback((eventInfo: EventContentArg) => {
    if (eventInfo.event.extendedProps.type === "holiday") {
      return {
        html: `
          <div style="
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 3px 12px;
            width: 100%;
          ">
            <div style="
              font-size: 12px;
              font-weight: 500;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            ">
              ${eventInfo.event.title}
            </div>
          </div>
        `,
      };
    }

    return {
      html: `
          <div style="
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 3px 12px;
            width: 100%;
            cursor: pointer;
          ">
            <div style="
              font-size: 12px;
              font-weight: 500;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            ">
              🏠\u00A0\u00A0\u00A0${eventInfo.event.title}
            </div>
            <div style="
              font-size: 14px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              display: none;
            ">
              $${eventInfo.event.extendedProps.amount?.toLocaleString()}
            </div>
          </div>
        `,
    };
  }, []);

  // Automatically scroll the calendar container to align the current month at the top of the scrollable area
  useEffect(() => {
    if (calendarContainerRef.current) {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`;

      const scrollableContainer = document.querySelector(".fc") as HTMLElement;

      // Find the element with the matching data-date attribute
      const currentMonthElement = document.querySelector(
        `.fc-multimonth-month[data-date='${formattedDate}']`,
      ) as HTMLElement;

      scrollableContainer.scrollTo({
        behavior: "smooth",
        top: currentMonthElement.offsetTop,
      });
    }
  }, []);

  // Helper function to check if a date is in the past
  const isPastDate = useCallback(
    (date: Date) => {
      return dayjs(date)
        .startOf("day")
        .isBefore(dayjs(todaysDate).startOf("day"));
    },
    [todaysDate],
  );

  const handleDateRangeSelect = useCallback(
    (info: DateSelectArg) => {
      // Prevent selection if start date is in the past
      if (isPastDate(info.start)) {
        if (calendarContainerRef.current) {
          calendarContainerRef.current.getApi().unselect();
        }
        return;
      }

      let start = dayjs(info.start);
      const end = dayjs(info.end);
      const selectedRangeDates: string[] = [];

      // Collect all dates in the selected range that aren't in the past
      while (start.isBefore(end)) {
        selectedRangeDates.push(start.format("YYYY-MM-DD"));
        start = start.add(1, "day");
      }

      const hasNonHolidayOverlap = events.some((event) => {
        if (event.type === "holiday") return false;

        const eventStart = dayjs(event.start);
        const eventEnd = dayjs(event.end || event.start);

        return selectedRangeDates.some((date) => {
          const currentDate = dayjs(date);
          return (
            (currentDate.isSame(eventStart) ||
              currentDate.isAfter(eventStart)) &&
            currentDate.isBefore(eventEnd)
          );
        });
      });

      if (hasNonHolidayOverlap) {
        if (calendarContainerRef.current) {
          calendarContainerRef.current.getApi().unselect();
        }
        return;
      }

      // Check if all dates in the range are already selected
      const allSelected = selectedRangeDates.every((date) =>
        selectedCells.includes(date),
      );

      if (allSelected) {
        // Deselect all dates in the range
        setSelectedCells((prevSelectedRangeDates) =>
          prevSelectedRangeDates.filter(
            (date) => !selectedRangeDates.includes(date),
          ),
        );
      } else {
        // Select all dates in the range
        setSelectedCells((prevSelectedRangeDates) =>
          Array.from(
            new Set([...prevSelectedRangeDates, ...selectedRangeDates]),
          ),
        );
      }
    },
    [events, isPastDate, selectedCells, setSelectedCells],
  );

  const isDateCellSelected = useCallback(
    (date: string): boolean => {
      return selectedCells.includes(date);
    },
    [selectedCells],
  );

  const dayCellClassNames = useCallback(
    (arg: DayCellContentArg) => {
      const classes = [];
      const isToday = dayjs(arg.date).isSame(todaysDate, "day");
      const dateStr = dayjs(arg.date).format("YYYY-MM-DD");

      if (isToday) {
        classes.push(
          "before:ring-2",
          "before:ring-primary-main",
          "before:rounded-xl",
          "before:absolute",
          "before:size-[calc(100%-2px)]",
          "top-[1px]",
          "left-[1px]",
          "relative",
          "bg-common-transparent",
        );
      }

      if (isPastDate(arg.date)) {
        classes.push("bg-[#F1F1F1]", "cursor-not-allowed");
      } else if (isDateCellSelected(dateStr)) {
        classes.push("bg-primary-main", "text-common-white", "rounded-xl");
      } else if (blockedDates.includes(dateStr)) {
        classes.push("bg-[#F1F1F1]");
      }

      return classes;
    },
    [blockedDates, isDateCellSelected, isPastDate, todaysDate],
  );

  const router = useRouter();

  const handleEventClick = useCallback(
    (info: EventClickArg) => {
      if (info.event.extendedProps.type !== "holiday") {
        const bookingId = info.event.id;
        router.push(`/multicalendar/${propertyId}/reservation/${bookingId}`);
      }
    },
    [propertyId, router],
  );

  const updateEvent = useCallback(
    (info: EventResizeDoneArg | EventDropArg) => {
      const { event } = info;

      // Prevent resizing events into past dates
      if (event.start && isPastDate(event.start)) {
        info.revert();
        return;
      }

      setEvents((prevEvents) =>
        prevEvents.map((e) => {
          if (e.id === event.id) {
            return {
              ...e,
              end: event.end ? dayjs(event.end).format() : e.end,
              start: event.start ? dayjs(event.start).format() : e.start,
            };
          }
          return e;
        }),
      );

      if (event.start) {
        event.setDates(event.start, event.end);
      }
    },
    [isPastDate],
  );

  const isDateBlocked = useCallback(
    (date: Date): boolean => {
      const dateStr = dayjs(date).format("YYYY-MM-DD");
      return blockedDates.includes(dateStr);
    },
    [blockedDates],
  );

  return {
    calendarContainerRef,
    calendarEndMonth,
    calendarStartMonth,
    dayCellClassNames,
    events,
    handleDateRangeSelect,
    handleEventClick,
    isDateBlocked,
    renderEventContent,
    selectedCells,
    updateEvent,
  };
}
