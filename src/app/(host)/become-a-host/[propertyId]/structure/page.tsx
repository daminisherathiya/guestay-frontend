import type { Metadata } from "next";

import { Structure } from "@/components/pages/Structure/Structure";

export const metadata: Metadata = {
  title: "Choose your property type - Guestay",
};

export default function StructurePage() {
  return <Structure />;
}
