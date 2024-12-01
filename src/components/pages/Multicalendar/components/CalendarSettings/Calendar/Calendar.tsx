import React, { useEffect, useRef, useState } from "react";

import {
  DateSelectArg,
  EventClickArg,
  EventDropArg,
  EventResizeDoneArg,
} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import FullCalendar from "@fullcalendar/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

type SelectedRange = {
  color: string;
  display: string;
  end: string;
  id: string;
  start: string;
};

type CalendarEvent = {
  description: string;
  end?: string;
  id: string;
  start: string;
  title: string;
  type: string;
  allDay?: boolean;
};

// const CalendarApp1 = () => {
//   const calendarContainerRef = useRef<HTMLDivElement | null>(null);
//   const calendarRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const [selectedCells, setSelectedCells] = useState<string[]>([]); // Track individual cell selections
//   const [events, setEvents] = useState<CalendarEvent[]>([
//     {
//       description: "Discuss the Q4 project roadmap.",
//       end: "2024-11-06T18:00:00",
//       id: "1",
//       start: "2024-11-05T10:00:00",
//       title: "📅 Meeting with John",
//       type: "meeting",
//       allDay: false, // Timed event
//     },
//     {
//       description: "Lunch with the team at the rooftop cafe.",
//       end: "2024-11-06T14:00:00",
//       id: "2",
//       start: "2024-11-06T12:30:00",
//       title: "🍴 Team Lunch",
//       type: "lunch",
//       allDay: false, // Timed event
//     },
//     {
//       description: "Routine checkup with Dr. Smith.",
//       id: "3",
//       start: "2024-11-07T15:00:00",
//       title: "🩺 Doctor Appointment",
//       type: "appointment",
//       allDay: false, // Timed event
//     },
//     {
//       description: "Annual Company Retreat.",
//       end: "2024-11-17",
//       id: "4",
//       start: "2024-11-15",
//       title: "🏖️ Company Retreat",
//       type: "retreat",
//       allDay: true, // All-day event
//     },
//     {
//       description: "Christmas Holidays",
//       end: "2024-11-26",
//       id: "5",
//       start: "2024-11-24",
//       title: "🎄 Christmas Holidays",
//       type: "holiday",
//       allDay: true, // All-day event
//     },
//   ]);

//   const [initialDate, setInitialDate] = useState<string | null>(null);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
//     null,
//   );

//   useEffect(() => {
//     const currentDate = new Date();
//     setInitialDate(
//       `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-01`,
//     );
//   }, []);

//   useEffect(() => {
//     if (calendarContainerRef.current && initialDate) {
//       // const currentDate = new Date(initialDate);
//       // const calendarIndex =
//       //   (currentDate.getFullYear() - (currentDate.getFullYear() - 1)) * 12 +
//       //   currentDate.getMonth() -
//       //   11;
//       const calendarIndex = 11;

//       if (calendarRefs.current[calendarIndex]) {
//         const target = calendarRefs.current[calendarIndex];
//         const container = calendarContainerRef.current;

//         const offsetTop = target.offsetTop - container.offsetTop;
//         container.scrollTo({
//           behavior: "smooth",
//           top: offsetTop,
//         });
//       }
//     }
//   }, [initialDate]);

//   const handleRangeSelect = (info: DateSelectArg) => {
//     const start = new Date(info.start);
//     const end = new Date(info.end);
//     const datesInRange: string[] = [];

//     // Collect all dates in the selected range
//     while (start < end) {
//       datesInRange.push(start.toISOString().split("T")[0]);
//       start.setDate(start.getDate() + 1);
//     }

//     // Check if all dates in the range are already selected
//     const allSelected = datesInRange.every((date) =>
//       selectedCells.includes(date),
//     );

