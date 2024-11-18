import type { Metadata } from "next";

import { AvailabilityEdit } from "@/components/pages/ListingEditor/components/AvailabilityEdit";

export const metadata: Metadata = {
  title: "Availability – Listing editor - Guestay",
};

export default function PhotoTourPage() {
  return <AvailabilityEdit />;
}
