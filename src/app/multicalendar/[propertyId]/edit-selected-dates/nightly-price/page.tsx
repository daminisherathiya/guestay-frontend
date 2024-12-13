import type { Metadata } from "next";

import { NightlyPrice } from "@/components/pages/Multicalendar/components/EditSelectedDates/NightlyPrice";

export const metadata: Metadata = {
  title: "Edit calendar - Guestay",
};

export default function NightlyPricePage() {
  return <NightlyPrice />;
}
