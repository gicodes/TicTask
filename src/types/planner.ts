import { Ticket, TicketPriority, TicketStatus, TicketType } from "./ticket";

export interface PlannerEvent {
  id: string | number;
  type: Partial<TicketType>;
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
