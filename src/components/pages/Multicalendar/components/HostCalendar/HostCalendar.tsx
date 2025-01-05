import React, { memo } from "react";

import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import FullCalendar from "@fullcalendar/react";
import dayjs from "dayjs";

import { Box } from "@/components/atoms/Box";
import { Button } from "@/components/atoms/Button";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import { useHostCalendar } from "./HostCalendar.hooks";

function _HostCalendar() {
  // const isEventInPast = (event: CalendarEvent) => {
  //   const eventEnd = event.end ? new Date(event.end) : new Date(event.start);
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);
  //   return eventEnd < today;
  // };

  const {
    calendarContainerRef,
    dayCellClassNames,
    events,
    handleBlockDates,
    handleDateRangeSelect,
    handleEventClick,
    handleUnblockDates,
    isDateBlocked,
    selectedCells,
    renderEventContent,
    updateEvent,
  } = useHostCalendar();

  const renderCalendars = () => {
    // const calendars = [];

    const currentDate = dayjs();

    const startMonth = currentDate
      .subtract(12, "months")
      .startOf("month")
      .format("YYYY-MM-DD");

    const endMonth = currentDate
      .add(12, "months")
      .startOf("month")
      .format("YYYY-MM-DD");

    return (
      <FullCalendar
        ref={(el) => {
          calendarContainerRef.current = el;
        }}
        dayCellClassNames={dayCellClassNames}
        dayCellContent={(arg) => {
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
        editable={true}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        eventDrop={updateEvent}
        eventResizableFromStart={true}
        eventResize={updateEvent}
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
        select={handleDateRangeSelect}
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
  };

  return (
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
    </>
  );
}

export const HostCalendar = memo(_HostCalendar);
