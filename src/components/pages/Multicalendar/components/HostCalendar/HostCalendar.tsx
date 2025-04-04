import { memo, useEffect } from "react";

import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";
import FullCalendar from "@fullcalendar/react";

import { Box } from "@/components/atoms/Box";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Stack } from "@/components/atoms/Stack";
import { Typography } from "@/components/atoms/Typography";

import { useHostCalendar } from "./HostCalendar.hooks";
import { _HostCalendarProps } from "./HostCalendar.types";

function _HostCalendar({
  blockedDates,
  getPriceForDate,
  propertyPricingInfoApiIsLoading,
  propertyId,
  selectedCells,
  setSelectedCells,
}: _HostCalendarProps) {
  console.log("<HostCalendar> rendered");

  useEffect(() => {
    console.log("<HostCalendar> mounted");
  }, []);

  useEffect(() => {
    console.log("blockedDates changed:", blockedDates);
  }, [blockedDates]);

  useEffect(() => {
    console.log("getPriceForDate changed:", getPriceForDate);
  }, [getPriceForDate]);

  useEffect(() => {
    console.log(
      "propertyPricingInfoApiIsLoading changed:",
      propertyPricingInfoApiIsLoading,
    );
  }, [propertyPricingInfoApiIsLoading]);

  useEffect(() => {
    console.log("selectedCells changed:", selectedCells);
  }, [selectedCells]);

  useEffect(() => {
    console.log("setSelectedCells changed:", setSelectedCells);
  }, [setSelectedCells]);

  const {
    calendarContainerRef,
    calendarEndMonth,
    calendarStartMonth,
    dayCellClassNames,
    events,
    getBlockOutDatesApiIsLoading,
    handleDateRangeSelect,
    handleEventClick,
    isDateBlocked,
    renderEventContent,
    updateEvent,
  } = useHostCalendar({
    blockedDates,
    propertyId,
    selectedCells,
    setSelectedCells,
  });

  const isLoading =
    propertyPricingInfoApiIsLoading || getBlockOutDatesApiIsLoading;

  const renderCalendar = () => {
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
                  {isLoading ? (
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
        firstDay={1}
        headerToolbar={{
          center: "",
          end: "",
          start: "",
        }}
        height="auto"
        initialDate={calendarStartMonth}
        initialView="multiMonthYear"
        multiMonthMaxColumns={1}
        plugins={[multiMonthPlugin, interactionPlugin]}
        // plugins={[multiMonthPlugin, interactionPlugin, dayGridPlugin]}
        select={handleDateRangeSelect}
        selectable={true}
        selectMirror={true}
        // timeZone={DEFAULT_TIMEZONE}
        validRange={{
          end: calendarEndMonth,
          start: calendarStartMonth,
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

  return renderCalendar();
}

export const HostCalendar = memo(_HostCalendar);
