import type { Metadata } from "next";

import { Title } from "@/components/pages/Title/Title";

export const metadata: Metadata = {
  title: "Give your place a title - Guestay",
};

export default function TitlePage() {
  return <Title />;
}
