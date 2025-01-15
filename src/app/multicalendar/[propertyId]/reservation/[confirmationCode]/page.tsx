import type { Metadata } from "next";

import { ReservationWithConfirmationCode } from "@/components/pages/Multicalendar/components/ReservationWithConfirmationCode";

export const metadata: Metadata = {
  title: "Edit calendar - Guestay",
};

export default function ReservationWithConfirmationCodePage() {
  return <ReservationWithConfirmationCode />;
}
