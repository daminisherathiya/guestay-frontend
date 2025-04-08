import type { Metadata } from "next";

import { BlockOutDates } from "@/components/pages/Multicalendar/components/EditSelectedDates/BlockOutDates";

export const metadata: Metadata = {
  title: "Edit calendar - Guestay",
};

export default function BlockedDatesPage() {
  return <BlockOutDates />;
}
