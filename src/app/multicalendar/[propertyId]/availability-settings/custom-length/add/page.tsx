import type { Metadata } from "next";

import { AddCustomTripDates } from "@/components/pages/Multicalendar/components/CalendarSettings/CalendarAvailabilityTab/CustomTripLength/AddCustomTripDates";

export const metadata: Metadata = {
  title: "Edit calendar - Guestay",
};

export default function CustomTripLengthPage() {
  return <AddCustomTripDates />;
}
