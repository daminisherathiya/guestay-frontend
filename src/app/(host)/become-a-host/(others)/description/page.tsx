import type { Metadata } from "next";

import { DescriptionRenamed } from "@/components/pages/Description/DescriptionRenamed";

export const metadata: Metadata = {
  title: "Describe your place - Guestay",
};

export default function DescriptionPage() {
  return <DescriptionRenamed />;
}
