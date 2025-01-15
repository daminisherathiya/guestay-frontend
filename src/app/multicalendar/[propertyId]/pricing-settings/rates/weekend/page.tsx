import type { Metadata } from "next";

import { WeekendPricing } from "@/components/pages/Multicalendar/components/CalendarSettings/CalendarPricingTab/WeekendPricing";

export const metadata: Metadata = {
  title: "Custom weekend price - Pricing settings - Guestay",
};

export default function PricingSettingsRatesWeekendPage() {
  return <WeekendPricing />;
}
