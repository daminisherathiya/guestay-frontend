import { ReactNode } from "react";

import { Multicalendar } from "@/components/pages/Multicalendar";

export default function multicalendarLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <Multicalendar>{children}</Multicalendar>;
}