//     if (allSelected) {
//       // Deselect all dates in the range
//       setSelectedCells((prevSelected) =>
//         prevSelected.filter((date) => !datesInRange.includes(date)),
//       );
//     } else {
//       // Select all dates in the range
//       setSelectedCells((prevSelected) =>
//         Array.from(new Set([...prevSelected, ...datesInRange])),
//       );
//     }
//   };

//   const handleEventClick = (info: EventClickArg) => {
//     const event = events.find((e) => e.id === info.event.id);
//     setSelectedEvent(event || null);
//     setIsDialogOpen(true);
//   };

//   const handleEventResize = (info: EventResizeDoneArg) => {
//     const { event } = info;

//     setEvents((prevEvents) =>
//       prevEvents.map((e) => {
//         if (e.id === event.id) {
//           return {
//             ...e,
//             start: event.start?.toISOString() || e.start,
//             end: event.end?.toISOString() || e.end,
//           };
//         }
//         return e;
//       }),
//     );

//     event.setDates(event.start, event.end);
//   };

//   const handleEventDrop = (info: EventDropArg) => {
//     const { event } = info;

//     setEvents((prevEvents) =>
//       prevEvents.map((e) => {
//         if (e.id === event.id) {
//           return {
//             ...e,
//             start: event.start?.toISOString() || e.start,
//             end: event.end?.toISOString() || e.end,
//           };
//         }
//         return e;
//       }),
//     );

//     event.setDates(event.start, event.end);
//   };

//   const handleDialogClose = () => {
//     setIsDialogOpen(false);
//     setSelectedEvent(null);
//   };

//   const renderDialogContent = () => {
//     if (!selectedEvent) return null;

//     return (
//       <>
//         <Typography variant="h6">{selectedEvent.title}</Typography>
//         <Typography variant="body1">
//           <strong>Description:</strong> {selectedEvent.description}
//         </Typography>
//         <Typography variant="body2">
//           <strong>Start:</strong>{" "}
//           {new Date(selectedEvent.start).toLocaleString()}
//         </Typography>
//         {selectedEvent.end && (
//           <Typography variant="body2">
//             <strong>End:</strong> {new Date(selectedEvent.end).toLocaleString()}
//           </Typography>
//         )}
//       </>
//     );
//   };

//   const isCellSelected = (date: string): boolean => {
//     return selectedCells.includes(date);
//   };

//   const renderCalendars = () => {
//     const calendars = [];

//     const currentDate = new Date();

//     const startMonth = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth() - 11,
//       1,
//     );
//     const endMonth = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth() + 23,
//       1,
//     );

//     let tempDate = new Date(startMonth);

//     let calendarIndex = 0;
//     while (tempDate <= endMonth) {
//       const date = `${tempDate.getFullYear()}-${String(
//         tempDate.getMonth() + 1,
//       ).padStart(2, "0")}-01`;

//       calendars.push(
//         <div
//           key={date}
//           ref={(el) => {
//             calendarRefs.current[calendarIndex++] = el;
//           }}
//           className="c-fc-container"
//           style={{
//             border: "1px solid #ddd",
//             borderRadius: "5px",
//             marginBottom: "1rem",
//             // overflow: "hidden",
//           }}
//         >
//           <FullCalendar
//             dayCellContent={(arg) => {
//               const isSelected = isCellSelected(
//                 arg.date.toISOString().split("T")[0],
//               );
//               return (
//                 <div
//                   style={{
//                     backgroundColor: isSelected ? "#ff9f89" : "transparent",
//                     height: "100%",
//                     width: "100%",
//                   }}
//                 >
//                   {arg.dayNumberText}
//                 </div>
//               );
//             }}
//             editable={true}
//             eventClick={handleEventClick}
//             eventDrop={handleEventDrop}
//             eventResizableFromStart={true}
//             eventResize={handleEventResize}
//             eventSources={[
//               {
//                 id: "events",
//                 events: events,
//               },
//             ]}
//             headerToolbar={{
//               center: "title",
//               end: "",
//               start: "",
//             }}
//             height="auto"
//             initialDate={date}
//             initialView="dayGridMonth"
//             plugins={[dayGridPlugin, interactionPlugin]}
//             select={handleRangeSelect}
//             selectable={true}
//           />
//         </div>,
//       );

