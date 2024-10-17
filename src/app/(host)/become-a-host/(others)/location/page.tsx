import type { Metadata } from "next";

import { Location } from "@/components/pages/Location/Location";

export const metadata: Metadata = {
  title: "Enter the location - Guestay",
};

export default function LocationPage() {
  return <Location />;
}
