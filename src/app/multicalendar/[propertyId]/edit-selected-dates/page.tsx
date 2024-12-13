import type { Metadata } from "next";

import { EditSelectedDates } from "@/components/pages/Multicalendar/components/EditSelectedDates";

export const metadata: Metadata = {
  title: "Date select - Calendar - Guestay",
};

export default function EditSelectedDatesPage() {
  return <EditSelectedDates />;
}
