import type { Metadata } from "next";

import { Notes } from "@/components/pages/Multicalendar/components/EditSelectedDates/Notes";

export const metadata: Metadata = {
  title: "Notes - Calendar - Guestay",
};

export default function NotesPage() {
  return <Notes />;
}
