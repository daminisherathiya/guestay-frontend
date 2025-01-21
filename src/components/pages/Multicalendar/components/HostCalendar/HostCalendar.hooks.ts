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
import dayjs from "dayjs";

import { allBookingsApi } from "@/apis/multiCalendar/allBookingsApi";
import { allBookingsApiResponseType } from "@/apis/multiCalendar/allBookingsApi/allBookingsApi.types";
import { holidaysApi } from "@/apis/multiCalendar/holidaysApi";
import { holidaysApiResponseType } from "@/apis/multiCalendar/holidaysApi/holidaysApi.types";
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
  const currentDate = dayjs();

  const calendarStartMonth = currentDate
    .subtract(12, "months")
    .startOf("month")
    .format("YYYY-MM-DD");

  const calendarEndMonth = currentDate

    .add(12, "months")
    .startOf("month")
    .format("YYYY-MM-DD");

  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      allDay: false,
      amount: 1684.89,
      avatar: "/api/placeholder/32/32",
      backgroundColor: "#222222",
      borderColor: "#222222",
      description: "Discuss the Q4 project roadmap.",
      end: "2024-11-06T18:00:00",
      guestCount: 7,
      id: "1",
      start: "2024-11-05T10:00:00",
      title: "📅 Meeting with John",
      type: "meeting",
    },
    {
      allDay: false,
      amount: 1684.89,
      avatar: "/api/placeholder/32/32",
      backgroundColor: "#222222",
      borderColor: "#222222",
      description: "Lunch with the team at the rooftop cafe.",
      end: "2024-11-06T14:00:00",
      guestCount: 7,
      id: "2",
      start: "2024-11-06T12:30:00",
      title: "🍴 Team Lunch",
      type: "lunch",
    },
    {
      allDay: false,
      amount: 1684.89,
      avatar: "/api/placeholder/32/32",
      backgroundColor: "#222222",
      borderColor: "#222222",
      description: "Routine checkup with Dr. Smith.",
      guestCount: 7,
      id: "3",
      start: "2024-11-07T15:00:00",
      title: "🩺 Doctor Appointment",
      type: "appointment",
    },
    {
      allDay: true,
      amount: 1684.89,
      avatar: "/api/placeholder/32/32",
      backgroundColor: "#222222",
      borderColor: "#222222",
      description: "Annual Company Retreat.",
      end: "2024-11-04",
      guestCount: 7,
      id: "4",
      start: "2024-10-28",
      title: "🏖️ Company Retreat",
      type: "retreat",
    },
    {
      allDay: true,
      amount: 1684.89,
      avatar: "/api/placeholder/32/32",
      backgroundColor: "#222222",
      borderColor: "#222222",
      description: "Annual Company Retreat.",
      end: "2024-11-04",
      guestCount: 7,
      id: "5",
      start: "2024-10-28",
      title: "🏖️ Company Retreat",
      type: "retreat",
    },
    {
      allDay: true,
      amount: 1684.89,
      avatar: "/api/placeholder/32/32",
      backgroundColor: "#222222",
      borderColor: "#222222",
      description: "Annual Company Retreat.",
      end: "2025-01-28",
      guestCount: 7,
      id: "6",
      start: "2025-01-20",
      title: "🏖️ Company Retreat",
      type: "retreat",
    },
    // {
    //   allDay: true, // All-day event
    //   description: "Annual Company Retreat.",
    //   end: "2024-11-04",
    //   id: "7",
    //   start: "2024-10-28",
    //   title: "🏖️ Company Retreat",
    //   type: "retreat",
    // },
    // {
    //   allDay: true, // All-day event
    //   description: "Annual Company Retreat.",
    //   end: "2024-11-04",
    //   id: "8",
    //   start: "2024-10-28",
    //   title: "🏖️ Company Retreat",
    //   type: "retreat",
    // },
    // {
    //   allDay: true, // All-day event
    //   description: "Annual Company Retreat.",
    //   end: "2024-11-04",
    //   id: "9",
    //   start: "2024-10-28",
    //   title: "🏖️ Company Retreat",
    //   type: "retreat",
    // },
  ]);

  const {
    data: allBookingsApiData,
    isSuccess: allBookingsApiIsSuccess,
    isFirstLoading: allBookingsApiIsFirstLoading,
  } = useQuery<allBookingsApiResponseType, Error, allBookingsApiResponseType>({
    queryFn: () => {
      return allBookingsApi({
        data: {
          endDate: calendarEndMonth,
          onlyMyBookings: "0",
          propertyId: propertyId,
          startDate: calendarStartMonth,
          userId: getUserDetails().id,
        },
      });
    },
    queryKey: ["all-bookings"],
  });

  useEffect(() => {
    if (allBookingsApiIsSuccess && allBookingsApiData?.data) {
      const allBookingsEvents = allBookingsApiData.data.allBookings.map(
        (booking) => ({
          allDay: false,
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
            padding: 8px;
            width: 100%;
          ">
            <div style="
              width: 20px;
              height: 20px;
              border-radius: 50%;
              overflow: hidden;
              flex-shrink: 0;
              background-color: #f3f4f6;
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
              ${eventInfo.event.title} + ${eventInfo.event.extendedProps.guestCount} guests
            </div>
            <div style="
              font-size: 14px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
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
    return date < today;
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
    const isToday =
      arg.date.toISOString().split("T")[0] ===
      today.toISOString().split("T")[0];

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
      classes.push("bg-[#d1d1d14d]", "cursor-not-allowed");
    } else if (isDateCellSelected(dateStr)) {
      classes.push("bg-primary-main", "text-common-white", "rounded-xl");
    } else if (blockedDates.includes(dateStr)) {
      classes.push("bg-[#d1d1d14d]");
    }

    return classes;
  };
  const router = useRouter();

  const handleEventClick = (info: EventClickArg) => {
    const bookingId = info.event.id;
    router.push(`/multicalendar/${propertyId}/reservation/${bookingId}`);
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
