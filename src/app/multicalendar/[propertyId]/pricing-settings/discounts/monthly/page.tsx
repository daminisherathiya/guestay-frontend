import type { Metadata } from "next";

import { DiscountsMonthly } from "@/components/pages/Multicalendar/components/CalendarSettings/CalendarPricingTab/DiscountsMonthly";

export const metadata: Metadata = {
  title: "Pricing settings - Guestay",
};

export default function PricingSettingsDiscountsMonthlyPage() {
  return <DiscountsMonthly />;
}
