import React, { useEffect, useRef, useState } from "react";

import {
  DateSelectArg,
  EventClickArg,
  EventDropArg,
  EventResizeDoneArg,
} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
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
};

const CalendarApp = () => {
  const calendarContainerRef = useRef<HTMLDivElement | null>(null);
  const calendarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedRanges, setSelectedRanges] = useState<SelectedRange[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      description: "Discuss the Q4 project roadmap.",
      end: "2023-12-06T18:00:00",
      id: "1",
      start: "2023-12-05T10:00:00",
      title: "📅 Meeting with John",
      type: "meeting",
      allDay: true, // Timed event
    },
    {
      description: "Lunch with the team at the rooftop cafe.",
      end: "2023-12-06T14:00:00",
      id: "2",
      start: "2023-12-06T12:30:00",
      title: "🍴 Team Lunch",
      type: "lunch",
      allDay: true, // Timed event
    },
    {
      description: "Routine checkup with Dr. Smith.",
      id: "3",
      start: "2023-12-07T15:00:00",
      title: "🩺 Doctor Appointment",
      type: "appointment",
      allDay: true, // Timed event
    },
    {
      description: "Annual Company Retreat.",
      end: "2023-12-17",
      id: "4",
      start: "2023-12-15",
      title: "🏖️ Company Retreat",
      type: "retreat",
      allDay: true, // All-day event
    },
    {
      description: "Christmas Holidays",
      end: "2023-12-26",
      id: "5",
      start: "2023-12-24",
      title: "🎄 Christmas Holidays",
      type: "holiday",
      allDay: true, // All-day event
    },
  ]);

  const [initialDate, setInitialDate] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );

  useEffect(() => {
    const currentDate = new Date();
    setInitialDate(
      `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-01`,
    );
  }, []);

  useEffect(() => {
    if (calendarContainerRef.current && initialDate) {
      const currentDate = new Date(initialDate);
      const calendarIndex =
        (currentDate.getFullYear() - (currentDate.getFullYear() - 1)) * 12 +
        currentDate.getMonth() -
        11;

      if (calendarRefs.current[calendarIndex]) {
        const target = calendarRefs.current[calendarIndex];
        const container = calendarContainerRef.current;

        const offsetTop = target.offsetTop - container.offsetTop;
        container.scrollTo({
          behavior: "smooth",
          top: offsetTop,
        });
      }
    }
  }, [initialDate]);

  const handleRangeSelect = (info: DateSelectArg) => {
    const newRange: SelectedRange = {
      color: "#ff9f89",
      display: "background",
      end: info.endStr,
      id: String(selectedRanges.length + 1),
      start: info.startStr,
    };

    // Add the new range to the state
    setSelectedRanges((prevRanges) => [...prevRanges, newRange]);
  };

  const handleEventClick = (info: EventClickArg) => {
    const event = events.find((e) => e.id === info.event.id);
    setSelectedEvent(event || null);
    setIsDialogOpen(true);
  };

  const handleEventResize = (info: EventResizeDoneArg) => {
    const { event } = info;
    console.log("Resized event:", event);

    setEvents((prevEvents) =>
      prevEvents.map((e) => {
        if (e.id === event.id) {
          return {
            ...e,
            start: event.start?.toISOString() || e.start,
            end: event.end?.toISOString() || e.end,
          };
        }
        return e;
      }),
    );

    event.setDates(event.start, event.end);
  };

  const handleEventDrop = (info: EventDropArg) => {
    const { event } = info;

    setEvents((prevEvents) =>
      prevEvents.map((e) => {
        if (e.id === event.id) {
          return {
            ...e,
            start: event.start?.toISOString() || e.start,
            end: event.end?.toISOString() || e.end,
          };
        }
        return e;
      }),
    );

    // Explicitly update FullCalendar's internal state
    event.setDates(event.start, event.end);
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

  const renderCalendars = () => {
    const calendars = [];

    const currentDate = new Date();

    const startMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 11,
      1,
    );
    const endMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 23,
      1,
    );

    let tempDate = new Date(startMonth);

    let calendarIndex = 0;
    while (tempDate <= endMonth) {
      const date = `${tempDate.getFullYear()}-${String(tempDate.getMonth() + 1).padStart(2, "0")}-01`;

      calendars.push(
        <div
          key={date}
          ref={(el) => {
            calendarRefs.current[calendarIndex++] = el;
          }}
          style={{
            border: "1px solid #ddd",
            borderRadius: "5px",
            marginBottom: "1rem",
            overflow: "hidden",
          }}
        >
          <FullCalendar
            editable={true} // Enable drag-and-drop and resizing
            eventClick={handleEventClick}
            eventDrop={handleEventDrop}
            eventResizableFromStart={true} // Enable resizing from the left
            eventResize={handleEventResize}
            eventSources={[
              {
                id: "events",
                events: events.map((event) => ({
                  ...event,
                  editable: true, // Ensure each event is editable
                  durationEditable: true, // Allow resizing for timed events
                })),
              },
              {
                id: "selectedRanges",
                events: selectedRanges,
                color: "#ff9f89",
                rendering: "background",
              },
            ]}
            headerToolbar={{
              center: "title",
              end: "",
              start: "",
            }}
            height="auto"
            initialDate={date}
            initialView="dayGridMonth"
            plugins={[dayGridPlugin, interactionPlugin]}
            select={handleRangeSelect}
            selectable={true}
          />
        </div>,
      );

      tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, 1);
    }

    return calendars;
  };

  return (
    <div
      ref={calendarContainerRef}
      style={{
        boxSizing: "border-box",
        height: "100vh",
        overflowY: "scroll",
        padding: "1rem",
        scrollBehavior: "smooth",
      }}
    >
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
    </div>
  );
};

export default CalendarApp;
