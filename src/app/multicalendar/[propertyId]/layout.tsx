import { ReactNode } from "react";

import { Multicalendar } from "@/components/pages/Multicalendar";
import { MulticalendarContextProvider } from "@/providers/MulticalendarProvider/MulticalendarProvider";

export default function multicalendarLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <MulticalendarContextProvider>
      <Multicalendar>{children}</Multicalendar>
    </MulticalendarContextProvider>
  );
}
