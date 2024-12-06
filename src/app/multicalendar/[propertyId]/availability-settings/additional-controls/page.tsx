import type { Metadata } from "next";

import { AdditionalControls } from "@/components/pages/Multicalendar/components/CalendarSettings/CalendarAvailabilityTab/AdditionalControls";

export const metadata: Metadata = {
  title: "Edit calendar - Guestay",
};

export default function AdditionalControlsPage() {
  return <AdditionalControls />;
}
