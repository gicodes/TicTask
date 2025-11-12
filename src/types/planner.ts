import { Ticket, TicketPriority, TicketStatus } from "./ticket";

export interface PlannerEvent {
  id: string | number;
  title: string;
  start: Date | string;
  end: Date | string;
  allDay?: boolean;
  status: TicketStatus;  
  priority: TicketPriority;
}

export interface PlannerCalendarProps {
  tasks: Ticket[];
  onSelectTask: (id: string) => void;
  onDateChange?: (start: Date | string, end: Date | string) => void;
  onSelectSlot?: (slotInfo: { start: Date; end: Date }) => void;
}