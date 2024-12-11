import React from "react";

import multiMonthPlugin from "@fullcalendar/multimonth";
import FullCalendar from "@fullcalendar/react";

export function Calendar() {
  const handleDateClick = (info: { dateStr: string }) => {
    alert(`Clicked date: ${info.dateStr}`);
  };

  const currentYear = new Date().getFullYear();
  const startDate = `${currentYear - 1}-01-01`;
  const endDate = `${currentYear + 2}-12-31`;

  return (
    <FullCalendar
      dateClick={handleDateClick}
      duration={{ years: 4 }}
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
      initialDate={startDate}
      initialView="multiMonthYear"
      multiMonthMaxColumns={1}
      plugins={[multiMonthPlugin]}
      timeZone="EST"
      validRange={{
        end: endDate,
        start: startDate,
      }}
      views={{
        multiMonthYear: {
          duration: { years: 4 },
          multiMonthTitleFormat: { month: "long", year: "numeric" },
        },
      }}
    />
  );
}

export default Calendar;
