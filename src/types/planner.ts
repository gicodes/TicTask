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
  dueDate?: Date | string;
  startTime?: Date | string;
  endTime?: Date | string;
  allDay?: boolean;
  status: TicketStatus;  
  priority?: TicketPriority;
  severity?: TicketSeverity;
  impact?: TicketImpact;
}

export interface PlannerCalendarProps {
  tasks: Ticket[];
  onSelectTask: (id: string) => void;
  onDateChange?: (startTime: Date | string, endTime: Date | string) => void;
  onSelectSlot?: (slotInfo: SlotInfo ) => void;
}
