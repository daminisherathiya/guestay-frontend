import React from "react";

import interactionPlugin from "@fullcalendar/interaction"; // For date selection
import multiMonthPlugin from "@fullcalendar/multimonth";
import FullCalendar from "@fullcalendar/react";

export function Calendar() {
  const handleDateClick = (info) => {
    alert(`Clicked date: ${info.dateStr}`);
  };

  const handleDateSelect = (info) => {
    const startDate = info.startStr;
    const endDate = info.endStr; // The end date is exclusive, so adjust accordingly
    alert(`Selected range: ${startDate} to ${endDate}`);
  };

  const startDate = "2023-12-01";
  const endDate = "2026-10-31";

  // Get the current date and format it as "YYYY-MM-DD"
  const initialDateObj = new Date();
  const initialDateStr = initialDateObj.toISOString().split("T")[0];

  // Calculate the number of months between initialDate and endDate
  const endDateObj = new Date(endDate);
  const monthsBetween =
    (endDateObj.getFullYear() - initialDateObj.getFullYear()) * 12 +
    (endDateObj.getMonth() - initialDateObj.getMonth()) +
    1; // +1 to include the current month

  return (
    <FullCalendar
      dateClick={handleDateClick} // For single date clicks
      // duration={{ months: monthsBetween }} // Set duration to match the months between
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
      initialDate={startDate} // Set to current date
      initialView="multiMonthYear"
      multiMonthMaxColumns={1}
      plugins={[multiMonthPlugin, interactionPlugin]}
      select={handleDateSelect} // For multi-date selection
      selectable={true} // Enables date selection
      selectMirror={true} // Provides visual feedback for selection
      timeZone="EST"
      validRange={{
        end: endDate,
        start: startDate,
      }}
      views={{
        multiMonthYear: {
          duration: { months: monthsBetween }, // Match the duration here as well
          multiMonthTitleFormat: { month: "long", year: "numeric" },
        },
      }}
    />
  );
}

export default Calendar;
