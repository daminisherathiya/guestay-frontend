import type { Metadata } from "next";

import { Amenities } from "@/components/pages/Amenities/Amenities";

export const metadata: Metadata = {
  title: "Choose your amenities - Guestay",
};

export default function AmenitiesPage() {
  return <Amenities />;
}
