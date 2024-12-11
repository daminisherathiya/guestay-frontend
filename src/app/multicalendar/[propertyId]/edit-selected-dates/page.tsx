import { EditSelectedDates } from "@/components/pages/Multicalendar/components/EditSelectedDates";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Date select - Calendar - Guestay",
};

export default function EditSelectedDatesPage() {
  return <EditSelectedDates />;
}
