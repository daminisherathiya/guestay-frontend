import type { Metadata } from "next";

import { MinimumStayCustom } from "@/components/pages/Multicalendar/components/CalendarSettings/CalendarAvailabilityTab/MinimumNightsStay/MinimumStayCustom";

export const metadata: Metadata = {
  title: "Edit calendar - Guestay",
};

export default function MinimumStayCustomPage() {
  return <MinimumStayCustom />;
}
