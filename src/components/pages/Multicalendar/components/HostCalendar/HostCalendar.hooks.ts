import { useEffect, useRef, useState } from "react";

import {
  DateSelectArg,
  DayCellContentArg,
  EventClickArg,
  EventContentArg,
  EventDropArg,
} from "@fullcalendar/core/index.js";
import { EventResizeDoneArg } from "@fullcalendar/interaction/index.js";
import FullCalendar from "@fullcalendar/react";

import { CalendarEvent } from "./HostCalendar.types";

export function useHostCalendar() {
  const calendarContainerRef = useRef<FullCalendar | null>(null);
  const [selectedCells, setSelectedCells] = useState<string[]>([]); // Track individual cell selections
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      allDay: false,
      amount: 1684.89,
      avatar: "/api/placeholder/32/32",
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
      description: "Annual Company Retreat.",
      end: "2024-11-04",
      guestCount: 7,
      id: "6",
      start: "2024-10-28",
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
    {
      allDay: true, // All-day event
      description: "Christmas Holidays",
      end: "2025-01-12",
      id: "10",
      start: "2025-01-02",
      title: "🎄 Christmas Holidays",
      type: "holiday",
    },
  ]);

  const renderEventContent = (eventInfo: EventContentArg) => {
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

  const handleEventClick = (info: EventClickArg) => {
    const event = events.find((e) => e.id === info.event.id);
    console.log("🚀 ~ handleEventClick ~ event:", event);
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

  const handleBlockDates = () => {
    setBlockedDates((prev) => [...prev, ...selectedCells]);
    setSelectedCells([]); // Clear selection after blocking
  };

  const isDateBlocked = (date: Date): boolean => {
    const dateStr = date.toISOString().split("T")[0];
    return blockedDates.includes(dateStr);
  };

  const handleUnblockDates = () => {
    // Remove selected dates from blocked dates
    setBlockedDates((prev) =>
      prev.filter((date) => !selectedCells.includes(date)),
    );
    setSelectedCells([]); // Clear selection after unblocking
  };
  return {
    calendarContainerRef,
    dayCellClassNames,
    events,
    handleBlockDates,
    handleDateRangeSelect,
    handleEventClick,
    handleUnblockDates,
    isDateBlocked,
    renderEventContent,
    selectedCells,
    updateEvent,
  };
}
