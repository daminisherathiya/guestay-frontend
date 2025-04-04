import type { Metadata } from "next";

import { BlockedDates } from "@/components/pages/Multicalendar/components/BlockedDates";

export const metadata: Metadata = {
  title: "Edit calendar - Guestay",
};

export default function BlockedDatesPage() {
  return <BlockedDates />;
}
