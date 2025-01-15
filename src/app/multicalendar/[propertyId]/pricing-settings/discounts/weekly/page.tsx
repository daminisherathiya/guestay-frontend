import type { Metadata } from "next";

import { DiscountsWeekly } from "@/components/pages/Multicalendar/components/CalendarSettings/CalendarPricingTab/DiscountsWeekly";

export const metadata: Metadata = {
  title: "Pricing settings - Guestay",
};

export default function PricingSettingsDiscountsWeeklyPage() {
  return <DiscountsWeekly />;
}
