import { Ticket } from "./ticket";

export interface TeamTicketViewProps {
  ticket: Ticket;
  setTicket: React.Dispatch<React.SetStateAction<Ticket | null>>;
  editMode: boolean;
  teamMembers: any[];
  userId: number;
}

export interface TeamTicketSpecificTypeProps {
  ticket: Ticket
  fields: ReturnType<typeof import('@/app/dashboard/_level_1/tFieldExtract').extractTicketData>
  editMode: boolean
  updateField: <K extends keyof Ticket>(field: K, value: Ticket[K]) => void
  setTicket: React.Dispatch<React.SetStateAction<Ticket | null>>
}