import React, { memo, useEffect, useRef, useState } from "react";

import {
  DateSelectArg,
  DayCellContentArg,
  EventClickArg,
  EventContentArg,
  EventDropArg,
} from "@fullcalendar/core";
import interactionPlugin, {
  DateClickArg,
  EventResizeDoneArg,
} from "@fullcalendar/interaction";
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
import dayjs from "dayjs";

import { Box } from "@/components/atoms/Box";
import { Stack } from "@/components/atoms/Stack";

// type SelectedRange = {
//   color: string;
//   display: string;
//   end: string;
//   id: string;
//   start: string;
// };

type CalendarEvent = {
  allDay?: boolean;
  amount?: number;
  avatar?: string;
  description: string;
  end?: string;
  guestCount?: number;
  id: string;
  start: string;
  title: string;
  type: string;
};

const CalendarApp = () => {
  const calendarContainerRef = useRef<FullCalendar | null>(null);
  // const calendarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedCells, setSelectedCells] = useState<string[]>([]); // Track individual cell selections
  const renderEventContent = (eventInfo: EventContentArg) => {
    // const eventData = events.find((e) => e.id === eventInfo.event.id);
    // const isPastEvent = eventData && isEventInPast(eventData);
    return {
      html: `
        <div class="fc-event-custom-content" style="
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px;
          width: 100%;
        ">
          <div class={"fc-event-avatar"} style="
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
      end: "2024-12-02",
      id: "10",
      start: "2024-11-24",
      title: "🎄 Christmas Holidays",
      type: "holiday",
    },
  ]);

  const [initialDate, setInitialDate] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [blockedDates, setBlockedDates] = useState<string[]>([]);
  // const isEventInPast = (event: CalendarEvent) => {
  //   const eventEnd = event.end ? new Date(event.end) : new Date(event.start);
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);
  //   return eventEnd < today;
  // };
  useEffect(() => {
    const currentDate = new Date();
    setInitialDate(
      `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-01`,
    );
  }, []);

  useEffect(() => {
    if (calendarContainerRef.current && initialDate) {
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

      const scrollableContainer = document.querySelector(".fc") as HTMLElement;
      console.log(
        "🚀 ~ useEffect ~ scrollableContainer:",
        scrollableContainer,
        scrollableContainer.offsetTop,
      );

      // Find the element with the matching data-date attribute
      const currentMonthElement = document.querySelector(
        `.fc-multimonth-month[data-date='${formattedDate}']`,
      ) as HTMLElement;
      // const currentMonthElement = document.querySelector(
      //   `.fc-multimonth-month[data-date='2024-01']`,
      // ) as HTMLElement;
      console.log(
        "🚀 ~ useEffect ~ currentMonthElement:",
        currentMonthElement,
        currentMonthElement.offsetTop,
      );

      const offsetTop =
        currentMonthElement.offsetTop - scrollableContainer.offsetTop;
      console.log("🚀 ~ useEffect ~ offsetTop:", offsetTop);

      scrollableContainer.scrollTo({
        behavior: "smooth",
        top: currentMonthElement.offsetTop,
      });

      // currentMonthElement.scrollIntoView({
      //   behavior: "smooth",
      //   block: "center",
      // });
    }
  }, [initialDate]);

  // useEffect(() => {
  //   if (calendarContainerRef.current && initialDate) {
  //     // const currentDate = new Date(initialDate);
  //     // const calendarIndex =
  //     //   (currentDate.getFullYear() - (currentDate.getFullYear() - 1)) * 12 +
  //     //   currentDate.getMonth() -
  //     //   11;
  //     const calendarIndex = 11;

  //     if (calendarRefs.current[calendarIndex]) {
  //       const target = calendarRefs.current[calendarIndex];
  //       const container = calendarContainerRef.current;

  //       const offsetTop = target.offsetTop - container.offsetTop;
  //       container.scrollTo({
  //         behavior: "smooth",
  //         top: offsetTop,
  //       });
  //     }
  //   }
  // }, [initialDate]);

  // Helper function to check if a date is in the past
  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleRangeSelect = (info: DateSelectArg) => {
    // Prevent selection if start date is in the past
    if (isPastDate(info.start)) {
      if (calendarContainerRef.current) {
        calendarContainerRef.current.getApi().unselect();
      }
      return;
    }

    const start = new Date(info.start);
    const end = new Date(info.end);
    const datesInRange: string[] = [];

    // Collect all dates in the selected range that aren't in the past
    while (start < end) {
      if (!isPastDate(start)) {
        datesInRange.push(start.toISOString().split("T")[0]);
      }
      start.setDate(start.getDate() + 1);
    }

    // Check if all dates in the range are already selected
    const allSelected = datesInRange.every((date) =>
      selectedCells.includes(date),
    );

    if (allSelected) {
      // Deselect all dates in the range
      setSelectedCells((prevSelected) =>
        prevSelected.filter((date) => !datesInRange.includes(date)),
      );
    } else {
      // Select all dates in the range
      setSelectedCells((prevSelected) =>
        Array.from(new Set([...prevSelected, ...datesInRange])),
      );
    }
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
        "before:size-full",
        "relative",
        "bg-common-transparent",
      );
    }

    if (isPastDate(arg.date)) {
      classes.push("bg-[#d1d1d14d]", "cursor-not-allowed");
    } else if (isCellSelected(dateStr)) {
      classes.push("bg-primary-main", "text-common-white", "rounded-xl");
    } else if (blockedDates.includes(dateStr)) {
      classes.push("bg-[#d1d1d14d]");
    }

    return classes;
  };

  const handleEventClick = (info: EventClickArg) => {
    const event = events.find((e) => e.id === info.event.id);
    setSelectedEvent(event || null);
    setIsDialogOpen(true);
  };

  const handleEventResize = (info: EventResizeDoneArg) => {
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

  const handleEventDrop = (info: EventDropArg) => {
    const { event } = info;

    // Prevent dropping events in past dates
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

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedEvent(null);
  };

  const renderDialogContent = () => {
    if (!selectedEvent) return null;

    return (
      <>
        <Typography variant="h6">{selectedEvent.title}</Typography>
        <Typography variant="body1">
          <strong>Description:</strong> {selectedEvent.description}
        </Typography>
        <Typography variant="body2">
          <strong>Start:</strong>{" "}
          {new Date(selectedEvent.start).toLocaleString()}
        </Typography>
        {selectedEvent.end && (
          <Typography variant="body2">
            <strong>End:</strong> {new Date(selectedEvent.end).toLocaleString()}
          </Typography>
        )}
      </>
    );
  };

  const isCellSelected = (date: string): boolean => {
    return selectedCells.includes(date);
  };

  const renderCalendars = () => {
    // const calendars = [];

    const currentDate = dayjs();
    console.log("🚀 ~ renderCalendars ~ currentDate:", currentDate);

    const startMonth = currentDate
      .subtract(11, "months")
      .startOf("month")
      .format("YYYY-MM-DD");
    console.log("🚀 ~ renderCalendars ~ startMonth:", startMonth);

    const endMonth = currentDate
      .add(13, "months")
      .startOf("month")
      .format("YYYY-MM-DD");
    console.log("🚀 ~ renderCalendars ~ endMonth:", endMonth);

    const handleDateClick = (info: DateClickArg) => {
      if (isPastDate(info.date)) {
        return; // Prevent clicking on past dates
      }
      if (isDateBlocked(info.date)) {
        return;
      }
      console.log("🚀 ~ handleDateClick ~ info:", info);
      // alert(Clicked date: ${info.dateStr});
    };

    return (
      <FullCalendar
        ref={(el) => {
          calendarContainerRef.current = el;
        }}
        dateClick={handleDateClick}
        dayCellClassNames={dayCellClassNames}
        dayCellContent={(arg) => {
          // const isSelected = isCellSelected(
          //   arg.date.toISOString().split("T")[0],
          // );

          // return (
          //   <Stack className="w-full flex-row justify-between">
          //     <div>$1234</div>
          //     <div
          //       style={{
          //         backgroundColor: isSelected ? "#ff9f89" : "transparent",
          //         // height: "100%",
          //         // width: "100%",
          //       }}
          //     >
          //       {arg.dayNumberText}
          //     </div>
          //   </Stack>
          // );

          // const isSelected = isCellSelected(
          //   arg.date.toISOString().split("T")[0],
          // );
          // const eventsForDay = events.filter((event) => {
          //   const eventStart = new Date(event.start);
          //   const eventEnd = event.end ? new Date(event.end) : eventStart;

          //   // Check if the current date falls within the event's start and end dates
          //   return arg.date >= eventStart && arg.date < eventEnd;
          // });

          return (
            <Box className="p-3 pb-0">
              <Stack className="h-full justify-between">
                <Typography
                  className={`font-medium ${isDateBlocked(arg.date) ? "line-through" : ""}`}
                >
                  {arg.dayNumberText}
                </Typography>
                <Typography>₹4,221</Typography>
                {/* <div>
                  {eventsForDay.map((event) => (
                    <Typography
                      key={event.id}
                      className={`truncate ${
                        isSelected ? "text-common-white" : "text-primary-dark"
                      }`}
                      title={event.title}
                    >
                      {event.title}
                    </Typography>
                  ))}
                </div> */}
              </Stack>
            </Box>
          );
        }}
        // dayCellDidMount={(arg) => {
        //   arg.el
        //     .querySelector(".fc-daygrid-day-frame")
        //     ?.classList.add("h-full");
        //   arg.el.querySelector(".fc-daygrid-day-top")?.classList.add("h-full");
        //   arg.el
        //     .querySelector(".fc-daygrid-day-number")
        //     ?.classList.add("w-full", "p-0");
        // }}
        editable={true}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        eventDrop={handleEventDrop}
        eventResizableFromStart={true}
        eventResize={handleEventResize}
        eventSources={[
          {
            events: events,
            id: "events",
          },
        ]}
        headerToolbar={{
          center: "",
          end: "",
          start: "",
        }}
        height="auto"
        initialDate={startMonth}
        initialView="multiMonthYear"
        multiMonthMaxColumns={1}
        plugins={[multiMonthPlugin, interactionPlugin]}
        select={handleRangeSelect}
        selectable={true}
        selectMirror={true}
        timeZone="EST"
        validRange={{
          end: endMonth,
          start: startMonth,
        }}
        views={{
          multiMonthYear: {
            duration: { months: 24 }, // Match the duration here as well
            multiMonthTitleFormat: { month: "long", year: "numeric" },
          },
        }}
      />
    );

    // let tempDate = new Date(startMonth);

    // let calendarIndex = 0;
    // while (tempDate <= endMonth) {
    //   const date = `${tempDate.getFullYear()}-${String(
    //     tempDate.getMonth() + 1,
    //   ).padStart(2, "0")}-01`;

    //   calendars.push(
    //     <div
    //       key={date}
    //       ref={(el) => {
    //         calendarRefs.current[calendarIndex++] = el;
    //       }}
    //       className="c-fc-container"
    //       style={{
    //         border: "1px solid #ddd",
    //         borderRadius: "5px",
    //         marginBottom: "1rem",
    //         // overflow: "hidden",
    //       }}
    //     >
    //       <FullCalendar
    //         dayCellContent={(arg) => {
    //           const isSelected = isCellSelected(
    //             arg.date.toISOString().split("T")[0],
    //           );
    //           return (
    //             <div
    //               style={{
    //                 backgroundColor: isSelected ? "#ff9f89" : "transparent",
    //                 height: "100%",
    //                 width: "100%",
    //               }}
    //             >
    //               {arg.dayNumberText}
    //             </div>
    //           );
    //         }}
    //         editable={true}
    //         eventClick={handleEventClick}
    //         eventDrop={handleEventDrop}
    //         eventResizableFromStart={true}
    //         eventResize={handleEventResize}
    //         eventSources={[
    //           {
    //             id: "events",
    //             events: events,
    //           },
    //         ]}
    //         headerToolbar={{
    //           center: "title",
    //           end: "",
    //           start: "",
    //         }}
    //         height="auto"
    //         initialDate={date}
    //         initialView="dayGridMonth"
    //         plugins={[dayGridPlugin, interactionPlugin]}
    //         select={handleRangeSelect}
    //         selectable={true}
    //       />
    //     </div>,
    //   );

    //   tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, 1);
    // }

    // return calendars;
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

  return (
    // <div
    //   // ref={calendarContainerRef}
    //   style={{
    //     boxSizing: "border-box",
    //     height: "100vh",
    //     overflowY: "scroll",
    //     padding: "0 1rem",
    //     scrollBehavior: "smooth",
    //   }}
    // >
    <>
      {selectedCells.length > 0 && (
        <>
          <Button
            className="mb-4"
            color="primary"
            variant="contained"
            onClick={handleBlockDates}
          >
            Block Selected Dates
          </Button>
          <Button
            className="mb-4"
            color="success"
            variant="contained"
            onClick={handleUnblockDates}
          >
            Open Selected Dates
          </Button>
        </>
      )}
      {renderCalendars()}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Event Details</DialogTitle>
        <DialogContent>{renderDialogContent()}</DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleDialogClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
    // </div>
  );
};

// export default CalendarApp1;

// export function CalendarApp1() {
//   const calendarRef = useRef<FullCalendar | null>(null);

//   const handleDateClick = (info) => {
//     // alert(Clicked date: ${info.dateStr});
//   };

//   const handleDateSelect = (info) => {
//     const startDate = info.startStr;
//     const endDate = info.endStr; // The end date is exclusive, so adjust accordingly
//     // alert(Selected range: ${startDate} to ${endDate});
//   };

//   const startDate = "2023-12-01";
//   const endDate = "2026-10-31";

//   // Get the current date and format it as "YYYY-MM-DD"
//   const initialDateObj = new Date();
//   const initialDateStr = initialDateObj.toISOString().split("T")[0];

//   // Calculate the number of months between initialDate and endDate
//   const endDateObj = new Date(endDate);
//   const startDateObj = new Date(startDate);
//   const monthsBetween =
//     (endDateObj.getFullYear() - startDateObj.getFullYear()) * 12 +
//     (endDateObj.getMonth() - startDateObj.getMonth()) +
//     1; // +1 to include the current month
//   console.log("🚀 ~ Calendar ~ monthsBetween:", monthsBetween);

//   const [initialDate, setInitialDate] = useState<string | null>(null);

//   useEffect(() => {
//     const currentDate = new Date();
//     setInitialDate(
//       `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-01`,
//     );
//   }, []);

//   useEffect(() => {
//     if (calendarRef.current && initialDate) {
//       // const currentDate = new Date(initialDate);
//       // const calendarIndex =
//       //   (currentDate.getFullYear() - (currentDate.getFullYear() - 1)) * 12 +
//       //   currentDate.getMonth() -
//       //   11;
//       // const calendarIndex = 11;
//       // if (calendarRefs.current[calendarIndex]) {
//       //   const target = calendarRefs.current[calendarIndex];
//       //   const container = calendarContainerRef.current;
//       //   const offsetTop = target.offsetTop - container.offsetTop;
//       //   container.scrollTo({
//       //     behavior: "smooth",
//       //     top: offsetTop,
//       //   });
//       // }

//       const currentDate = new Date();
//       const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`;

//       const scrollableContainer = document.querySelector(
//         ".fc-multiMonthYear-view",
//       ) as HTMLElement;

//       // Find the element with the matching data-date attribute
//       const currentMonthElement = document.querySelector(
//         `.fc-multimonth-month[data-date='${formattedDate}']`,
//       ) as HTMLElement;

//       const offsetTop =
//         currentMonthElement.offsetTop - scrollableContainer.offsetTop;

//       // Scroll the container so that the element aligns with the top of the container
//       scrollableContainer.scrollTo({
//         behavior: "smooth",
//         top: offsetTop,
//       });

//       // Scroll to the element if it exists
//       // if (currentMonthElement) {
//       //   currentMonthElement.scrollIntoView({
//       //     behavior: "smooth",
//       //     block: "center",
//       //   });
//       // } else {
//       //   console.error("Element with current month not found.");
//       // }
//     }
//   }, [initialDate]);

//   return (
//     <FullCalendar
//       ref={(el) => {
//         calendarRef.current = el;
//       }}
//       dateClick={handleDateClick} // For single date clicks
//       // duration={{ months: monthsBetween }} // Set duration to match the months between
//       editable={true}
//       events={[
//         { date: "2024-12-01", title: "₹4,221" },
//         { date: "2024-12-02", title: "₹4,221" },
//       ]}
//       headerToolbar={{
//         center: "",
//         left: "",
//         right: "",
//       }}
//       initialDate={startDate}
//       // initialDate={initialDateStr}
//       initialView="multiMonthYear"
//       multiMonthMaxColumns={1}
//       plugins={[multiMonthPlugin, interactionPlugin]}
//       select={handleDateSelect} // For multi-date selection
//       selectable={true} // Enables date selection
//       selectMirror={true} // Provides visual feedback for selection
//       timeZone="EST"
//       validRange={{
//         end: endDate,
//         start: startDate,
//       }}
//       views={{
//         multiMonthYear: {
//           duration: { months: monthsBetween }, // Match the duration here as well
//           multiMonthTitleFormat: { month: "long", year: "numeric" },
//         },
//       }}
//     />
//   );
// }

export default memo(CalendarApp);
