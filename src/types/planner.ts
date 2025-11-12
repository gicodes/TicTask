import { Ticket } from "./ticket";

export interface PlannerEvent {
  id: string | number;
  title: string;
  start: Date | string;
  end: Date | string;
  allDay?: boolean;
  status?: string;  
  priority?: 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface PlannerCalendarProps {
  tasks: Ticket[];
  onSelectTask: (id: string) => void;
  onDateChange?: (start: Date | string, end: Date | string) => void;
  onSelectSlot?: (slotInfo: { start: Date; end: Date }) => void;
}