import { SlotInfo } from "react-big-calendar";
import { 
  Ticket, 
  TicketPriority, 
  TicketStatus, 
  AllTicketTypes, 
  TicketSeverity, 
  TicketImpact 
} from "./ticket";

export interface PlannerEvent {
  id: string | number;
  type: Partial<AllTicketTypes>;
  title: string;
  dueDate?: Date | string | null;
  startTime?: Date | string | null;
  endTime?: Date | string | null;
  allDay?: boolean;
  status: TicketStatus;  
  priority?: TicketPriority;
  severity?: TicketSeverity;
  impact?: TicketImpact;

  start: Date | string; // rep'd as startTime | dueDate
}

export interface CalendarProps {
  tasks: Ticket[];
  onSelectTask: (ticketId: number) => void;
  onDateChange?: (start: Date | string, dueDate: Date | string) => void;
  onSelectSlot?: (slotInfo: SlotInfo ) => void;
}

export interface PlannerCalendarProps { 
  team: boolean
  teamId?: number
  localTickets?: Ticket[]
  fetchLocalTickets?: () => void;
}