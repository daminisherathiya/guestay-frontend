import type { Metadata } from "next";

import { CalendarSettings } from "@/components/pages/Multicalendar/components/CalendarSettings";

export const metadata: Metadata = {
  title: "Pricing settings - Guestay",
};

export default function AvailabilitySettingsPage() {
  return <CalendarSettings />;
}
