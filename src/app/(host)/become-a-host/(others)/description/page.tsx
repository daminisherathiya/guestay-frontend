import type { Metadata } from "next";

import { Description } from "@/components/pages/Description/description";

export const metadata: Metadata = {
  title: "Describe your place - Guestay",
};

export default function DescriptionPage() {
  return <Description />;
}
