import type { Metadata } from "next";

import { BasePricing } from "@/components/pages/Multicalendar/components/CalendarSettings/CalendarPricingTab/BasePricing";

export const metadata: Metadata = {
  title: "Base price - Pricing settings - Guestay",
};

export default function PricingSettingsBasePage() {
  return <BasePricing />;
}
