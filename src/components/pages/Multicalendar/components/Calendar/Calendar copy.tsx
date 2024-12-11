import React from "react";

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import FullCalendar from "@fullcalendar/react";

import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import { CalendarProps } from "./Calendar.types";

export function Calendar({ calendarRef }: CalendarProps) {
  const handleDateClick = (info: { dateStr: string }) => {
    alert(`Clicked date: ${info.dateStr}`);
  };

  const currentYear = new Date().getFullYear();
  const startDate = new Date(currentYear - 1, 0, 1).toISOString();
  const endDate = new Date(currentYear + 2, 11, 31).toISOString();

  return (
    <FullCalendar
      ref={calendarRef}
      dateClick={handleDateClick}
      dayCellDidMount={(arg) => {
        arg.el.querySelector(".fc-daygrid-day-frame")?.classList.add("h-full");
        arg.el.querySelector(".fc-daygrid-day-top")?.classList.add("h-full");
        arg.el
          .querySelector(".fc-daygrid-day-number")
          ?.classList.add("w-full", "px-6", "pt-7", "pb-5");
      }}
      dayMaxEvents={0}
      editable={true}
      events={[
        { date: "2024-12-01", title: "₹4,221" },
        { date: "2024-12-02", title: "₹4,221" },
      ]}
      headerToolbar={{
        center: "",
        left: "",
        right: "",
      }}
      height="auto"
      initialDate={startDate}
      initialView="multiMonth"
      plugins={[dayGridPlugin, interactionPlugin, multiMonthPlugin]}
      selectable={true}
      validRange={{
        end: endDate,
        start: startDate,
      }}
      views={{
        multiMonth: {
          buttonText: "Month",
          dayCellContent: (arg) => {
            return (
              <Stack className="h-full justify-between">
                <Typography className="font-medium">
                  {arg.dayNumberText}
                </Typography>
                <Typography>₹4,221</Typography>
              </Stack>
            );
          },
          duration: { years: 4 },
          multiMonthMaxColumns: 1,
          type: "multiMonth",
          // dayHeaderFormat: { weekday: 'short' },
          // titleFormat: { month: 'long', year: 'numeric' },
        },
        multiMonthYear: {
          buttonText: "Year",
          dayCellContent: (arg) => {
            return (
              <Stack className="h-full justify-between">
                <Typography>{arg.dayNumberText}</Typography>
                <Typography>₹4,221</Typography>
              </Stack>
            );
          },
          dayHeaderFormat: { weekday: "short" },
          duration: { years: 4 },
          multiMonthMaxColumns: 3,
          multiMonthMinWidth: 200,
          titleFormat: { year: "numeric" },
          type: "multiMonthYear",
        },
      }}
    />
  );
}
