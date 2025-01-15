import type { Metadata } from "next";

import { MinimumNightsStay } from "@/components/pages/Multicalendar/components/CalendarSettings/CalendarAvailabilityTab/MinimumNightsStay";

export const metadata: Metadata = {
  title: "Edit calendar - Guestay",
};

export default function TempPage() {
  return <MinimumNightsStay />;
}
