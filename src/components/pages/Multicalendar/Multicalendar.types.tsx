import { ReactNode } from "react";

import FullCalendar from "@fullcalendar/react";

export type CalendarRefType = FullCalendar;

export interface RadioButtonIconProps {
  isSelected: boolean;
}

export interface MulticalendarProps {
  children: ReactNode;
}
