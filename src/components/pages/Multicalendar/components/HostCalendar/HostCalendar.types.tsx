import { CalendarRefType } from "../../Multicalendar.types";

export interface CalendarProps {
  calendarRef: CalendarRefType;
}

export interface CalendarEvent {
  allDay?: boolean;
  amount?: number;
  avatar?: string;
  description: string;
  end?: string;
  guestCount?: number;
  id: string;
  start: string;
  title: string;
  type: string;
}
