import { memo } from "react";

import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import FullCalendar from "@fullcalendar/react";
import dayjs from "dayjs";

import { Box } from "@/components/atoms/Box";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import { useHostCalendar } from "./HostCalendar.hooks";
import { _HostCalendarProps } from "./HostCalendar.types";

function _HostCalendar({
  blockedDates,
  getPriceForDate,
  isPropertyPricingInfoApiIsLoading,
  selectedCells,
  setSelectedCells,
}: _HostCalendarProps) {
  const {
    calendarContainerRef,
    dayCellClassNames,
    events,
    handleDateRangeSelect,
    handleEventClick,
    isDateBlocked,
    renderEventContent,
    updateEvent,
  } = useHostCalendar({
    blockedDates,
    selectedCells,
    setSelectedCells,
  });

  const renderCalendars = () => {
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
                <Typography>
                  {isPropertyPricingInfoApiIsLoading ? (
                    <Skeleton className="w-16" variant="text" />
                  ) : (
                    `$${getPriceForDate(arg.date)}`
                  )}
                </Typography>
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

  return renderCalendars();
}

export const HostCalendar = memo(_HostCalendar);