import { useEffect, useRef, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import {
  DateSelectArg,
  DayCellContentArg,
  EventClickArg,
  EventContentArg,
  EventDropArg,
} from "@fullcalendar/core/index.js";
import { EventResizeDoneArg } from "@fullcalendar/interaction/index.js";
import FullCalendar from "@fullcalendar/react";

import { holidaysApi } from "@/apis/multiCalendar/holidaysApi";
import { holidaysApiResponseType } from "@/apis/multiCalendar/holidaysApi/holidaysApi.types";
import { useMulticalendarContext } from "@/hooks/useMulticalendar";
import { useQuery } from "@/hooks/useQuery";
import { getUserDetails } from "@/utils/localStorage/localStorage";

import { CalendarEvent, useHostCalendarProps } from "./HostCalendar.types";

export function useHostCalendar({
  blockedDates,
  setSelectedCells,
  selectedCells,
}: useHostCalendarProps) {
  const { propertyId }: { propertyId: string } = useParams();

  const calendarContainerRef = useRef<FullCalendar | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const {
    allBookingsApiData,
    allBookingsApiIsSuccess,
    calendarEndMonth,
    calendarStartMonth,
  } = useMulticalendarContext();

  useEffect(() => {
    if (allBookingsApiIsSuccess && allBookingsApiData?.data) {
      const allBookingsEvents = allBookingsApiData.data.allBookings.map(
        (booking) => ({
          allDay: true,
          backgroundColor: "#222222",
          borderColor: "#222222",
          description: booking.guest_name,
          editable: false,
          end: booking.checkout,
          id: booking.id,
          start: booking.checkin,
          textColor: "#ffffff",
          title: booking.guest_name,
          type: booking.status,
        }),
      );

      setEvents((prevEvents) => {
        return [...prevEvents, ...allBookingsEvents];
      });
    }
  }, [allBookingsApiData?.data, allBookingsApiIsSuccess]);

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
    if (holidaysApiIsSuccess && holidaysApiData?.data) {
      const holidayEvents = holidaysApiData.data.map((holiday) => ({
        allDay: true,
        backgroundColor: "#9575CD",
        borderColor: "#7E57C2",
        description: holiday.name,
        editable: false,
        end: holiday.end_at,
        id: holiday.id,
        start: holiday.start_at,
        textColor: "#ffffff",
        title: `🏖️\u00A0\u00A0\u00A0${holiday.name}`,
        type: "holiday",
      }));

      setEvents((prevEvents) => {
        return [...prevEvents, ...holidayEvents];
      });
    }
  }, [holidaysApiData, holidaysApiIsSuccess]);

  const renderEventContent = (eventInfo: EventContentArg) => {
    if (eventInfo.event.extendedProps.type === "holiday") {
      return {
        html: `
          <div style="
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px;
            width: 100%;
          ">
            <div style="
              font-size: 14px;
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
            padding: 8px 12px;
            width: 100%;
            cursor: pointer;
          ">
            <div style="
              width: 20px;
              height: 20px;
              border-radius: 50%;
              overflow: hidden;
              flex-shrink: 0;
              background-color: #f3f4f6;
              display: none;
            ">
              <img 
                src="/api/placeholder/32/32"
                alt="User avatar"
                style="width: 100%; height: 100%; object-fit: cover;"
              />
            </div>
            <div style="
              font-size: 14px;
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
  };

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
  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);

    return checkDate < today;
  };

  const handleDateRangeSelect = (info: DateSelectArg) => {
    // Prevent selection if start date is in the past
    if (isPastDate(info.start)) {
      if (calendarContainerRef.current) {
        calendarContainerRef.current.getApi().unselect();
      }
      return;
    }

    const start = new Date(info.start);
    const end = new Date(info.end);
    const selectedRangeDates: string[] = [];

    // Collect all dates in the selected range that aren't in the past
    while (start < end) {
      selectedRangeDates.push(start.toISOString().split("T")[0]);
      start.setDate(start.getDate() + 1);
    }

    const hasNonHolidayOverlap = events.some((event) => {
      if (event.type === "holiday") return false;

      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end || event.start);

      return selectedRangeDates.some((date) => {
        const currentDate = new Date(date);
        return currentDate >= eventStart && currentDate < eventEnd;
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
        Array.from(new Set([...prevSelectedRangeDates, ...selectedRangeDates])),
      );
    }
  };

  const isDateCellSelected = (date: string): boolean => {
    return selectedCells.includes(date);
  };

  const dayCellClassNames = (arg: DayCellContentArg) => {
    const classes = [];
    const dateStr = arg.date.toISOString().split("T")[0];

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const cellDate = new Date(arg.date);
    cellDate.setHours(0, 0, 0, 0);

    const isToday = cellDate.getTime() === today.getTime();

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
  };
  const router = useRouter();

  const handleEventClick = (info: EventClickArg) => {
    if (info.event.extendedProps.type !== "holiday") {
      const bookingId = info.event.id;
      router.push(`/multicalendar/${propertyId}/reservation/${bookingId}`);
    }
  };

  const updateEvent = (info: EventResizeDoneArg | EventDropArg) => {
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
            end: event.end?.toISOString() || e.end,
            start: event.start?.toISOString() || e.start,
          };
        }
        return e;
      }),
    );

    if (event.start) {
      event.setDates(event.start, event.end);
    }
  };

  const isDateBlocked = (date: Date): boolean => {
    const dateStr = date.toISOString().split("T")[0];
    return blockedDates.includes(dateStr);
  };

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
