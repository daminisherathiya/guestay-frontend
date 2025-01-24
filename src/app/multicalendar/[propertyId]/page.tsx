import type { Metadata } from "next";

import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Pricing settings - Guestay",
};

export default function MulticalendarPage({
  params,
}: {
  params: { propertyId: string };
}) {
  redirect(`/multicalendar/${params.propertyId}/pricing-settings`);
}