//       tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, 1);
//     }

//     return calendars;
//   };

//   return (
//     <div
//       ref={calendarContainerRef}
//       style={{
//         boxSizing: "border-box",
//         height: "100vh",
//         overflowY: "scroll",
//         padding: "0 1rem",
//         scrollBehavior: "smooth",
//       }}
//     >
//       {renderCalendars()}

//       <Dialog open={isDialogOpen} onClose={handleDialogClose}>
//         <DialogTitle>Event Details</DialogTitle>
//         <DialogContent>{renderDialogContent()}</DialogContent>
//         <DialogActions>
//           <Button color="primary" onClick={handleDialogClose}>
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default CalendarApp1;

export function CalendarApp() {
  const calendarRef = useRef<FullCalendar | null>(null);

  const handleDateClick = (info) => {
    // alert(Clicked date: ${info.dateStr});
  };

  const handleDateSelect = (info) => {
    const startDate = info.startStr;
    const endDate = info.endStr; // The end date is exclusive, so adjust accordingly
    // alert(Selected range: ${startDate} to ${endDate});
  };

  const startDate = "2023-12-01";
  const endDate = "2026-10-31";

  // Get the current date and format it as "YYYY-MM-DD"
  const initialDateObj = new Date();
  const initialDateStr = initialDateObj.toISOString().split("T")[0];

  // Calculate the number of months between initialDate and endDate
  const endDateObj = new Date(endDate);
  const startDateObj = new Date(startDate);
  const monthsBetween =
    (endDateObj.getFullYear() - startDateObj.getFullYear()) * 12 +
    (endDateObj.getMonth() - startDateObj.getMonth()) +
    1; // +1 to include the current month
  console.log("🚀 ~ Calendar ~ monthsBetween:", monthsBetween);

  const [initialDate, setInitialDate] = useState<string | null>(null);

  useEffect(() => {
    const currentDate = new Date();
    setInitialDate(
      `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-01`,
    );
  }, []);

  useEffect(() => {
    if (calendarRef.current && initialDate) {
      // const currentDate = new Date(initialDate);
      // const calendarIndex =
      //   (currentDate.getFullYear() - (currentDate.getFullYear() - 1)) * 12 +
      //   currentDate.getMonth() -
      //   11;
      // const calendarIndex = 11;
      // if (calendarRefs.current[calendarIndex]) {
      //   const target = calendarRefs.current[calendarIndex];
      //   const container = calendarContainerRef.current;
      //   const offsetTop = target.offsetTop - container.offsetTop;
      //   container.scrollTo({
      //     behavior: "smooth",
      //     top: offsetTop,
      //   });
      // }

      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`;

      const scrollableContainer = document.querySelector(
        ".fc-multiMonthYear-view",
      ) as HTMLElement;

      // Find the element with the matching data-date attribute
      const currentMonthElement = document.querySelector(
        `.fc-multimonth-month[data-date='${formattedDate}']`,
      ) as HTMLElement;

      const offsetTop =
        currentMonthElement.offsetTop - scrollableContainer.offsetTop;

      // Scroll the container so that the element aligns with the top of the container
      scrollableContainer.scrollTo({
        behavior: "smooth",
        top: offsetTop,
      });

      // Scroll to the element if it exists
      // if (currentMonthElement) {
      //   currentMonthElement.scrollIntoView({
      //     behavior: "smooth",
      //     block: "center",
      //   });
      // } else {
      //   console.error("Element with current month not found.");
      // }
    }
  }, [initialDate]);

  return (
    <FullCalendar
      ref={(el) => {
        calendarRef.current = el;
      }}
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
      initialDate={startDate}
      // initialDate={initialDateStr}
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

export default CalendarApp;
