export interface Ticket {
  id: number;
  title: string;
  description?: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
  assignee?: string;
  priority: TicketPriority
}

export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';