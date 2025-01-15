import type { Metadata } from "next";

import { CustomTripLength } from "@/components/pages/Multicalendar/components/CalendarSettings/CalendarAvailabilityTab/CustomTripLength";

export const metadata: Metadata = {
  title: "Edit calendar - Guestay",
};

export default function CustomTripLengthPage() {
  return <CustomTripLength />;
}
