import type { Metadata } from "next";

import { FloorPlan } from "@/components/pages/FloorPlan/FloorPlan";

export const metadata: Metadata = {
  title: "Select the total guests - Guestay",
};

export default function FloorPlanPage() {
  return <FloorPlan />;
}
